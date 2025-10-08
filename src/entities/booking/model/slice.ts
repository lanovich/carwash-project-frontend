import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { BookingState, ObjectType } from "./types";

const initialState: BookingState = {
  carwashId: null,
  date: null,
  time: null,
  objectType: null,
  selectedServiceIds: [],
  user: {
    name: "",
    phone: "",
    email: "",
    carModel: "",
    carColor: "",
    licensePlate: "",
  },
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCarwashId: (state, action: PayloadAction<string>) => {
      state.carwashId = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
      state.time = null;
    },
    setTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },
    setObjectType: (state, action: PayloadAction<ObjectType | null>) => {
      state.objectType = action.payload;
    },
    toggleService: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const isSelected = state.selectedServiceIds.includes(id);

      if (isSelected) {
        state.selectedServiceIds = state.selectedServiceIds.filter(
          (s) => s !== id
        );
      } else {
        state.selectedServiceIds.push(id);
      }
    },

    updateUser: (
      state,
      action: PayloadAction<Partial<BookingState["user"]>>
    ) => {
      state.user = { ...state.user, ...action.payload };
    },
    resetBooking: () => initialState,
  },
});

export const {
  setCarwashId,
  setDate,
  setTime,
  setObjectType,
  toggleService,
  updateUser,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
