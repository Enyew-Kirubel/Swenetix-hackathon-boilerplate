import { configureStore } from "@reduxjs/toolkit";
import genericReducer from "../features/generic/genericSlice";
import { TASKS_CACHE_KEY } from "../lib/storage";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    presence: presenceReducer,
  },
});

// Keep the last known board on this device so it can be shown while offline
let lastItems = store.getState().tasks.items;
store.subscribe(() => {
  const items = store.getState().tasks.items;
  if (items !== lastItems) {
    lastItems = items;
    writeJSON(TASKS_CACHE_KEY, items);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
