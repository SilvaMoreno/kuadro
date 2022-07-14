import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../utils/type";

export interface FavoriteState {
  value: IBoard[];
}

const initialState: FavoriteState = { value: [] };

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<IBoard[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
