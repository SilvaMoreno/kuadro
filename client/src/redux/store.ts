import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./features/boardSlice";
import favoriteSlice from "./features/favoriteSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    boards: boardSlice,
    favorites: favoriteSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
