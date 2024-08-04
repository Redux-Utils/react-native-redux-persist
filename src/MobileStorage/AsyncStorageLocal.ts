import type { AsyncStorageStatic } from "@react-native-async-storage/async-storage";

import type { LoadState, State } from "../types/MobileStorage";

export default class AsyncStorageLocal {
	public static async loadState(
		key: string,
		storage: AsyncStorageStatic,
	): Promise<LoadState> {
		try {
			const serializedState: string | null = await storage.getItem(key);

			if (serializedState === null) {
				return undefined;
			}

			const parsedState = JSON.parse(serializedState);

			delete parsedState.persist; // Remove the persist key

			return parsedState;
		} catch {
			return undefined;
		}
	}

	public static async saveState(
		key: string,
		state: State,
		storage: AsyncStorageStatic,
	): Promise<void> {
		try {
			const serializedState: string = JSON.stringify(state);
			await storage.setItem(key, serializedState);
		} catch {
			// ignore write errors
		}
	}
}
