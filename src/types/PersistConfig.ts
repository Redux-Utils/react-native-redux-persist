import type { MobileStorageOptions } from "./MobileStorage";

export interface PersistConfig {
	/**
	 * The key to use when saving/loading the state from storage
	 */
	key: string;

	/**
	 * The storage engine to use
	 * There are no default values for this, you must provide a storage engine
	 * @example
	 * storage: AsyncStorage
	 */
	storage: MobileStorageOptions;
}
