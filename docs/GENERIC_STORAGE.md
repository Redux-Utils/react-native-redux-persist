## Generic Storage (React Native and Expo)

- type: "GenericStorage"
- driver: GenericStorageType

## Generic Storage Type

```typescript
interface GenericStorageType {
	setItem: (key: string, value: string) => Promise<void>;
	getItem: (key: string) => Promise<string | null>;
}
```

## Description

Using this option, you can provide your own driver, and it will function as expected. However, ensure that your driver includes the `setItem` and `getItem` methods to avoid unexpected errors. If your driver lacks these methods, you can create a function to convert and pass them accordingly.

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
		type: "GenericStorage", // The storage that you want to use
		driver: GenericStorageType, // Your driver here
	},
};

// This will initialize the store and rehydrate it
initStore(store, configs);

export default store;
```

## Generic Storage Example

```typescript
// If you have a driver that lacks the setItem and getItem methods, you can create a function to convert and pass them accordingly.

const driver = {
	setItem: (key: string, value: string): void => {
		// Your logic here
		return ExampleStorage.diferentWayToSetItem(key, value);
	},
	getItem: (key: string): string => {
		// Your logic here
		return ExampleStorage.diferentWayToGetItem(key);
	},
};

// Then you can use it like this

const configs: PersistConfig = {
	key: "root", // Key to store the data
	storage: {
		type: "GenericStorage", // The storage that you want to use
		driver: driver, // Your driver here
	},
};

// This will initialize the store and rehydrate it
initStore(store, configs);
```
