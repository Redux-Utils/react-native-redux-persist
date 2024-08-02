import { persistActionType, prefix } from "../src/constants";

describe("constants", () => {
	it("Should retorn exactly string react/redux/persist:", () => {
		const correctPrefix = "react/redux/persist:";

		expect(prefix).toBe(correctPrefix);
	});

	// it("Should retorn exactly string persist/rehydrate", () => {
	it("Should retorn exactly string persist/rehydrate", () => {
		const correctPersistActionType = "persist/rehydrate";

		expect(persistActionType).toBe(correctPersistActionType);
	});
});
