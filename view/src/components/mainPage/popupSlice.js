import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPopupOpen: false,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setPopup: (state,action) => {
      state.isPopupOpen = action.payload;
    },
  },
});

export const { setPopup } = popupSlice.actions;
export default popupSlice.reducer;

export const selectPopupState = (state) => state.popup.isPopupOpen