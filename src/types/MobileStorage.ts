import type { GetState } from "@reduxjs/toolkit";
import type * as SecureStore from "expo-secure-store";

import type { GenericStorageType } from "./GenericStorage";

// Unity type for State
export type State = GetState<unknown>;

// Unity type for LoadState
export type LoadState = State | undefined;

// Storages types for MobileStorageOptions
export type StorageTypes =
	| "AsyncStorage"
	| "expo-secure-store"
	| "GenericStorage";

// Base interface for MobileStorageOptions
interface BaseStorageOptions {
	type: StorageTypes;
}

// Discriminated union for MobileStorageOptions with ExpoSecureStoreOptions
interface ExpoSecureStore extends BaseStorageOptions {
	type: "expo-secure-store";
	options?: ExpoSecureStoreOptions;
}

// Discriminated union for MobileStorageOptions with AsyncStorage
interface AsyncStorage extends BaseStorageOptions {
	type: "AsyncStorage";
}

// Discriminated union for MobileStorageOptions with GenericStorage
interface GenericStorage extends BaseStorageOptions {
	type: "GenericStorage";
	/**
	 * @description
	 * Generic storage driver
	 * @example
	 * ```ts
	 * {
	 * 	type: "GenericStorage",
	 * 	driver: MyStorageDriver,
	 * }
	 * ```
	 *
	 * @property {GenericStorageType} driver - Generic storage driver
	 *
	 * It needs to have the following structure
	 *
	 * ```ts
	 * {
	 * 	getItem: (key: string) => Promise<string | null>;
	 * 	setItem: (key: string, value: string) => Promise<void>;
	 * }
	 * ```
	 */
	driver: GenericStorageType;
}

// Mixed union for MobileStorageOptions with all options
type MixedStorageOptions = ExpoSecureStore | AsyncStorage | GenericStorage;

// Export type for MobileStorageOptions
export type MobileStorageOptions = MixedStorageOptions | undefined;

// Interface for ExpoSecureStoreOptions
export interface ExpoSecureStoreOptions {
	onLoad?: SecureStore.SecureStoreOptions;
	onSave?: SecureStore.SecureStoreOptions;
}
