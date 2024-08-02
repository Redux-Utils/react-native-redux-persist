import { createSlice } from "@reduxjs/toolkit";

import type { PersistSlice, PersistState } from "./types/PersistSlice";

const initialState: PersistState = {
	rehydrated: false,
};

const persistSlice: PersistSlice = createSlice({
	name: "persist",
	initialState,
	reducers: {
		rehydrate(state) {
			state.rehydrated = true;
		},
	},
});

export const { rehydrate } = persistSlice.actions;

export default persistSlice.reducer;
