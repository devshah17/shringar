import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Salon } from "@/lib/types";
import { INITIAL_SALONS } from "@/lib/mock-data";

interface SalonState {
  salons: Salon[];
  activeSalonId: string;
}

const initialState: SalonState = {
  salons: INITIAL_SALONS,
  activeSalonId: INITIAL_SALONS[0]?.id || "salon-1",
};

export const salonSlice = createSlice({
  name: "salon",
  initialState,
  reducers: {
    setSalons: (state, action: PayloadAction<Salon[]>) => {
      state.salons = action.payload;
      if (action.payload.length > 0 && !action.payload.some((s) => s.id === state.activeSalonId)) {
        state.activeSalonId = action.payload[0].id;
      }
    },
    setActiveSalonId: (state, action: PayloadAction<string>) => {
      state.activeSalonId = action.payload;
    },
    addSalon: (state, action: PayloadAction<Salon>) => {
      state.salons.push(action.payload);
      state.activeSalonId = action.payload.id;
    },
    updateSalonInState: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Salon> }>
    ) => {
      const index = state.salons.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.salons[index] = { ...state.salons[index], ...action.payload.updates };
      }
    },
    removeSalonFromState: (state, action: PayloadAction<string>) => {
      state.salons = state.salons.filter((s) => s.id !== action.payload);
      if (state.activeSalonId === action.payload && state.salons.length > 0) {
        state.activeSalonId = state.salons[0].id;
      }
    },
  },
});

export const {
  setSalons,
  setActiveSalonId,
  addSalon,
  updateSalonInState,
  removeSalonFromState,
} = salonSlice.actions;

export default salonSlice.reducer;
