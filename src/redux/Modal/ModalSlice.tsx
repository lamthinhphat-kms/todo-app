import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface ModalState {
  showModal: boolean;
}

export interface ModalAction {
  type: string;
  payload: boolean;
}

const initState: ModalState = {
  showModal: false,
};
// const modalReducer = (state = initState, action: ModalAction): ModalState => {
//   switch (action.type) {
//     case 'showModal': {
//       return {
//         ...state,
//         showModal: !state.showModal,
//       };
//     }
//     default:
//       return state;
//   }
// };

// export default modalReducer;

const modalSlice = createSlice({
  name: 'modal',
  initialState: initState,
  reducers: {
    showModal: (
      state: ModalState,
      action: PayloadAction<Partial<ModalState>>,
    ) => {
      state.showModal = !state.showModal;
    },
  },
});

export default modalSlice;
