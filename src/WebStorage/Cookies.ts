import type { GetState } from "@reduxjs/toolkit";
import cookies from "js-cookie";

import type { CookiesOptions, LoadState } from "../types/WebStorage";

export default class Cookies {
	public loadState(key: string): LoadState {
		const serializedState: string | undefined = cookies.get(key);
		if (serializedState === undefined) {
			return undefined;
		}

		const parsedState = JSON.parse(serializedState);

		delete parsedState.persist; // Remove the persist key

		return parsedState;
	}

	public saveState(
		key: string,
		state: GetState<unknown>,
		options: CookiesOptions,
	): void {
		cookies.set(key, JSON.stringify(state), options);
	}
}
