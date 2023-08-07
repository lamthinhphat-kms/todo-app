import {PropsWithChildren} from 'react';
import {ITask} from 'models/ITask';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {zustandStore} from 'zustand/store';
import Animated, {
  BounceInLeft,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

type TaskProp = PropsWithChildren<{
  task: ITask;
}>;

type ContextType = {
  translateX: number;
};

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default function TaskTileZustand(prop: TaskProp): JSX.Element {
  const {task} = prop;
  const deleteTask = zustandStore(store => store.removeTask);
  const updateTask = zustandStore(store => store.updateTask);
  const setShowModal = zustandStore(store => store.setShowModal);
  const setTaskModal = zustandStore(store => store.setTaskModal);

  const translateX = useSharedValue<number>(0);
  const opacityDeleteValue = useSharedValue<number>(0);
  const opacityDoneValue = useSharedValue<number>(0);

  const panGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart(event, context) {
      context.translateX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      if (event.translationX < -SCREEN_WIDTH * 0.3) {
        opacityDeleteValue.value = withTiming(1);
      } else if (event.translationX > SCREEN_WIDTH * 0.2 && !task.isCompleted) {
        opacityDoneValue.value = withTiming(1);
      } else {
        opacityDeleteValue.value = withTiming(0);
        opacityDoneValue.value = withTiming(0);
      }
    },
    onEnd: event => {
      if (event.translationX < -SCREEN_WIDTH * 0.3) {
        translateX.value = withTiming(
          -SCREEN_WIDTH,
          undefined,
          isTranslateFinished => {
            if (isTranslateFinished) {
              opacityDeleteValue.value = withTiming(
                0,
                undefined,
                isDelFinished => {
                  if (isDelFinished) {
                    runOnJS(deleteTask)(task.id);
                  }
                },
              );
            }
          },
        );
      } else if (event.translationX > SCREEN_WIDTH * 0.2 && !task.isCompleted) {
        translateX.value = withSpring(SCREEN_WIDTH * 0.2);
      } else {
        translateX.value = withSpring(0);
      }
    },
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  }, []);
  const rIconDel = useAnimatedStyle(() => {
    return {
      opacity: opacityDeleteValue.value,
    };
  }, []);

  const rDoneDel = useAnimatedStyle(() => {
    return {
      opacity: opacityDoneValue.value,
    };
  }, []);

  return (
    <Animated.View
      entering={BounceInLeft}
      style={{
        marginHorizontal: 8,
        justifyContent: 'center',
      }}>
      <Animated.View style={[styles.deleteBtn, rIconDel]}>
        <TouchableOpacity onPress={() => {}}>
          <MaterialIcons
            name="delete"
            style={{backgroundColor: 'red', padding: 4, borderRadius: 4}}
            color={'white'}
            size={20}
          />
        </TouchableOpacity>
      </Animated.View>

      {!task.isCompleted && (
        <Animated.View style={[styles.doneBtn, rDoneDel]}>
          <TouchableOpacity
            onPress={() => {
              updateTask({
                ...task,
                isCompleted: true,
              });
              translateX.value = withSpring(0);
            }}>
            <MaterialIcons
              name="done"
              style={{
                backgroundColor: 'green',
                padding: 4,
                borderRadius: 4,
              }}
              color={'white'}
              size={20}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
      <PanGestureHandler
        failOffsetY={[-5, 5]}
        activeOffsetX={[-5, 5]}
        onGestureEvent={panGesture}>
        <Animated.View style={[styles.task, rStyle]}>
          <Text
            style={{
              ...styles.text,
              textDecorationLine: task.isCompleted ? 'line-through' : 'none',
            }}>
            {task.title}
          </Text>
          <View style={{flexDirection: 'row'}}>
            {!task.isCompleted && (
              <TouchableOpacity
                onPress={() => {
                  setTaskModal(task);
                  setShowModal(true);
                }}>
                <MaterialIcons
                  name="edit"
                  style={{backgroundColor: 'grey', padding: 4, borderRadius: 4}}
                  color={'white'}
                  size={20}
                />
              </TouchableOpacity>
            )}
            <View style={{width: 8}} />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    flex: 1,
    color: 'black',
  },
  task: {
    marginVertical: 4,
    padding: 12,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
    elevation: 5,

    // Add shadow for iOS devices (similar effect)
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,

    // Common styles
    backgroundColor: '#fff',
  },

  deleteBtn: {
    position: 'absolute',
    right: 0,
    padding: 12,
  },

  doneBtn: {
    position: 'absolute',
    left: 0,
    padding: 12,
  },
});
