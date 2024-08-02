/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineReducers } from "redux";

import WebStorage from "../src/WebStorage";

jest.mock("../src/WebStorage");

const mockLoadState = WebStorage.loadState as jest.Mock;

describe("persistReducer", () => {
	it("should return combinedReducers and preloadedState", () => {
		const reducers = {
			someReducer: (state = {}, action: any) => state,
		};
		const persistSlice = (state = {}, action: any) => state;

		const combinedReducers = combineReducers({
			...reducers,
			persist: persistSlice,
		});

		expect(combinedReducers).toBeInstanceOf(Function);
	});

	it("should load preloadedState from localStorage storage", () => {
		mockLoadState.mockReturnValue({ counter: 10 });

		const preloadedState = WebStorage.loadState("root", {
			type: "localStorage",
		});

		expect(preloadedState).toEqual({ counter: 10 });
		expect(mockLoadState).toHaveBeenCalledWith("root", {
			type: "localStorage",
		});
	});
});
