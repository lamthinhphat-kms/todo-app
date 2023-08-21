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
import useOrientation from 'hooks/useOrientation';
import TaskTileLandScape from './components/TaskTileLandScape';
import {ITask} from 'models/ITask';

function ToDoListZustand() {
  const {task, setTask} = useToDoListZustandHook();
  const taskList = zustandStore(store => store.taskList);
  const addTaskZustand = zustandStore(store => store.addTask);
  const showModal = zustandStore(store => store.showModal);

  const orientation = useOrientation();

  const onPressAdd = () => {
    Keyboard.dismiss();
    setTask('');
    addTaskZustand({
      id: uuid(),
      title: task,
      isCompleted: false,
    });
  };

  const formatData = (data: ITask[]) => {
    const newList = data.concat();
    let numberOfElementsLastRow = data.length % 2;
    while (numberOfElementsLastRow !== 2 && numberOfElementsLastRow !== 0) {
      newList.push({
        id: `empty ${numberOfElementsLastRow}`,
        title: '',
        isCompleted: false,
      });
      numberOfElementsLastRow++;
    }

    return newList;
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{flex: 1}}>
        <Animated.FlatList
          numColumns={orientation.isPortrait ? 1 : 2}
          key={orientation.isPortrait ? 'v' : 'h'}
          contentContainerStyle={{flexGrow: 1}}
          data={formatData(taskList)}
          renderItem={({item}) =>
            orientation.isPortrait ? (
              <TaskTileZustand task={item} orientation={orientation} />
            ) : (
              <TaskTileLandScape task={item} />
            )
          }
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
