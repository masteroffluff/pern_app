import { createSlice } from '@reduxjs/toolkit';
import colourSwitch from '../../utils/colourswitch';


const initialState = {
  colour:'sandy'
};

const colourSlice = createSlice({
  name: 'colour',
  initialState,
  reducers: {
    setColour: (state,action) => {
      state.colour = (action.payload);
    },
  },
});

export const { setColour } = colourSlice.actions;
export default colourSlice.reducer;

export const selectColourChoice = (state) => state.colour.colour
export const selectColourObject = (state) => colourSwitch(state.colour.colour)