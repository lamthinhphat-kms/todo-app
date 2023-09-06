import {useCallback, useState} from 'react';
import {ITask} from 'models/ITask';
import {ViewToken} from 'react-native';
import Animated, {useSharedValue} from 'react-native-reanimated';

interface ToDoApiHookReturnValue {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  taskString: string;
  setTaskString: React.Dispatch<React.SetStateAction<string>>;
  taskModel: ITask;
  setTaskModel: React.Dispatch<React.SetStateAction<ITask>>;
  taskList: ITask[];
  setTaskList: React.Dispatch<React.SetStateAction<ITask[]>>;
  onViewCallBack: ({
    viewableItems,
    changed,
  }: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => void;
  sharedViewAbleItems: Animated.SharedValue<ViewToken[]>;
}

const useToDoApiHook = (): ToDoApiHookReturnValue => {
  const [task, setTask] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [taskString, setTaskString] = useState<string>('');
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskModel, setTaskModel] = useState<ITask>({
    id: '',
    title: '',
    isCompleted: false,
  });
  const sharedViewAbleItems = useSharedValue<ViewToken[]>([]);

  const onViewCallBack = useCallback(
    ({
      viewableItems,
      changed,
    }: {
      viewableItems: ViewToken[];
      changed: ViewToken[];
    }) => {
      sharedViewAbleItems.value = viewableItems;
    },
    [],
  );

  return {
    task,
    setTask,
    showModal,
    setShowModal,
    taskString,
    setTaskString,
    taskModel,
    setTaskModel,
    onViewCallBack,
    taskList,
    setTaskList,
    sharedViewAbleItems,
  };
};

export default useToDoApiHook;
