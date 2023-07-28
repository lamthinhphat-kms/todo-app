import {SetStateAction, useEffect, useState} from 'react';
import {ITask} from '../models/ITask';
import {Keyboard} from 'react-native';
import {
  getStringFromsaveToMMKVStorage,
  saveToMMKVStorage,
} from '../utils/MMKVStorage';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import {useDispatch, useSelector} from 'react-redux';
import {taskListSelector} from '../redux/selectors';
import taskListSlice from '../redux/TaskList/taskListSlice';

interface HomeHookReturnValue {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
}

const useHomeHook = (): HomeHookReturnValue => {
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

export default useHomeHook;
