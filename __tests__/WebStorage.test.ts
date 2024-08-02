/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import WebStorage from "../src/WebStorage";
import Cookies from "../src/WebStorage/Cookies";
import LocalStorage from "../src/WebStorage/LocalStorage";
import SessionStorage from "../src/WebStorage/SessionStorage";
import { prefix } from "../src/constants";
import type { WebStorageOptions } from "../src/types/WebStorage";

jest.mock("../src/WebStorage/Cookies");
jest.mock("../src/WebStorage/LocalStorage");
jest.mock("../src/WebStorage/SessionStorage");

describe("WebStorage", () => {
	let localStorageMock: jest.Mocked<LocalStorage>;
	let sessionStorageMock: jest.Mocked<SessionStorage>;
	let cookiesMock: jest.Mocked<Cookies>;

	beforeEach(() => {
		localStorageMock = new LocalStorage() as jest.Mocked<LocalStorage>;
		sessionStorageMock = new SessionStorage() as jest.Mocked<SessionStorage>;
		cookiesMock = new Cookies() as jest.Mocked<Cookies>;

		Object.defineProperty(WebStorage, "localStorage", {
			value: localStorageMock,
		});
		Object.defineProperty(WebStorage, "sessionStorage", {
			value: sessionStorageMock,
		});
		Object.defineProperty(WebStorage, "cookies", {
			value: cookiesMock,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("loadState", () => {
		it("should load state from localStorage", () => {
			const key = "testKey";
			const storage: WebStorageOptions = { type: "localStorage" };
			localStorageMock.loadState.mockReturnValue({ data: "testData" });

			const result = WebStorage.loadState(key, storage);

			expect(localStorageMock.loadState).toHaveBeenCalledWith(prefix + key);
			expect(result).toEqual({ data: "testData" });
		});

		it("should load state from sessionStorage", () => {
			const key = "testKey";
			const storage: WebStorageOptions = { type: "sessionStorage" };
			sessionStorageMock.loadState.mockReturnValue({ data: "testData" });

			const result = WebStorage.loadState(key, storage);

			expect(sessionStorageMock.loadState).toHaveBeenCalledWith(prefix + key);
			expect(result).toEqual({ data: "testData" });
		});

		it("should load state from cookies", () => {
			const key = "testKey";
			const storage: WebStorageOptions = {
				type: "cookies",
				options: { secure: true },
			};
			cookiesMock.loadState.mockReturnValue({ data: "testData" });

			const result = WebStorage.loadState(key, storage);

			expect(cookiesMock.loadState).toHaveBeenCalledWith(prefix + key);
			expect(result).toEqual({ data: "testData" });
		});
	});

	describe("saveState", () => {
		it("should save state to localStorage", () => {
			const key = "testKey";
			const state = { data: "testData" };
			const storage: WebStorageOptions = { type: "localStorage" };

			WebStorage.saveState(key, state, storage);

			expect(localStorageMock.saveState).toHaveBeenCalledWith(
				prefix + key,
				state,
			);
		});

		it("should save state to sessionStorage", () => {
			const key = "testKey";
			const state = { data: "testData" };
			const storage: WebStorageOptions = { type: "sessionStorage" };

			WebStorage.saveState(key, state, storage);

			expect(sessionStorageMock.saveState).toHaveBeenCalledWith(
				prefix + key,
				state,
			);
		});

		it("should save state to cookies", () => {
			const key = "testKey";
			const state = { data: "testData" };
			const storage: WebStorageOptions = { type: "cookies", options: {} };

			WebStorage.saveState(key, state, storage);

			expect(cookiesMock.saveState).toHaveBeenCalledWith(
				prefix + key,
				state,
				storage.options,
			);
		});
	});
});
