import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Service } from "@/lib/types";
import { INITIAL_SERVICES } from "@/lib/mock-data";

interface ServiceState {
  services: Service[];
}

const initialState: ServiceState = {
  services: INITIAL_SERVICES,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
    addService: (state, action: PayloadAction<Service>) => {
      state.services.push(action.payload);
    },
    updateServiceInState: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Service> }>
    ) => {
      const index = state.services.findIndex((srv) => srv.id === action.payload.id);
      if (index !== -1) {
        state.services[index] = { ...state.services[index], ...action.payload.updates };
      }
    },
    removeServiceFromState: (state, action: PayloadAction<string>) => {
      state.services = state.services.filter((srv) => srv.id !== action.payload);
    },
    removeServicesForSalon: (state, action: PayloadAction<string>) => {
      state.services = state.services.filter((srv) => srv.salonId !== action.payload);
    },
  },
});

export const {
  setServices,
  addService,
  updateServiceInState,
  removeServiceFromState,
  removeServicesForSalon,
} = serviceSlice.actions;

export default serviceSlice.reducer;
