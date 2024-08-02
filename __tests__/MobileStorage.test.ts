/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from "@react-native-async-storage/async-storage";
import MobileStorage from "../src/MobileStorage";

describe("MobileStorage", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should call asyncStorageL.loadState when storage is AsyncStorage", async () => {
		const key = "myKey";
		const storage = AsyncStorage;

		const loadStateSpy = jest.spyOn(MobileStorage, "loadState");

		await MobileStorage.loadState(key, storage);

		expect(loadStateSpy).toHaveBeenCalledWith(key, storage);
	});

	it("should call asyncStorageL.saveState when storage is AsyncStorage", async () => {
		const key = "myKey";
		const state = { foo: "bar" };
		const storage = AsyncStorage;

		const saveStateSpy = jest.spyOn(MobileStorage, "saveState");

		await MobileStorage.saveState(key, state, storage);

		expect(saveStateSpy).toHaveBeenCalledWith(key, state, storage);
	});
});
