import type { GenericStorageType } from "../types/GenericStorage";
import type { LoadState, State } from "../types/MobileStorage";

export default class GenericStorageLocal {
	public static async loadState(
		key: string,
		driver: GenericStorageType,
	): Promise<LoadState> {
		try {
			const serializedState: string | null = await driver.getItem(key);

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
		driver: GenericStorageType,
	): Promise<void> {
		try {
			const serializedState: string = JSON.stringify(state);

			await driver.setItem(key, serializedState);
		} catch (error: unknown) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	}
}
