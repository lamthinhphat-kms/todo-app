// import {combineReducers, createStore} from 'redux';
// import modalReducer from './Modal/ModalSlice';
// import taskListReducer from './TaskList/TaskListSlice';

import {configureStore} from '@reduxjs/toolkit';
import modalReducer from './Modal/modalSlice';
import modalSlice from './Modal/modalSlice';
import taskListSlice from './TaskList/taskListSlice';

// const rootReducer = combineReducers({
//   modal: modalReducer,
//   taskList: taskListReducer,
// });

// export type RootState = ReturnType<typeof rootReducer>;

// const store = createStore(rootReducer);

// export default store;

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    taskList: taskListSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
