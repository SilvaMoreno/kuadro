import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../utils/type";

export interface UserState {
  value: IBoard[];
}

const initialState: UserState = { value: [] };

export const boardSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<IBoard[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setBoards } = boardSlice.actions;

export default boardSlice.reducer;
