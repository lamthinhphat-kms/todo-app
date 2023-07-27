import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import TaskTile from '../components/TaskTile';
import EditModal from '../components/EditModal';
import useHomeHook from '../hooks/useHomeHook';

function Home(): JSX.Element {
  const {
    task,
    listTask,
    showModal,
    index,
    modalTask,
    setTask,
    setShowmodal,
    addTask,
    setTaskStatusAtIndex,
    removeTaskAtIndex,
    onPressEditAtIndex,
    onConfirmTask,
  } = useHomeHook();

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
