import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ITask} from '../../models/ITask';

export interface TaskState {
  listTask: ITask[];
  modalTask: ITask;
}

// export interface TaskAction {
//   type: string;
//   task: ITask;
//   listTask: ITask[];
// }

// export interface TaskAction {
//   type: string;
//   task: ITask;
//   listTask: ITask[];
// }

const initState: TaskState = {
  listTask: [],
  modalTask: {
    id: '',
    title: '',
    isCompleted: false,
  },
};
// const taskListReducer = (state = initState, action: TaskAction): TaskState => {
//   switch (action.type) {
//     case 'addTask': {
//       return {
//         ...state,
//         listTask: [...state.listTask, action.task],
//       };
//     }
//     case 'setStatusTask': {
//       const newListTask = state.listTask;
//       newListTask[newListTask.findIndex(task => task.id === action.task.id)] = {
//         ...action.task,
//         isCompleted: !action.task.isCompleted,
//       };

//       return {
//         ...state,
//         listTask: [...newListTask],
//       };
//     }

//     case 'removeTask': {
//       const newListTask = state.listTask;
//       const index = newListTask.findIndex(task => task.id === action.task.id);
//       newListTask.splice(index, 1);

//       return {
//         ...state,
//         listTask: [...newListTask],
//       };
//     }
//     case 'confirmEditTask': {
//       const newListTask = state.listTask;
//       newListTask[newListTask.findIndex(task => task.id === action.task.id)] = {
//         ...action.task,
//       };

//       return {
//         ...state,
//         listTask: [...newListTask],
//         modalTask: {
//           id: '',
//           title: '',
//           isCompleted: false,
//         },
//       };
//     }
//     case 'editTask': {
//       return {
//         ...state,
//         modalTask: action.task,
//       };
//     }
//     case 'updateTaskList': {
//       return {
//         ...state,
//         listTask: action.listTask,
//       };
//     }
//     default:
//       return state;
//   }
// };

// export default taskListReducer;

const taskListSlice = createSlice({
  name: 'taskList',
  initialState: initState,
  reducers: {
    addTask: (state: TaskState, action: PayloadAction<Partial<TaskState>>) => {
      if (action.payload.modalTask != null) {
        state.listTask.push(action.payload.modalTask);
      }
    },
    setStatusTask: (
      state: TaskState,
      action: PayloadAction<Partial<TaskState>>,
    ) => {
      if (action.payload.modalTask != null) {
        state.listTask[
          state.listTask.findIndex(
            task => task.id === action.payload.modalTask!.id,
          )
        ] = {
          ...action.payload.modalTask,
          isCompleted: !action.payload.modalTask.isCompleted,
        };
      }
    },
    removeTask: (
      state: TaskState,
      action: PayloadAction<Partial<TaskState>>,
    ) => {
      if (action.payload.modalTask != null) {
        const index = state.listTask.findIndex(
          task => task.id === action.payload.modalTask!.id,
        );
        state.listTask.splice(index, 1);
      }
    },
    confirmEditTask: (
      state: TaskState,
      action: PayloadAction<Partial<TaskState>>,
    ) => {
      if (action.payload.modalTask != null) {
        state.listTask[
          state.listTask.findIndex(
            task => task.id === action.payload.modalTask!.id,
          )
        ] = {
          ...action.payload.modalTask,
        };
        state.modalTask = {
          id: '',
          title: '',
          isCompleted: false,
        };
      }
    },
    editTask: (state: TaskState, action: PayloadAction<Partial<TaskState>>) => {
      if (action.payload.modalTask != null) {
        state.modalTask = action.payload.modalTask;
      }
    },
    updateTaskList: (
      state: TaskState,
      action: PayloadAction<Partial<TaskState>>,
    ) => {
      state.listTask = action.payload.listTask ?? state.listTask;
    },
  },
});

export default taskListSlice;
