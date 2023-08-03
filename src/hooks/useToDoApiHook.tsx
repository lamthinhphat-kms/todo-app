import {useState} from 'react';
import {ITask} from 'models/ITask';

interface ToDoApiHookReturnValue {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  taskString: string;
  setTaskString: React.Dispatch<React.SetStateAction<string>>;
  taskModel: ITask;
  setTaskModel: React.Dispatch<React.SetStateAction<ITask>>;
}

const useToDoApiHook = (): ToDoApiHookReturnValue => {
  const [task, setTask] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [taskString, setTaskString] = useState<string>('');
  const [taskModel, setTaskModel] = useState<ITask>({
    id: '',
    title: '',
    isCompleted: false,
  });

  return {
    task,
    setTask,
    showModal,
    setShowModal,
    taskString,
    setTaskString,
    taskModel,
    setTaskModel,
  };
};

export default useToDoApiHook;
