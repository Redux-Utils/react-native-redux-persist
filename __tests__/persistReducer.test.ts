import { persistReducer } from "../src/persistReducer";
import { rehydrateActionType } from "../src/constants";
import { Reducer } from "redux";

describe("persistReducer", () => {
	let mockReducer: Reducer;
	const exec = (state: any, action: any) =>
		persistReducer(mockReducer)(state, action);

	beforeEach(() => {
		mockReducer = jest.fn((state: any, action: any) => state);
	});

	afterEach(() => {
		jest.clearAllMocks();
		jest.resetModules();
	});

	it("does not break when state and action are empty", () => {
		expect(exec(undefined, {})).toEqual({});
	});

	it("returns preloaded state", () => {
		const state = { cool: "state" };

		expect(exec(state, { type: "@@INIT" })).toEqual(state);

		expect(exec(state, { type: "@@redux/INIT.12345" })).toEqual(state);
	});

	it("returns rehydrated state", () => {
		const payload = {
			wow: "beep",
			nah: "lol",
		};

		expect(
			exec(null, {
				type: rehydrateActionType,
				payload,
			}),
		).toEqual(payload);
	});

	it("does not fail if there is missing payload", () => {
		expect(exec(null, { type: rehydrateActionType })).toEqual({});
	});

	it("Should return the rehydrated state when action type is rehydrateActionType", () => {
		const initialState = { count: 0 };
		const reducer = (state = initialState, action: any) => {
			switch (action.type) {
				case "INCREMENT":
					return { count: state.count + 1 };
				case "DECREMENT":
					return { count: state.count - 1 };
				default:
					return state;
			}
		};
		const persistedReducer = persistReducer(reducer);

		const rehydratedState = { count: 10 };
		const action = {
			type: rehydrateActionType,
			payload: rehydratedState,
		};
		const nextState = persistedReducer(undefined, action);

		expect(nextState).toEqual(rehydratedState); // Changed to toEqual
	});

	it("Should return the state returned by the root reducer for other action types", () => {
		const initialState = { count: 0 };
		const reducer = (state = initialState, action: any) => {
			switch (action.type) {
				case "INCREMENT":
					return { count: state.count + 1 };
				case "DECREMENT":
					return { count: state.count - 1 };
				default:
					return state;
			}
		};
		const persistedReducer = persistReducer(reducer);

		const action = { type: "INCREMENT" };
		const nextState = persistedReducer(initialState, action);

		expect(nextState).toEqual({ count: 1 });
	});
});
