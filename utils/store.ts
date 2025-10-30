import { configureStore } from "@reduxjs/toolkit";
import { bodyweightApi } from "@/features/bodyweight/bodyweightApi";
import { goalsApi } from "@/features/bodyweight/goalApi";

export const store = configureStore({
  reducer: {
    [bodyweightApi.reducerPath]: bodyweightApi.reducer,
    [goalsApi.reducerPath]: goalsApi.reducer, // ✅ correct reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bodyweightApi.middleware)
      .concat(goalsApi.middleware), // ✅ added goalsApi middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
