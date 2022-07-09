import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./features/boardSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    boards: boardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
