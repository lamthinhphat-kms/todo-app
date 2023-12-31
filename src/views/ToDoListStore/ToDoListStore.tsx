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
import {showModalSelector, taskListSelector} from 'redux/selectors';
import taskListSlice from 'redux/TaskList/taskListSlice';
import EditModalStore from './components/EditModalStore';
import useToDoStoreHook from 'hooks/useToDoStoreHook';
import Animated, {Layout} from 'react-native-reanimated';
import InputField from 'components/InputField';
import {ThemeContext} from 'context/ThemeContext';
import {useCallback, useContext} from 'react';

function ToDoListStore(): JSX.Element {
  const dispatch = useDispatch();
  const taskList = useSelector(taskListSelector);
  const {task, setTask, viewAbleItems, onViewCallBack} = useToDoStoreHook();
  const {isDarkMode} = useContext(ThemeContext);

  const onPressAdd = useCallback(() => {
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
  }, [task]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? 'gainsboro' : 'white',
      }}>
      <EditModalStore />
      <View style={styles.listTask}>
        <Animated.FlatList
          data={taskList}
          onViewableItemsChanged={onViewCallBack}
          renderItem={({item}) => (
            <TaskTile task={item} viewAbleItems={viewAbleItems} />
          )}
          keyExtractor={item => item.id}
          itemLayoutAnimation={Layout.springify()}
          contentContainerStyle={{flexGrow: 1}}
        />
      </View>
      <View style={styles.inputRow}>
        <View style={{flex: 1}}>
          <InputField
            placeholder="Write a task"
            text={task}
            setText={setTask}
          />
        </View>
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

export default ToDoListStore;
