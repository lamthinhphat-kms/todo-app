import {PropsWithChildren, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ITask} from '../models/ITask';
import {useDispatch} from 'react-redux';
import taskListSlice from '../redux/TaskList/taskListSlice';
import modalSlice from '../redux/Modal/modalSlice';

type TaskProp = PropsWithChildren<{
  task: ITask;
}>;

export default function TaskTile(prop: TaskProp): JSX.Element {
  const {task} = prop;
  const dispatch = useDispatch();

  return (
    <View style={styles.task}>
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
              dispatch(taskListSlice.actions.editTask({modalTask: task}));
              dispatch(modalSlice.actions.showModal({}));
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
            onPress={() =>
              dispatch(taskListSlice.actions.setStatusTask({modalTask: task}))
            }>
            <MaterialIcons
              name="done"
              style={{backgroundColor: 'green', padding: 4, borderRadius: 4}}
              color={'white'}
              size={20}
            />
          </TouchableOpacity>
        )}
        <View style={{width: 8}} />
        <TouchableOpacity
          onPress={() =>
            dispatch(taskListSlice.actions.removeTask({modalTask: task}))
          }>
          <MaterialIcons
            name="delete"
            style={{backgroundColor: 'red', padding: 4, borderRadius: 4}}
            color={'white'}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
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
