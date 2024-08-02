import type { GetState } from "@reduxjs/toolkit";

import Cookies from "./Cookies";
import LocalStorage from "./LocalStorage";
import SessionStorage from "./SessionStorage";
import { prefix } from "../constants";
import type { LoadState, WebStorageOptions } from "../types/WebStorage";

export default class WebStorage {
	private static readonly localStorage: LocalStorage = new LocalStorage();
	private static readonly sessionStorage: SessionStorage = new SessionStorage();
	private static readonly cookies: Cookies = new Cookies();

	public static loadState(key: string, storage: WebStorageOptions): LoadState {
		switch (storage.type) {
			case "localStorage": {
				return this.localStorage.loadState(prefix + key);
			}
			case "sessionStorage": {
				return this.sessionStorage.loadState(prefix + key);
			}
			case "cookies": {
				return this.cookies.loadState(prefix + key);
			}
		}
	}

	public static saveState(
		key: string,
		state: GetState<unknown>,
		storage: WebStorageOptions,
	): void {
		switch (storage.type) {
			case "localStorage": {
				this.localStorage.saveState(prefix + key, state);
				break;
			}
			case "sessionStorage": {
				this.sessionStorage.saveState(prefix + key, state);
				break;
			}
			case "cookies": {
				this.cookies.saveState(prefix + key, state, storage.options);
				break;
			}
		}
	}
}
