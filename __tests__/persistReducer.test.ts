/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineReducers } from "redux";

import MobileStorage from "../src/MobileStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "../src/persistReducer";
import { createSlice } from "@reduxjs/toolkit";

jest.mock("../src/MobileStorage");

const mockLoadState = MobileStorage.loadState as jest.Mock;

describe("persistReducer", () => {
	let fakeReducer: any;

	beforeAll(() => {
		fakeReducer = createSlice({
			name: "fakeReducer",
			initialState: {},
			reducers: {},
		});
	});

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

		const preloadedState = MobileStorage.loadState("root", AsyncStorage);

		expect(preloadedState).toEqual({ counter: 10 });
		expect(mockLoadState).toHaveBeenCalledWith("root", AsyncStorage);
	});

	it("Shoud throw an error if key was not provided", () => {
		expect(() =>
			persistReducer(
				{
					key: undefined as any,
					storage: AsyncStorage,
				},
				{
					fakeReducer: fakeReducer.reducer,
				},
			),
		).toThrow("You must provide a `key` to persistReducer");
	});

	it("shuld throw an error if storage was not provided", () => {
		expect(() =>
			persistReducer(
				{
					key: "root",
					storage: undefined as any,
				},
				{
					fakeReducer: fakeReducer.reducer,
				},
			),
		).toThrow("You must provide a `storage` to persistReducer");
	});
});
