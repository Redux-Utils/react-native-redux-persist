import AsyncStorage from "@react-native-async-storage/async-storage";
import type { GetState } from "@reduxjs/toolkit";

import AsyncStorageL from "./AsyncStorageLocal";
import { prefix } from "../constants";
import type { LoadState, MobileStorageOptions } from "../types/MobileStorage";

export default class MobileStorage {
	public static async loadState(
		key: string,
		storage: MobileStorageOptions,
	): Promise<LoadState> {
		if (storage === "AsyncStorage") {
			return await AsyncStorageL.loadState(prefix + key, AsyncStorage);
		}
	}

	public static async saveState(
		key: string,
		state: GetState<unknown>,
		storage: MobileStorageOptions,
	): Promise<void> {
		if (storage === "AsyncStorage") {
			await AsyncStorageL.saveState(prefix + key, state, AsyncStorage);
		}
	}
}
