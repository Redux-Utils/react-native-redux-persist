import { combineReducers, type Reducer } from "@reduxjs/toolkit";

import WebStorage from "./WebStorage";
import persistSlice from "./persistSlice";
import returnStorageType from "./returnStorageType";
import type { PersistConfig } from "./types/PersistConfig";
import type { WebStorageOptions } from "./types/WebStorage";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function persistReducer<R>(
	configs: PersistConfig,
	reducers: { [K in keyof R]: Reducer<R[K]> },
) {
	const { key, storage } = configs;

	const storageType: WebStorageOptions = returnStorageType(storage);

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

	const preloadedState = (
		storageType.type === "cookies"
			? WebStorage.loadState(key, {
					type: storageType.type,
					options: storageType.options,
				})
			: WebStorage.loadState(key, { type: storageType.type })
	) as PreloadedState;

	return {
		combinedReducers,
		preloadedState,
	};
}

export { persistReducer };
