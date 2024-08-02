import type { EnhancedStore } from "@reduxjs/toolkit";

import WebStorage from "./WebStorage";
import { rehydrate } from "./persistSlice";
import type { PersistConfig } from "./types/PersistConfig";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function persistStore<S>(store: EnhancedStore<S>, configs: PersistConfig) {
	const { key, storage } = configs;

	const safeStorage = storage || {
		type: "localStorage",
	};

	store.subscribe(() => {
		WebStorage.saveState(key, store.getState(), safeStorage);
	});

	store.dispatch(rehydrate());

	return store;
}

export { persistStore };
