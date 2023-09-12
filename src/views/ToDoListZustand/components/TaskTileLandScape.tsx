import {ITask} from 'models/ITask';
import {PropsWithChildren, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {zustandStore} from 'zustand/store';

type TaskTileLandScapeProp = PropsWithChildren<{
  task: ITask;
}>;

function TaskTileLandScape(props: TaskTileLandScapeProp) {
  const {task} = props;
  const deleteTask = zustandStore(store => store.removeTask);
  const updateTask = zustandStore(store => store.updateTask);
  const setShowModal = zustandStore(store => store.setShowModal);
  const setTaskModal = zustandStore(store => store.setTaskModal);
  if (task.id.includes('empty')) {
    return <View style={[styles.flex, styles.cardInvisible]}></View>;
  }
  return (
    <View style={[styles.flex, styles.card]}>
      <View
        style={[
          styles.flex,
          {
            marginRight: 16,
          },
        ]}>
        <Text
          style={{
            ...styles.text,
            textDecorationLine: task.isCompleted ? 'line-through' : 'none',
          }}>
          {task.title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
        }}>
        {!task.isCompleted && (
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
              setTaskModal(task);
            }}>
            <MaterialIcons
              name="edit"
              style={{
                backgroundColor: 'grey',
                ...styles.iconButton,
              }}
              color={'white'}
              size={20}
            />
          </TouchableOpacity>
        )}
        <View style={{width: 8}} />
        {!task.isCompleted && (
          <TouchableOpacity
            onPress={() => {
              updateTask({
                ...task,
                isCompleted: true,
              });
            }}>
            <MaterialIcons
              name="done"
              style={{
                backgroundColor: 'green',
                ...styles.iconButton,
              }}
              color={'white'}
              size={20}
            />
          </TouchableOpacity>
        )}
        <View style={{width: 8}} />
        <TouchableOpacity
          onPress={() => {
            deleteTask(task.id);
          }}>
          <MaterialIcons
            name="delete"
            style={{
              backgroundColor: 'red',
              ...styles.iconButton,
            }}
            color={'white'}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default memo(TaskTileLandScape);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  text: {fontSize: 20, color: 'black'},
  cardInvisible: {
    padding: 16,
    margin: 8,

    backgroundColor: 'transparent',
  },
  card: {
    padding: 16,
    borderWidth: 0.5,
    margin: 8,
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  iconButton: {
    marginVertical: 4,
    padding: 4,
    borderRadius: 4,
  },
});
