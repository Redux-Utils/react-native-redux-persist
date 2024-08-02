import type { MobileStorageOptions } from "./MobileStorage";

export interface PersistConfig {
	/**
	 * The key to use when saving/loading the state from storage
	 */
	key: string;
	storage: MobileStorageOptions;
}
