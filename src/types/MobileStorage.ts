import type { GetState } from "@reduxjs/toolkit";
import type { KeychainAccessibilityConstant } from "expo-secure-store";

export type State = GetState<unknown>;

export type LoadState = State | undefined;

export type StorageTypes = "AsyncStorage" | "expo-secure-store";

interface BaseStorageOptions {
	type: StorageTypes;
}

interface ExpoSecureStore extends BaseStorageOptions {
	type: "expo-secure-store";
	options?: ExpoSecureStoreOptions;
}

interface AsyncStorage extends BaseStorageOptions {
	type: "AsyncStorage";
}

// União discriminada para WebStorageOptions
export type MobileStorageOptions = ExpoSecureStore | AsyncStorage;

export interface ExpoSecureStoreOptions {
	authenticationPrompt?: string;
	keychainAccessible?: KeychainAccessibilityConstant;
	keychainService?: string;
	requireAuthentication?: boolean;
}
