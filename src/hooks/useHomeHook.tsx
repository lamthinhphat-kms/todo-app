import {SetStateAction, useEffect, useState} from 'react';
import {ITask} from '../models/ITask';
import {Keyboard} from 'react-native';
import {
  getStringFromsaveToMMKVStorage,
  saveToMMKVStorage,
} from '../utils/MMKVStorage';
import {API_KEY} from '@env';

interface HomeHookReturnValue {
  task: string;
  listTask: ITask[];
  showModal: boolean;
  index: number;
  modalTask: ITask;
  setShowmodal: React.Dispatch<React.SetStateAction<boolean>>;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  addTask(): void;
  setTaskStatusAtIndex(index: number): void;
  removeTaskAtIndex(index: number): void;
  onPressEditAtIndex(index: number): void;
  onConfirmTask(task: ITask, index: number): void;
}

const useHomeHook = (): HomeHookReturnValue => {
  const [task, setTask] = useState<string>('');
  const [listTask, setListTask] = useState<ITask[]>([]);
  const [showModal, setShowmodal] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);
  const [modalTask, setModalTask] = useState<ITask>({
    title: '',
    isCompleted: false,
  });

  useEffect(() => {
    const tempValue = getStringFromsaveToMMKVStorage('tasks');
    if (tempValue != null) {
      setListTask(JSON.parse(tempValue));
    }
  }, []);

  useEffect(() => {
    saveToMMKVStorage('tasks', JSON.stringify(listTask));
  }, [listTask]);

  const addTask = () => {
    if (!(task.length === 0)) {
      Keyboard.dismiss();
      setListTask([...listTask, {title: task, isCompleted: false}]);
      setTask('');
    }
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

  return {
    task,
    listTask,
    showModal,
    index,
    modalTask,
    setShowmodal,
    setTask,
    addTask,
    setTaskStatusAtIndex,
    removeTaskAtIndex,
    onPressEditAtIndex,
    onConfirmTask,
  };
};

export default useHomeHook;
