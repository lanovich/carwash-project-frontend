import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { BookingState, ObjectType } from "./types";
import { Service } from "@/entities/service/model";

const initialState: BookingState = {
  carwashId: null,
  date: null,
  time: null,
  objectType: null,
  selectedServices: {},
  blockedServices: {},
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
    setDate: (state, action: PayloadAction<string | null>) => {
      state.date = action.payload;
      state.time = null;
    },
    setTime: (state, action: PayloadAction<string | null>) => {
      state.time = action.payload;
    },
    setObjectType: (state, action: PayloadAction<ObjectType | null>) => {
      state.objectType = action.payload;

      if (!action.payload) {
        state.selectedServices = {};
        state.blockedServices = {};
        return;
      }

      const toDelete: string[] = [];

      for (const [id, service] of Object.entries(state.selectedServices)) {
        if (
          !Array.isArray(service.objectTypes) ||
          !service.objectTypes.includes(action.payload)
        ) {
          toDelete.push(id);
        }
      }

      for (const id of toDelete) {
        delete state.selectedServices[id];
      }

      for (const blockedId of Object.keys(state.blockedServices)) {
        const isValid = Object.values(state.selectedServices).some((service) =>
          service.childIds?.includes(blockedId)
        );

        if (!isValid) {
          delete state.blockedServices[blockedId];
        }
      }
    },

    toggleService: (state, action: PayloadAction<Service>) => {
      const service = action.payload;
      const id = service.id;
      const isSelected = !!state.selectedServices[id];

      if (isSelected) {
        if (state.selectedServices[id]) {
          delete state.selectedServices[id];
        }

        if (service.childIds) {
          for (const subId of service.childIds) {
            delete state.blockedServices[subId];
          }
        }

        return;
      }

      state.selectedServices[id] = service;

      if (service.childIds) {
        for (const subId of service.childIds) {
          delete state.selectedServices[subId];
          state.blockedServices[subId] = true;
        }
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
