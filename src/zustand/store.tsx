import {ITask} from '../models/ITask';
import {createWithEqualityFn} from 'zustand/traditional';
import {shallow} from 'zustand/shallow';
import {produce} from 'immer';

interface TaskState {
  taskList: ITask[];
  showModal: boolean;
  setShowModal: (status: boolean) => void;
  taskModal: ITask;
  updateTaskList: (taskList: ITask[]) => void;
  setTaskModal: (task: ITask) => void;
  addTask: (task: ITask) => void;
  removeTask: (id: string) => void;
  updateTask: (task: ITask) => void;
}
export const zustandStore = createWithEqualityFn<TaskState>()(
  set => ({
    taskList: [],
    showModal: false,
    taskModal: {id: '', title: '', isCompleted: false},
    setTaskModal: task => set(state => ({taskModal: task})),
    updateTaskList: taskList => set(state => ({taskList: [...taskList]})),
    setShowModal: status => set(state => ({showModal: status})),
    addTask: task =>
      set(
        produce((state: TaskState) => {
          state.taskList.push(task);
        }),
      ),
    removeTask: id =>
      set(
        produce((state: TaskState) => {
          state.taskList = state.taskList.filter(task => task.id !== id);
        }),
      ),
    updateTask: task =>
      set(
        produce((state: TaskState) => {
          state.taskList = state.taskList.map(item =>
            item.id === task.id ? task : item,
          );
        }),
      ),
  }),
  shallow,
);
