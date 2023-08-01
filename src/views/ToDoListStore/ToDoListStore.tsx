import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Keyboard,
  SafeAreaView,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import TaskTile from './components/TaskTileStore';

import {useDispatch, useSelector} from 'react-redux';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import {showModalSelector, taskListSelector} from '../../redux/selectors';
import taskListSlice from '../../redux/TaskList/taskListSlice';
import EditModalStore from './components/EditModalStore';
import useToDoStoreHook from '../../hooks/useToDoStoreHook';

function ToDoListStore(): JSX.Element {
  const dispatch = useDispatch();
  const taskList = useSelector(taskListSelector);
  const {task, setTask} = useToDoStoreHook();

  const onPressAdd = () => {
    Keyboard.dismiss();
    setTask('');
    dispatch(
      taskListSlice.actions.addTask({
        modalTask: {
          id: uuid(),
          title: task,
          isCompleted: false,
        },
      }),
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <EditModalStore />
      <View style={styles.listTask}>
        <FlatList
          data={taskList}
          renderItem={({item}) => <TaskTile task={item} />}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={task}
          onChangeText={newText => setTask(newText)}
          onSubmitEditing={onPressAdd}
        />
        <TouchableOpacity onPress={onPressAdd}>
          <Icon name="pluscircle" size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listTask: {flex: 1, marginVertical: 12, marginHorizontal: 12},
  inputRow: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 8,
    marginHorizontal: 8,
  },
});

export default ToDoListStore;
