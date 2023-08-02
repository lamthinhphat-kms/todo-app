import {useEffect, useState} from 'react';
import {zustandStore} from '../zustand/store';
import {
  getStringFromsaveToMMKVStorage,
  saveToMMKVStorage,
} from '../utils/MMKVStorage';

interface ToDoListZustandReturnValue {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useToDoListZustandHook = (): ToDoListZustandReturnValue => {
  const [task, setTask] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const taskList = zustandStore(store => store.taskList);
  const updateTaskList = zustandStore(store => store.updateTaskList);

  useEffect(() => {
    const tempValue = getStringFromsaveToMMKVStorage('task-zustand');
    if (tempValue != null) {
      updateTaskList(JSON.parse(tempValue));
    }
  }, []);
  useEffect(() => {
    saveToMMKVStorage('task-zustand', JSON.stringify(taskList));
  }, [taskList]);
  return {
    task,
    setTask,
    showModal,
    setShowModal,
  };
};
