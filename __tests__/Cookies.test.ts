/* eslint-disable @typescript-eslint/no-explicit-any */
import cookies from "js-cookie";

import Cookies from "../src/WebStorage/Cookies";

jest.mock("js-cookie", () => ({
	get: jest.fn(),
	set: jest.fn(),
}));

describe("Cookies", () => {
	let cookiesMock: jest.Mocked<typeof cookies>;

	beforeEach(() => {
		cookiesMock = cookies as jest.Mocked<typeof cookies>;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("loadState should return undefined if no item exists", () => {
		cookiesMock.get.mockReturnValueOnce(undefined as any);

		const storage = new Cookies();
		const state = storage.loadState("nonExistentKey");

		expect(state).toBeUndefined();
		expect(cookiesMock.get).toHaveBeenCalledWith("nonExistentKey");
	});

	test("loadState should return parsed state if item exists", () => {
		const state = { data: "test", persist: true };
		const serializedState = JSON.stringify(state);
		cookiesMock.get.mockReturnValueOnce(serializedState as any);

		const storage = new Cookies();
		const loadedState = storage.loadState("key");

		expect(loadedState).toEqual({ data: "test" });
		expect(cookiesMock.get).toHaveBeenCalledWith("key");
	});

	test("saveState should save the state to cookies", () => {
		const state = { data: "test" };
		const options = { expires: 7 };
		const storage = new Cookies();

		storage.saveState("key", state, options);

		expect(cookiesMock.set).toHaveBeenCalledWith(
			"key",
			JSON.stringify(state),
			options,
		);
	});
});
