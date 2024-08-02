import { combineReducers, type Reducer } from "@reduxjs/toolkit";

import MobileStorage from "./MobileStorage";
import persistSlice from "./persistSlice";
import type { PersistConfig } from "./types/PersistConfig";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function persistReducer<R>(
	configs: PersistConfig,
	reducers: { [K in keyof R]: Reducer<R[K]> },
) {
	const { key, storage } = configs;

	if (!key) {
		throw new Error("You must provide a `key` to persistReducer");
	}

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!storage) {
		throw new Error("You must provide a `storage` to persistReducer");
	}

	const combinedReducers = combineReducers({
		...reducers,
		persist: persistSlice,
	});

	type ReducersType = typeof reducers;

	type PreloadedState =
		| Partial<{
				[K in keyof ReducersType]: ReturnType<ReducersType[K]>;
		  }>
		| undefined;

	const preloadedState = MobileStorage.loadState(
		key,
		storage,
	) as PreloadedState;

	return {
		combinedReducers,
		preloadedState,
	};
}

export { persistReducer };
