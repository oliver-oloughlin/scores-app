import { configureStore } from "@reduxjs/toolkit";
import { groupsReducer } from "./groupsReducer";

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
  },
});

export type StoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
