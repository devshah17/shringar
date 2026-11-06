import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Booking, BookingStatus } from "@/lib/types";
import { INITIAL_BOOKINGS } from "@/lib/mock-data";

interface BookingState {
  bookings: Booking[];
}

const initialState: BookingState = {
  bookings: INITIAL_BOOKINGS,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.unshift(action.payload);
    },
    updateBookingStatusInState: (
      state,
      action: PayloadAction<{ id: string; status: BookingStatus }>
    ) => {
      const index = state.bookings.findIndex((bk) => bk.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index].status = action.payload.status;
      }
    },
    removeBookingFromState: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter((bk) => bk.id !== action.payload);
    },
  },
});

export const {
  setBookings,
  addBooking,
  updateBookingStatusInState,
  removeBookingFromState,
} = bookingSlice.actions;

export default bookingSlice.reducer;
