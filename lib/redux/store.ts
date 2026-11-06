import { configureStore } from "@reduxjs/toolkit";
import salonReducer from "./slices/salonSlice";
import serviceReducer from "./slices/serviceSlice";
import bookingReducer from "./slices/bookingSlice";
import offerReducer from "./slices/offerSlice";
import rewardReducer from "./slices/rewardSlice";
import authReducer from "./slices/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      salon: salonReducer,
      service: serviceReducer,
      booking: bookingReducer,
      offer: offerReducer,
      reward: rewardReducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
