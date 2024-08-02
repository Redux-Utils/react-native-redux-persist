import type { LoadState, State } from "../types/WebStorage";

export default class LocalStorage {
	public loadState(key: string): LoadState {
		try {
			const serializedState: string | null = localStorage.getItem(key);
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

	public saveState(key: string, state: State): void {
		try {
			const serializedState: string = JSON.stringify(state);
			localStorage.setItem(key, serializedState);
		} catch {
			// ignore write errors
		}
	}
}
