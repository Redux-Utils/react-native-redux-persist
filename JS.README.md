## UNDER DEVELOPMENT

!!! DO NOT USE IT IN PRODUCTION !!!

# React Native Redux Persist

## TS README

- [TS README](./README.md)

## Storages supported

- AsyncStorage
 - type: "AsyncStorage"
- Expo Secure Store
 - type: "expo-secure-store"
 - options: ExpoSecureStoreOptions
	 - authenticationPrompt: string
	 - keychainAccessible: KeychainAccessibilityConstant
	 - keychainService: string
	 - requireAuthentication: boolean

## Description

This is a library that helps you to persist your redux store and rehydrate it when the app is reloaded.
It uses the mobile storage to save the data.
You can use it with react-native and expo using the same code.
Project is written in TypeScript. However, you can use it in JavaScript projects as well.

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

```js
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

const configs = {
	key: "root", // Key to store the data
	storage: {
		type: "AsyncStorage", // The storage that you want to use
	},
};

// This will initialize the store and rehydrate it
initStore(store, configs);

export default store;
```

or you can use

### Redux LEGACY

```js
import { legacy_createStore as createStore } from "redux";

import { persistReducer, initStore } from "react-native-redux-persist2";

// Example of a reducer
const initialState = {
	value: 0,
};

const exampleReducer = (state = initialState, action) => {
	switch (action.type) {
		case "INCREMENT":
			return {
				...state,
				value: state.value + 1,
			};
		default:
			return state;
	}
};

// Here you will pass all your reducers
const reducers = {
	example: exampleReducer,
};

const rootReducer = persistReducer(reducers);

const store = createStore(rootReducer);

const configs = {
	key: "root", // Key to store the data
	storage: {
		type: "AsyncStorage", // The storage that you want to use
	},
};

// This will initialize the store and rehydrate it
initStore(store, configs);

export default store;
```

## How to integrate with React

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
