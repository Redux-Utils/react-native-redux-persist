# React Native Redux Persist

## JS README

- [JS README](./JS.README.md)

## Description

This is a library that helps you to persist your redux store and rehydrate it when the app is reloaded.
It uses the mobile storage to save the data.
You can use it with react-native and expo using the same code.
Project is written in TypeScript. However, you can use it in JavaScript projects as well.

## Storages supported

- AsyncStorage (React Native and Expo)
  - type: "AsyncStorage"
- Expo Secure Store (Expo)
  - type: "expo-secure-store"
  - options: ExpoSecureStoreOptions
    - authenticationPrompt: string
    - keychainAccessible: KeychainAccessibilityConstant
    - keychainService: string
    - requireAuthentication: boolean
- Generic Storage (React Native and Expo)
  - type: "GenericStorage"
  - driver: GenericStorageType

## Expo Secure Store Options

```typescript
interface ExpoSecureStoreOptions {
	authenticationPrompt?: string;
	keychainAccessible?: KeychainAccessibilityConstant;
	keychainService?: string;
	requireAuthentication?: boolean;
}
```

## Installation

### NPM

```bash
npm install react-native-redux-persist2
```

### Yarn

```bash
yarn add react-native-redux-persist2
```

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
		type: "AsyncStorage", // The storage that you want to use
	},
};

// This will initialize the store and rehydrate it
initStore(store, configs);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

or you can use

- [Redux Legacy](./docs/REDUX_LEGACY.md)

## How to integrate with React Native or Expo

In your root component, you will wrap your components with the Provider from react-redux.

```tsx
import React from "react";

import { Provider } from "react-redux";
import store from "./redux/store"; // Is the persistor that you created and exported in the previous step

function App() {
	return <Provider store={store}>{/* Your components */}</Provider>;
}
```

## License

MIT

## Author

Gabriel Logan
