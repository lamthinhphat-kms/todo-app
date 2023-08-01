import {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ITask} from '../../../models/ITask';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteTask, updateTask} from '../../../api/tasks';

type TaskTileProps = PropsWithChildren<{
  task: ITask;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskModel: React.Dispatch<React.SetStateAction<ITask>>;
}>;

export default function TaskTileApi(props: TaskTileProps) {
  const {task} = props;
  const queryClient = useQueryClient();
  const updateTaskMuatation = useMutation({
    mutationFn: updateTask,
    onSuccess: data => {
      queryClient.invalidateQueries(['tasks'], {exact: true});
    },
  });

  const deleteTaskMuatation = useMutation({
    mutationFn: deleteTask,
    onSuccess: data => {
      queryClient.invalidateQueries(['tasks'], {exact: true});
    },
  });

  return (
    <View style={styles.task}>
      <Text
        style={{
          ...styles.text,
          textDecorationLine: task.isCompleted ? 'line-through' : 'none',
        }}>
        {task.title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {!task.isCompleted && (
          <TouchableOpacity
            onPress={() => {
              props.setTaskModel(task);
              props.setShowModal(true);
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
                style={{backgroundColor: 'green', padding: 4, borderRadius: 4}}
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
