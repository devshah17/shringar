import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Offer } from "@/lib/types";
import { INITIAL_OFFERS } from "@/lib/mock-data";

interface OfferState {
  offers: Offer[];
}

const initialState: OfferState = {
  offers: INITIAL_OFFERS,
};

export const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    addOffer: (state, action: PayloadAction<Offer>) => {
      state.offers.unshift(action.payload);
    },
    toggleOfferActiveInState: (state, action: PayloadAction<string>) => {
      const offer = state.offers.find((o) => o.id === action.payload);
      if (offer) {
        offer.isActive = !offer.isActive;
      }
    },
    removeOfferFromState: (state, action: PayloadAction<string>) => {
      state.offers = state.offers.filter((o) => o.id !== action.payload);
    },
  },
});

export const {
  setOffers,
  addOffer,
  toggleOfferActiveInState,
  removeOfferFromState,
} = offerSlice.actions;

export default offerSlice.reducer;
