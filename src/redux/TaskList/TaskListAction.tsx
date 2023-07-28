import {ITask} from '../../models/ITask';

export const updateTaskListAction = (taskList: ITask[]) => {
  return {
    type: 'updateTaskList',
    listTask: taskList,
  };
};

export const addTaskAction = (task: ITask) => {
  return {
    type: 'addTask',
    task: task,
  };
};

export const setStatusTaskAction = (task: ITask) => {
  return {
    type: 'setStatusTask',
    task: task,
  };
};

export const removeTaskAction = (task: ITask) => {
  return {
    type: 'removeTask',
    task: task,
  };
};

export const editTaskAction = (task: ITask) => {
  return {
    type: 'editTask',
    task: task,
  };
};

export const confirmEditTaskAction = (task: ITask) => {
  return {
    type: 'confirmEditTask',
    task: task,
  };
};
