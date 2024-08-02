import AsyncStorage from "@react-native-async-storage/async-storage";
import type { GetState } from "@reduxjs/toolkit";

import AsyncStorageL from "./AsyncStorageLocal";
import { prefix } from "../constants";
import type { LoadState, MobileStorageOptions } from "../types/MobileStorage";

export default class MobileStorage {
	private static readonly asyncStorageL: AsyncStorageL = new AsyncStorageL();

	public static async loadState(
		key: string,
		storage: MobileStorageOptions,
	): Promise<LoadState> {
		if (storage === AsyncStorage) {
			return await this.asyncStorageL.loadState(prefix + key, storage);
		}
	}

	public static async saveState(
		key: string,
		state: GetState<unknown>,
		storage: MobileStorageOptions,
	): Promise<void> {
		if (storage === AsyncStorage) {
			await this.asyncStorageL.saveState(prefix + key, state, storage);
		}
	}
}
