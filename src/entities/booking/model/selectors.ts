import { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectBooking = (state: RootState) => state.booking;

export const selectObjectType = (state: RootState) => state.booking.objectType;
export const selectUser = (state: RootState) => state.booking.user;
export const selectDate = (state: RootState) => state.booking.date;
export const selectTime = (state: RootState) => state.booking.time;
export const selectSelectedServicesRaw = (state: RootState) =>
  state.booking.selectedServices;



export const selectSelectedServices = createSelector(
  [selectSelectedServicesRaw, selectObjectType],
  (selectedServices, objectType) => {
    if (!objectType) return [];

    return Object.values(selectedServices).map(
      ({ prices, duration, ...rest }) => ({
        ...rest,
        price: prices?.[objectType] ?? null,
        duration: duration?.[objectType] ?? null,
      })
    );
  }
);

export const selectIsServiceBlocked = (id: string) => (state: RootState) =>
  !!state.booking.blockedServices[id];

export const selectIsServiceSelected =
  (id: string) =>
  (state: RootState) =>
    !!state.booking.selectedServices[id];

export const selectSummary = createSelector(
  [selectSelectedServices],
  (services) =>
    services.reduce(
      (acc, s) => ({
        totalPrice: acc.totalPrice + (s.price ?? 0),
        totalDuration: acc.totalDuration + (s.duration ?? 0),
      }),
      { totalPrice: 0, totalDuration: 0 }
    )
);
