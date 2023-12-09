import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';
import {OffersProcess, State} from '../../types/state';
import {Offer} from "../../types/offer";
import {fetchOffersAction} from '../api-actions';

const initialState: OffersProcess = {
  offers: [],
  isOffersDataLoading: false,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    setOffersDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    },

  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state, action: PayloadAction<Offer[]>) => { //сначала срабатывает здесь, потом в action
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action: PayloadAction<Offer[]>) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offers.length && (state.offers = []);
        state.isOffersDataLoading = false;
      })
  }
});

export const {setOffers, setOffersDataLoadingStatus} = offersData.actions;


