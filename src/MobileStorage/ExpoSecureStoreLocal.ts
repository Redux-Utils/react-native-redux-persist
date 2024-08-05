import type * as SecureStore from "expo-secure-store";

import type { LoadState, State } from "../types/MobileStorage";

export default class ExpoSecureStoreLocal {
	public static async loadState(
		key: string,
		storage: typeof SecureStore,
		options?: SecureStore.SecureStoreOptions,
	): Promise<LoadState> {
		const serializedState: string | null = await storage.getItemAsync(
			key,
			options,
		);

		if (serializedState === null) {
			return undefined;
		}

		let parsedState: LoadState;

		try {
			parsedState = JSON.parse(serializedState);
		} catch (error: unknown) {
			// eslint-disable-next-line no-console
			console.error(error);
			return undefined;
		}

		return parsedState;
	}

	public static async saveState(
		key: string,
		state: State,
		storage: typeof SecureStore,
		options?: SecureStore.SecureStoreOptions,
	): Promise<void> {
		const serializedState: string = JSON.stringify(state);

		await storage.setItemAsync(key, serializedState, options);
	}
}
