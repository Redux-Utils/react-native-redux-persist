import type { Action, Reducer, ReducersMapObject } from "redux";

export type ReducerReceived<S, A extends Action, PreloadedState> =
	| Reducer<S, A, PreloadedState>
	| ReducersMapObject<S, A, PreloadedState>;
