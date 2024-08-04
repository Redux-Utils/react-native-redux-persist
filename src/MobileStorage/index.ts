import AsyncStorage from "@react-native-async-storage/async-storage";
import type { GetState } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

import AsyncStorageL from "./AsyncStorageLocal";
import ExpoSecureStoreLocal from "./ExpoSecureStoreLocal";
import { expoSecureStorePrefix, prefix } from "../constants";
import type { LoadState, MobileStorageOptions } from "../types/MobileStorage";

export default class MobileStorage {
	public static async loadState(
		key: string,
		storage: MobileStorageOptions,
	): Promise<LoadState> {
		if (storage.type === "AsyncStorage") {
			return await AsyncStorageL.loadState(prefix + key, AsyncStorage);
		}

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (storage.type === "expo-secure-store") {
			return await ExpoSecureStoreLocal.loadState(
				expoSecureStorePrefix + key,
				SecureStore,
				storage.options,
			);
		}
	}

	public static async saveState(
		key: string,
		state: GetState<unknown>,
		storage: MobileStorageOptions,
	): Promise<void> {
		if (storage.type === "AsyncStorage") {
			await AsyncStorageL.saveState(prefix + key, state, AsyncStorage);
		}

		if (storage.type === "expo-secure-store") {
			await ExpoSecureStoreLocal.saveState(
				expoSecureStorePrefix + key,
				state,
				SecureStore,
				storage.options,
			);
		}
	}
}
