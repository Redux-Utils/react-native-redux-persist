import type { EnhancedStore } from "@reduxjs/toolkit";

import MobileStorage from "./MobileStorage";
import { rehydrateActionType } from "./constants";
import type { PersistConfig } from "./types/PersistConfig";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function persistStore<S>(
	store: EnhancedStore<S>,
	configs: PersistConfig,
) {
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

	const loadedState = await MobileStorage.loadState(key, storage);

	store.dispatch({ type: rehydrateActionType, payload: loadedState });

	return {
		store,
		storage: configs.storage,
		key: configs.key,
	};
}

export { persistStore };
