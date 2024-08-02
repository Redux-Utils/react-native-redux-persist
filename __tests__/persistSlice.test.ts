import persistSlice, { rehydrate } from "../src/persistSlice";
import type { PersistState } from "../src/types/PersistSlice";

describe("persistSlice", () => {
	describe("rehydrate", () => {
		it("should set rehydrated to true", () => {
			const initialState: PersistState = {
				rehydrated: false,
			};

			const nextState = persistSlice(initialState, rehydrate());

			expect(nextState.rehydrated).toBe(true);
		});
	});
});
