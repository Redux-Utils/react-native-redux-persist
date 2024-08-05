import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageLocal from "../src/MobileStorage/AsyncStorageLocal";

describe("AsyncStorageLocal", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("saveState", () => {
		it("should save state", async () => {
			const key = "key";
			const state = { key: "value" };

			expect(
				await AsyncStorageLocal.saveState(key, state, AsyncStorage),
			).toBeUndefined();
		});
	});

	describe("loadState", () => {
		it("should load state", async () => {
			const key = "key";
			const state = { key: "value" };

			await AsyncStorageLocal.saveState(key, state, AsyncStorage);

			const result = await AsyncStorageLocal.loadState(key, AsyncStorage);

			expect(result).toStrictEqual(state);
		});

		it("should return undefined if state not found", async () => {
			const key = "key";

			await AsyncStorage.removeItem(key);

			const result = await AsyncStorageLocal.loadState(key, AsyncStorage);

			expect(result).toBeUndefined();
		});
	});
});
