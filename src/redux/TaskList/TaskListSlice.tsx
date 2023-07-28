import {ITask} from '../../models/ITask';

export interface TaskState {
  listTask: ITask[];
  modalTask: ITask;
}

export interface TaskAction {
  type: string;
  task: ITask;
  listTask: ITask[];
}

const initState: TaskState = {
  listTask: [],
  modalTask: {
    id: '',
    title: '',
    isCompleted: false,
  },
};
const taskListReducer = (state = initState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'addTask': {
      return {
        ...state,
        listTask: [...state.listTask, action.task],
      };
    }
    case 'setStatusTask': {
      const newListTask = state.listTask;
      newListTask[newListTask.findIndex(task => task.id === action.task.id)] = {
        ...action.task,
        isCompleted: !action.task.isCompleted,
      };

      return {
        ...state,
        listTask: [...newListTask],
      };
    }

    case 'removeTask': {
      const newListTask = state.listTask;
      const index = newListTask.findIndex(task => task.id === action.task.id);
      newListTask.splice(index, 1);

      return {
        ...state,
        listTask: [...newListTask],
      };
    }
    case 'confirmEditTask': {
      const newListTask = state.listTask;
      newListTask[newListTask.findIndex(task => task.id === action.task.id)] = {
        ...action.task,
      };

      return {
        ...state,
        listTask: [...newListTask],
        modalTask: {
          id: '',
          title: '',
          isCompleted: false,
        },
      };
    }
    case 'editTask': {
      return {
        ...state,
        modalTask: action.task,
      };
    }
    case 'updateTaskList': {
      return {
        ...state,
        listTask: action.listTask,
      };
    }
    default:
      return state;
  }
};

export default taskListReducer;
