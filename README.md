## UNDER DEVELOPMENT

!!! DO NOT USE IT IN PRODUCTION !!!

# React Native Redux Persist

## JS README

- [JS README](./JS.README.md)

## Description

This is a library that helps you to persist your redux store and rehydrate it when the app is reloaded.
It uses the mobile storage to save the data.
You can use it with react-native and expo using the same code.
Project is written in TypeScript. However, you can use it in JavaScript projects as well.

## Installation

### NPM

```bash
npm install react-native-redux-persist
```

### Yarn

```bash
yarn add react-native-redux-persist
```

## Usage

### @Reduxjs/toolkit

```typescript
import { configureStore, createSlice } from "@reduxjs/toolkit";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
	PersistConfig,
	persistReducer,
	persistStore,
} from "react-native-redux-persist";

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

// Create a configuration for the persist
const configs: PersistConfig = {
	key: "root", // Key to store the data
	storage: AsyncStorage, // The storage that you want to use
};

const persistReducers = persistReducer(configs, reducers);

const store = configureStore({
	reducer: persistReducers.combinedReducers,
	preloadedState: persistReducers.preloadedState,
});

const persistor = persistStore(store, configs);

export default persistor;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

or you can use

### Redux LEGACY

```typescript
import { legacy_createStore as createStore } from "redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
	PersistConfig,
	persistReducer,
	persistStore,
} from "react-native-redux-persist";

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

// Create a configuration for the persist
const configs: PersistConfig = {
	key: "root", // Key to store the data
	storage: AsyncStorage, // The storage that you want to use
};

// Here you will pass all your reducers
const reducers = {
	example: exampleReducer,
};

const persistReducers = persistReducer(configs, reducers);

const store = createStore(
	persistReducers.combinedReducers,
	persistReducers.preloadedState,
);

const persistor = persistStore(store, configs);

export default persistor;
```

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
