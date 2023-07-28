import {combineReducers, createStore} from 'redux';
import modalReducer from './Modal/ModalSlice';
import taskListReducer from './TaskList/TaskListSlice';

const rootReducer = combineReducers({
  modal: modalReducer,
  taskList: taskListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
