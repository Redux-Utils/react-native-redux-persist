## Expo Secure Store (Expo)

- Expo Secure Store (Expo)
  - type: "expo-secure-store"
  - options: ExpoSecureStoreOptions
    - authenticationPrompt: string
	- keychainAccessible: KeychainAccessibilityConstant
	- keychainService: string
	- requireAuthentication: boolean

## Expo Secure Store Options

```typescript
interface ExpoSecureStoreOptions {
	authenticationPrompt?: string;
	keychainAccessible?: KeychainAccessibilityConstant;
	keychainService?: string;
	requireAuthentication?: boolean;
}
```

## Description

This is a library that helps you to persist your redux store and rehydrate it when the app is reloaded.

## Usage

### @Reduxjs/toolkit

```ts
import { configureStore, createSlice } from "@reduxjs/toolkit";

import {
	persistReducer,
	initStore,
	PersistConfig,
} from "react-native-redux-persist2";

// Example of a reducer

const exampleSlice = createSlice({
	name: "example",
	initialState: {
		value: 0,
	},
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
	},
});

// Here you will pass all your reducers

const reducers = {
	example: exampleSlice.reducer,
};

const rootReducer = persistReducer(reducers);

const store = configureStore({
	reducer: rootReducer,
});

const configs: PersistConfig = {
	key: "root", // Key to store the data
	storage: {
		type: "expo-secure-store", // The storage that you want to use
		options: {
			authenticationPrompt: "Authenticate to access the data",
			keychainAccessible: "WheWhenUnlocked",
			keychainService: "com.example.app",
			requireAuthentication: true,
		},
	},
};

// This will initialize the store and rehydrate it
initStore(store, configs);

export default store;
```
