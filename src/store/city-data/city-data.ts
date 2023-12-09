import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, CITY_DEFAULT_NAME} from '../../const';
import {CityData} from '../../types/state';
import {CityName} from '../../types/city-name';

const initialState: CityData = {
  activeCityName: CITY_DEFAULT_NAME
};

export const cityData = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    setActiveCityName: (state, action: PayloadAction<CityName>) => {
      state.activeCityName = action.payload;
    }
  }
});

export const {setActiveCityName} = cityData.actions;
