import {RootState} from './store';

export const taskListSelector = (state: RootState) => state.taskList.listTask;

export const modalTaskSelector = (state: RootState) => state.taskList.modalTask;

export const showModalSelector = (state: RootState) => state.modal.showModal;
