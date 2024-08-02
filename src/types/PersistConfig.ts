import type { WebStorageOptions } from "./WebStorage";

export interface PersistConfig {
	/**
	 * The key to use when saving/loading the state from storage
	 */
	key: string;
	/**
	 * The storage to use. Defaults to `localStorage`
	 * @default { type: "localStorage" }
	 * @example
	 * {
	 *  type: "cookies",
	 *  options: {
	 * 	expires: 1,
	 * }
	 */
	storage?: WebStorageOptions;
}
