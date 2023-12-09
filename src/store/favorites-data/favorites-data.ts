import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FavoriteOffersProcess} from '../../types/state';
import {Offer} from '../../types/offer';
import {fetchFavoriteOffersAction} from '../api-actions';


const initialState: FavoriteOffersProcess = {
  favoriteOffers: [],
  isFavoriteOffersDataLoading: false,
};

export const favoritesData = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {
    setFavoriteOffers: (state, action: PayloadAction<Offer[]>) => {
      state.favoriteOffers = action.payload;
    },
    setFavoriteOffersDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isFavoriteOffersDataLoading = action.payload;
    },

  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isFavoriteOffersDataLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action: PayloadAction<Offer[]>) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersDataLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        if(state.favoriteOffers.length){
          state.favoriteOffers = [];
        }
        state.isFavoriteOffersDataLoading = false;
      });
  }
});

export const {setFavoriteOffers, setFavoriteOffersDataLoadingStatus} = favoritesData.actions;


