import {PropsWithChildren, memo, useContext, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import {ITask} from 'models/ITask';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {format} from 'date-fns';
import Animated, {
  FadeOut,
  ZoomOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import taskService from 'api/tasks';
import {Socket} from 'socket.io-client';
import {removeNotiById} from 'utils/NotificationAndroid';
import {ThemeContext} from 'context/ThemeContext';

type TaskTileProps = PropsWithChildren<{
  task: ITask;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskModel: React.Dispatch<React.SetStateAction<ITask>>;
  sharedViewAbleItems: Animated.SharedValue<ViewToken[]>;
  socket: Socket;
  userId: number;
}>;

function TaskTileApi(props: TaskTileProps) {
  const {task, socket, userId} = props;
  const queryClient = useQueryClient();
  const animationValue = useSharedValue<number>(0);
  const {isDarkMode} = useContext(ThemeContext);
  const updateTaskMuatation = useMutation({
    mutationFn: taskService.updateTask,
    onSuccess: data => {
      // queryClient.invalidateQueries(['tasks'], {exact: true});
      if (data.isCompleted) {
        removeNotiById(data);
      }
      if (socket && userId) {
        socket.emit('task', {
          userId,
        });
      }
    },
  });

  const deleteTaskMuatation = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: data => {
      // queryClient.invalidateQueries(['tasks'], {exact: true});
      removeNotiById(props.task);
      if (socket && userId) {
        socket.emit('task', {
          userId,
        });
      }
    },
  });
  const rStyle = useAnimatedStyle(() => {
    animationValue.value = Boolean(
      props.sharedViewAbleItems.value
        .filter(item => item.isViewable)
        .find(viewAbleItem => viewAbleItem.item.id === task.id),
    )
      ? withTiming(1)
      : withTiming(0);
    return {
      opacity: animationValue.value,
      transform: [
        {
          scale: animationValue.value,
        },
      ],
    };
  }, []);
  return (
    <Animated.View
      style={[
        styles.task,
        rStyle,
        {
          backgroundColor: isDarkMode ? 'gainsboro' : 'white',
        },
      ]}>
      <Text
        style={{
          ...styles.text,
          textDecorationLine: task.isCompleted ? 'line-through' : 'none',
        }}>
        {task.title}
      </Text>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {!task.isCompleted && (
            <TouchableOpacity
              onPress={() => {
                props.setTaskModel(task);
                props.setShowModal(prevShowModal => !prevShowModal);
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
          {!task.isCompleted && (
            <TouchableOpacity
              disabled={updateTaskMuatation.isLoading}
              onPress={() => {
                updateTaskMuatation.mutate({
                  id: task.id,
                  title: task.title,
                  isCompleted: !task.isCompleted,
                });
              }}>
              {updateTaskMuatation.isLoading ? (
                <ActivityIndicator size={25} />
              ) : (
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
              )}
            </TouchableOpacity>
          )}
          <View style={{width: 8}} />
          <TouchableOpacity
            disabled={deleteTaskMuatation.isLoading}
            onPress={() => {
              deleteTaskMuatation.mutate({
                id: task.id,
              });
            }}>
            {deleteTaskMuatation.isLoading ? (
              <ActivityIndicator size={25} />
            ) : (
              <MaterialIcons
                name="delete"
                style={{backgroundColor: 'red', padding: 4, borderRadius: 4}}
                color={'white'}
                size={20}
              />
            )}
          </TouchableOpacity>
        </View>
        <Text>
          {props.task.deadline
            ? `End in ${format(Date.parse(props.task.deadline), 'dd/MM/yyyy')}`
            : ''}
        </Text>
      </View>
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
});

export default memo(TaskTileApi);
