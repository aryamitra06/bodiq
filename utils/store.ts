import { configureStore } from "@reduxjs/toolkit";
import { bodyweightApi } from "../features/bodyweight/bodyweightApi";

export const store = configureStore({
  reducer: {
    [bodyweightApi.reducerPath]: bodyweightApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bodyweightApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
