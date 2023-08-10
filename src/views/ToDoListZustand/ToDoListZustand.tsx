import {useToDoListZustandHook} from 'hooks/useToDoZustandHook';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {zustandStore} from 'zustand/store';
import {EditModalZustand} from './components/EditModalZustand';
import TaskTileZustand from './components/TaskTileZustand';

import Icon from 'react-native-vector-icons/AntDesign';

import {v4 as uuid} from 'uuid';
import Animated, {Layout} from 'react-native-reanimated';
import {GestureHandlerRootView, FlatList} from 'react-native-gesture-handler';
import {useRef} from 'react';

function ToDoListZustand() {
  const {task, setTask} = useToDoListZustandHook();
  const taskList = zustandStore(store => store.taskList);
  const addTaskZustand = zustandStore(store => store.addTask);
  const showModal = zustandStore(store => store.showModal);

  const onPressAdd = () => {
    Keyboard.dismiss();
    setTask('');
    addTaskZustand({
      id: uuid(),
      title: task,
      isCompleted: false,
    });
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{flex: 1}}>
        <Animated.FlatList
          contentContainerStyle={{flexGrow: 1}}
          data={taskList}
          renderItem={({item}) => <TaskTileZustand task={item} />}
          keyExtractor={item => item.id}
          itemLayoutAnimation={Layout.springify()}
        />
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={task}
          onChangeText={newText => setTask(newText)}
        />
        <TouchableOpacity onPress={onPressAdd}>
          <Icon name="pluscircle" size={30} />
        </TouchableOpacity>
      </View>
      {showModal ? <EditModalZustand /> : null}
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

export default ToDoListZustand;
