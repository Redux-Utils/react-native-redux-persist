/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import LocalStorage from "../src/WebStorage/LocalStorage";
import type { State } from "../src/types/WebStorage";

describe("LocalStorage", () => {
	let localStorageMock: any;

	beforeEach(() => {
		localStorageMock = (function () {
			let store: { [key: string]: string } = {};

			return {
				getItem(key: string): string | null {
					return store[key] || null;
				},
				setItem(key: string, value: string): void {
					store[key] = value;
				},
				clear(): void {
					store = {};
				},
				removeItem(key: string): void {
					delete store[key];
				},
			};
		})();

		Object.defineProperty(window, "localStorage", { value: localStorageMock });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("loadState should return undefined if no item exists", () => {
		const storage = new LocalStorage();
		const state = storage.loadState("nonExistentKey");
		expect(state).toBeUndefined();
	});

	test("loadState should return parsed state if item exists", () => {
		const state = { data: "test", persist: true };
		localStorage.setItem("key", JSON.stringify(state));

		const storage = new LocalStorage();
		const loadedState = storage.loadState("key");
		expect(loadedState).toEqual({ data: "test" }); // 'persist' should be removed
	});

	test("loadState should return undefined if JSON parsing fails", () => {
		localStorage.setItem("key", "not a valid json string");

		const storage = new LocalStorage();
		const state = storage.loadState("key");
		expect(state).toBeUndefined();
	});

	test("saveState should save the state to localStorage", () => {
		const state: State = { data: "test" };
		const storage = new LocalStorage();
		storage.saveState("key", state);

		const storedState = localStorage.getItem("key");
		expect(storedState).toBe(JSON.stringify(state));
	});

	test("saveState should handle errors gracefully", () => {
		jest.spyOn(JSON, "stringify").mockImplementation(() => {
			throw new Error("Error during stringification");
		});

		const state: State = { data: "test" };
		const storage = new LocalStorage();
		expect(() => storage.saveState("key", state)).not.toThrow();
	});
});
