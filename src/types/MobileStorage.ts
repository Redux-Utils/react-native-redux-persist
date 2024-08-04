import type { GetState } from "@reduxjs/toolkit";

export type State = GetState<unknown>;

export type LoadState = State | undefined;

export type StorageTypes = "AsyncStorage" | "expo-secure-store";

export type MobileStorageOptions = StorageTypes;
