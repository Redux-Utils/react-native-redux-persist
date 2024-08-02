/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from "@react-native-async-storage/async-storage";
import MobileStorage from "../src/MobileStorage";
import { rehydrate } from "../src/persistSlice";
import { persistStore } from "../src/persistStore";

jest.mock("../src/MobileStorage");

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
			storage: AsyncStorage,
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

		expect(MobileStorage.saveState).toHaveBeenCalledWith(
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

	it("should throw an error if key was not provided", () => {
		expect(() =>
			persistStore(store, {
				key: undefined as any,
				storage: AsyncStorage,
			}),
		).toThrow("Key is required in persistStore");
	});

	it("should throw an error if storage was not provided", () => {
		expect(() =>
			persistStore(store, {
				key: "myKey",
				storage: undefined as any,
			}),
		).toThrow("Storage is required in persistStore");
	});
});
