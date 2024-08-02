/* eslint-disable @typescript-eslint/no-explicit-any */
import WebStorage from "../src/WebStorage";
import { rehydrate } from "../src/persistSlice";
import { persistStore } from "../src/persistStore";

jest.mock("../src/WebStorage");

describe("persistStore", () => {
	let store: any;
	let configs: any;

	beforeEach(() => {
		store = {
			subscribe: jest.fn(),
			dispatch: jest.fn(),
			getState: jest.fn(() => ({ foo: "bar" })),
		};

		configs = {
			key: "myKey",
			storage: {
				type: "localStorage",
			},
		};
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should save state to storage on store subscription", () => {
		persistStore(store, configs);

		expect(store.subscribe).toHaveBeenCalled();

		const callback = store.subscribe.mock.calls[0][0];
		callback();

		expect(WebStorage.saveState).toHaveBeenCalledWith(
			configs.key,
			store.getState(),
			configs.storage,
		);
	});

	it("should dispatch rehydrate action", () => {
		persistStore(store, configs);

		expect(store.dispatch).toHaveBeenCalledWith(rehydrate());
	});

	it("should return the store", () => {
		const result = persistStore(store, configs);

		expect(result).toBe(store);
	});

	it("should use default storage type when storage is not provided", () => {
		configs.storage = undefined; // Explicitly set storage to undefined
		persistStore(store, configs);

		expect(store.subscribe).toHaveBeenCalled();

		const callback = store.subscribe.mock.calls[0][0];
		callback();

		expect(WebStorage.saveState).toHaveBeenCalledWith(
			configs.key,
			store.getState(),
			{ type: "localStorage" },
		);
	});
});
