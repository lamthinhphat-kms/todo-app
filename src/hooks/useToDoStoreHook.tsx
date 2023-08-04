import {useCallback, useEffect, useState} from 'react';
import {
  getStringFromsaveToMMKVStorage,
  saveToMMKVStorage,
} from '../utils/MMKVStorage';
import 'react-native-get-random-values';
import {useDispatch, useSelector} from 'react-redux';
import {taskListSelector} from 'redux/selectors';
import taskListSlice from 'redux/TaskList/taskListSlice';
import {ViewToken} from 'react-native';
import Animated, {useSharedValue} from 'react-native-reanimated';

interface ToDoStoreHookReturnValue {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  onViewCallBack: ({
    viewableItems,
    changed,
  }: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => void;
  viewAbleItems: Animated.SharedValue<ViewToken[]>;
}

const useToDoStoreHook = (): ToDoStoreHookReturnValue => {
  const dispatch = useDispatch();
  const taskList = useSelector(taskListSelector);

  const [task, setTask] = useState<string>('');
  const viewAbleItems = useSharedValue<ViewToken[]>([]);

  useEffect(() => {
    const tempValue = getStringFromsaveToMMKVStorage('tasks');
    if (tempValue != null) {
      dispatch(
        taskListSlice.actions.updateTaskList({
          listTask: JSON.parse(tempValue),
        }),
      );
    }
  }, []);

  useEffect(() => {
    saveToMMKVStorage('tasks', JSON.stringify(taskList));
  }, [taskList]);

  const onViewCallBack = useCallback(
    ({
      viewableItems,
      changed,
    }: {
      viewableItems: ViewToken[];
      changed: ViewToken[];
    }) => {
      viewAbleItems.value = viewableItems;
    },
    [],
  );

  return {
    task,
    setTask,
    viewAbleItems,
    onViewCallBack,
  };
};

export default useToDoStoreHook;
