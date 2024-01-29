import { createSlice } from '@reduxjs/toolkit';
import Snackbar from '../../Components/CustomSnackbar';
const userSlice = createSlice({
  name: 'user',
  initialState: {
    weatherData: [],
  },
  reducers: {
    setWeatherdata: (state, action) => {
      const newData = action.payload;

      const isDuplicate = state.weatherData.some(item => item.name === newData.name);

      if (!isDuplicate) {
        state.weatherData.push(newData);
      } else {
        Snackbar('city is already added', true);
      }
    },
    removeWeatherData: (state, action) => {
      const {indexToRemove} = action.payload;
      state.weatherData.splice(indexToRemove, 1);
    },
  },
});

export const { setWeatherdata, removeWeatherData } = userSlice.actions;

export default userSlice.reducer;
