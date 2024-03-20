import { createSlice } from '@reduxjs/toolkit';
import colourSwitch from '../../utils/colourswitch';

const initialState = {
  main_text_color: 'antiquewhite',
  popup_text_color: 'burlywood',
  main_background_color: 'burlywood',
  main_background_color_alt: 'wheat',
  popup_background_color:'antiquewhite',
};

const colourSlice = createSlice({
  name: 'colour',
  initialState,
  reducers: {
    setColour: (state,action) => {
      state = colourSwitch (action.payload);
    },
  },
});

export const { setColour } = colourSlice.actions;
export default colourSlice.reducer;

export const selectColours = (state) => state.colour