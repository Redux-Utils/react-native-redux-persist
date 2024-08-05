### Redux LEGACY

```typescript
import { legacy_createStore as createStore } from "redux";

import {
	persistReducer,
	initStore,
	PersistConfig,
} from "react-native-redux-persist2";

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

const configs: PersistConfig = {
	key: "root", // Key to store the data
	storage: {
		type: "AsyncStorage", // The storage that you want to use
	},
};

// This will initialize the store and rehydrate it
initStore(store, configs);

export default store;
```

## JS

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
