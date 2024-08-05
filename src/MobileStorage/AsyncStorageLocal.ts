import type { AsyncStorageStatic } from "@react-native-async-storage/async-storage";

import type { LoadState, State } from "../types/MobileStorage";

export default class AsyncStorageLocal {
	public static async loadState(
		key: string,
		storage: AsyncStorageStatic,
	): Promise<LoadState> {
		const serializedState: string | null = await storage.getItem(key);

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
		storage: AsyncStorageStatic,
	): Promise<void> {
		const serializedState: string = JSON.stringify(state);

		await storage.setItem(key, serializedState);
	}
}
