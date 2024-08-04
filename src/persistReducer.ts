/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Action, Reducer, UnknownAction } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

import { rehydrateActionType } from "./constants";
import type { ReducerReceived } from "./types/persistReducer";

function persistReducer<
	S = any,
	A extends Action = UnknownAction,
	PreloadedState = S,
>(
	reducer: ReducerReceived<S, A, PreloadedState>,
): Reducer<S, A, PreloadedState> {
	const data: any = {
		state: {},
	};

	return (state: any = data.state, action: any) => {
		if (
			action.type &&
			(action?.type === "@@INIT" || action?.type?.startsWith("@@redux/INIT"))
		) {
			data.state = { ...state };
		}

		const rootReducer =
			typeof reducer === "function" ? reducer : combineReducers(reducer);

		switch (action.type) {
			case rehydrateActionType: {
				const rehydratedState = {
					...data.state,
					...(action?.payload || {}),
				};

				data.state = rootReducer(rehydratedState, {
					type: rehydrateActionType,
					payload: rehydratedState,
				} as any);

				return data.state;
			}
			default:
				return rootReducer(state, action);
		}
	};
}

export { persistReducer };
