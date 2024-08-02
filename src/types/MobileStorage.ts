import type { AsyncStorageStatic } from "@react-native-async-storage/async-storage";
import type { GetState } from "@reduxjs/toolkit";

export type State = GetState<unknown>;

export type LoadState = State | undefined;

// União discriminada para MobileStorageOptions
export type MobileStorageOptions = AsyncStorageStatic;
