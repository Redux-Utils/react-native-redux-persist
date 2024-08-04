import type * as SecureStore from "expo-secure-store";

import type { LoadState, State } from "../types/MobileStorage";

export default class ExpoSecureStoreLocal {
	public static async loadState(
		key: string,
		storage: typeof SecureStore,
		options?: SecureStore.SecureStoreOptions,
	): Promise<LoadState> {
		try {
			const serializedState: string | null = await storage.getItemAsync(
				key,
				options,
			);

			if (serializedState === null) {
				return undefined;
			}

			const parsedState = JSON.parse(serializedState);

			return parsedState;
		} catch (error: unknown) {
			// eslint-disable-next-line no-console
			console.error(error);
			return undefined;
		}
	}

	public static async saveState(
		key: string,
		state: State,
		storage: typeof SecureStore,
		options?: SecureStore.SecureStoreOptions,
	): Promise<void> {
		try {
			const serializedState: string = JSON.stringify(state);
			await storage.setItemAsync(key, serializedState, options);
		} catch (error: unknown) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	}
}
