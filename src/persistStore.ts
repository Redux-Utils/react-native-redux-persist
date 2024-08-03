import type { EnhancedStore } from "@reduxjs/toolkit";

import MobileStorage from "./MobileStorage";
import { rehydrate } from "./persistSlice";
import type { PersistConfig } from "./types/PersistConfig";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function persistStore<S>(store: EnhancedStore<S>, configs: PersistConfig) {
	const { key, storage } = configs;

	if (!key) {
		throw new Error("Key is required in persistStore");
	}

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!storage) {
		throw new Error("Storage is required in persistStore");
	}

	store.subscribe(async () => {
		await MobileStorage.saveState(key, store.getState(), storage);
	});

	store.dispatch(rehydrate());

	return store;
}

export { persistStore };
