import {
  ScrollView,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import TaskTile from '../components/TaskTile';
import {useEffect, useState} from 'react';
import {ITask} from '../../models/ITask';
import {
  getValueFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/AsyncStorage';
import EditModal from '../components/EditModal';

function Home(): JSX.Element {
  const [task, setTask] = useState<string>('');
  const [listTask, setListTask] = useState<ITask[]>([]);
  const [showModal, setShowmodal] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);
  const [modalTask, setModalTask] = useState<ITask>({
    title: '',
    isCompleted: false,
  });

  useEffect(() => {
    getTaskFromStorage();
  }, []);

  useEffect(() => {
    saveToLocalStorage('tasks', JSON.stringify(listTask));
  }, [listTask]);

  const addTask = () => {
    if (!(task.length === 0)) {
      Keyboard.dismiss();
      setListTask([...listTask, {title: task, isCompleted: false}]);
      setTask('');
    }
  };

  const getTaskFromStorage = async () => {
    const tempValue = await getValueFromLocalStorage('tasks');
    setListTask(JSON.parse(tempValue));
  };

  const setTaskStatusAtIndex = (index: number) => {
    let task: ITask = {
      ...listTask[index],
      isCompleted: !listTask[index].isCompleted,
    };
    listTask[index] = task;
    setListTask([...listTask]);
  };

  const removeTaskAtIndex = (index: number) => {
    listTask.splice(index, 1);
    setListTask([...listTask]);
  };

  const onPressEditAtIndex = (index: number) => {
    setModalTask(listTask[index]);
    setIndex(index);
    setShowmodal(!showModal);
  };

  const onConfirmTask = (task: ITask, index: number) => {
    listTask[index] = task;
    setListTask([...listTask]);
    setShowmodal(!showModal);
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <EditModal
        showModal={showModal}
        modalTask={modalTask}
        index={index}
        onConfirmModal={onConfirmTask}
        onCancelModal={() => setShowmodal(!showModal)}
      />
      <View style={styles.listTask}>
        <ScrollView style={{paddingHorizontal: 12}}>
          {listTask.map((item, index) => {
            return (
              <TaskTile
                task={listTask[index]}
                onPressDone={() => setTaskStatusAtIndex(index)}
                onPressRemove={() => removeTaskAtIndex(index)}
                onPressEdit={() => onPressEditAtIndex(index)}
                key={index}
              />
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={task}
          onChangeText={newText => setTask(newText)}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity onPress={addTask}>
          <Icon name="pluscircle" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listTask: {flex: 1, marginVertical: 12},
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
