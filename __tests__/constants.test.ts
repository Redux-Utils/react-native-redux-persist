import { rehydrateActionType, prefix, expoSecureStorePrefix } from "../src/constants";

describe("constants", () => {
	it("Should retorn exactly string react/native/redux/persist:", () => {
		const correctPrefix = "react/native/redux/persist:";

		expect(prefix).toBe(correctPrefix);
	});

	// it("Should retorn exactly string persist/rehydrate", () => {
	it("Should retorn exactly string persist/rehydrate", () => {
		const correctPersistActionType = "persist/rehydrate";

		expect(rehydrateActionType).toBe(correctPersistActionType);
	});

	// Should return exacly string for expoSecureStorePrefix
	it("Should retorn exactly string expoSecureStorePrefix", () => {
		const correctPrefix = "rnrp.";

		expect(expoSecureStorePrefix).toBe(correctPrefix);
	});
});
