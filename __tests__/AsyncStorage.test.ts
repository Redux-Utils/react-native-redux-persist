import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageLocal from "../src/MobileStorage/AsyncStorageLocal";
import type { State } from "../src/types/MobileStorage";

describe("AsyncStorageLocal", () => {
	beforeEach(async () => {
		await AsyncStorage.clear();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("loadState should return undefined if no item exists", async () => {
		const storage = new AsyncStorageLocal();
		const state = await storage.loadState("nonExistentKey", AsyncStorage);
		expect(state).toBeUndefined();
	});

	test("loadState should return parsed state if item exists", async () => {
		const state = { data: "test", persist: true };
		await AsyncStorage.setItem("key", JSON.stringify(state));

		const storage = new AsyncStorageLocal();
		const loadedState = await storage.loadState("key", AsyncStorage);
		expect(loadedState).toEqual({ data: "test" }); // 'persist' should be removed
	});

	test("loadState should return undefined if JSON parsing fails", async () => {
		await AsyncStorage.setItem("key", "not a valid json string");

		const storage = new AsyncStorageLocal();
		const state = await storage.loadState("key", AsyncStorage);
		expect(state).toBeUndefined();
	});

	test("saveState should save the state to AsyncStorage", async () => {
		const state: State = { data: "test" };
		const storage = new AsyncStorageLocal();
		await storage.saveState("key", state, AsyncStorage);

		const storedState = await AsyncStorage.getItem("key");
		expect(storedState).toBe(JSON.stringify(state));
	});

	test("saveState should handle errors gracefully", () => {
		jest.spyOn(JSON, "stringify").mockImplementation(() => {
			throw new Error("Error during stringification");
		});

		const state: State = { data: "test" };
		const storage = new AsyncStorageLocal();
		expect(
			async () => await storage.saveState("key", state, AsyncStorage),
		).not.toThrow();
	});
});
