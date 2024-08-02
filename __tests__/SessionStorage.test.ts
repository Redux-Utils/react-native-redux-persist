/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SessionStorage from "../src/WebStorage/SessionStorage";
import type { State } from "../src/types/WebStorage";

describe("SessionStorage", () => {
	let sessionStorageMock: any;

	beforeEach(() => {
		sessionStorageMock = (function () {
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

		Object.defineProperty(window, "sessionStorage", {
			value: sessionStorageMock,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("loadState should return undefined if no item exists", () => {
		const storage = new SessionStorage();
		const state = storage.loadState("nonExistentKey");
		expect(state).toBeUndefined();
	});

	test("loadState should return parsed state if item exists", () => {
		const state = { data: "test", persist: true };
		sessionStorage.setItem("key", JSON.stringify(state));

		const storage = new SessionStorage();
		const loadedState = storage.loadState("key");
		expect(loadedState).toEqual({ data: "test" }); // 'persist' should be removed
	});

	test("loadState should return undefined if JSON parsing fails", () => {
		sessionStorage.setItem("key", "not a valid json string");

		const storage = new SessionStorage();
		const state = storage.loadState("key");
		expect(state).toBeUndefined();
	});

	test("saveState should save the state to sessionStorage", () => {
		const state: State = { data: "test" };
		const storage = new SessionStorage();
		storage.saveState("key", state);

		const storedState = sessionStorage.getItem("key");
		expect(storedState).toBe(JSON.stringify(state));
	});

	test("saveState should handle errors gracefully", () => {
		jest.spyOn(JSON, "stringify").mockImplementation(() => {
			throw new Error("Error during stringification");
		});

		const state: State = { data: "test" };
		const storage = new SessionStorage();
		expect(() => storage.saveState("key", state)).not.toThrow();
	});
});
