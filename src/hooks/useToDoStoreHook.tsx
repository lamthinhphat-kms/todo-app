import {useEffect, useState} from 'react';
import {
  getStringFromsaveToMMKVStorage,
  saveToMMKVStorage,
} from '../utils/MMKVStorage';
import 'react-native-get-random-values';
import {useDispatch, useSelector} from 'react-redux';
import {taskListSelector} from 'redux/selectors';
import taskListSlice from 'redux/TaskList/taskListSlice';

interface ToDoStoreHookReturnValue {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
}

const useToDoStoreHook = (): ToDoStoreHookReturnValue => {
  const dispatch = useDispatch();
  const taskList = useSelector(taskListSelector);

  const [task, setTask] = useState<string>('');

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

  return {
    task,
    setTask,
  };
};

export default useToDoStoreHook;
