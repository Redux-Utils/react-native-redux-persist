import type { MobileStorageOptions } from "./MobileStorage";

export interface PersistConfig {
	/**
	 * The key to use when saving/loading the state from storage
	 */
	key: string;

	/**
	 * The storage engine to use
	 * There are no default values for this, you must provide a storage engine
	 * @type {storage} - string - The storage engine to use
	 * @example
	 * storage: {
	 * 	type: "AsyncStorage",
	 * }
	 *
	 * @description
	 * !!! IMPORTANT !!!
	 * If you are using AsyncStorage, you must install the package @react-native-async-storage/async-storage
	 * You need to install your storage engine before using it
	 */
	storage: MobileStorageOptions;
}
