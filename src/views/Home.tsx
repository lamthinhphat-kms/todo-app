import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Keyboard,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import TaskTile from '../components/TaskTile';
import EditModal from '../components/EditModal';
import useHomeHook from '../hooks/useHomeHook';
import {useDispatch, useSelector} from 'react-redux';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import {showModalSelector, taskListSelector} from '../redux/selectors';
import {addTaskAction} from '../redux/TaskList/TaskListAction';

function Home(): JSX.Element {
  const dispatch = useDispatch();
  const taskList = useSelector(taskListSelector);
  const {task, setTask} = useHomeHook();

  const onPressAdd = () => {
    Keyboard.dismiss();
    setTask('');
    dispatch(
      addTaskAction({
        id: uuid(),
        title: task,
        isCompleted: false,
      }),
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <EditModal />
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
    </View>
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

export default Home;
