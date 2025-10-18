import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "@/entities/booking/model/slice";
import { bookingApi } from "@/entities/booking/api";
import { timeSlotsApi } from "@/entities/time/api";
import { serviceApi } from "@/entities/service/api";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [timeSlotsApi.reducerPath]: timeSlotsApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bookingApi.middleware)
      .concat(timeSlotsApi.middleware)
      .concat(serviceApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
