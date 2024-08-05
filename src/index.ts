import {
	rehydrateActionType,
	prefix,
	expoSecureStorePrefix,
} from "./constants";
import { initStore } from "./initStore";
import { persistReducer } from "./persistReducer";
import type { ExpoSecureStoreOptions } from "./types/MobileStorage";
import type { PersistConfig } from "./types/PersistConfig";

export type { PersistConfig, ExpoSecureStoreOptions };

export {
	persistReducer,
	initStore,
	rehydrateActionType,
	prefix,
	expoSecureStorePrefix,
};
