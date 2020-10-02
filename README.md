# Redux store utility

A utility to simplify creation of Redux store by creating
- Action constants
- Actions, 
- Async actions
- Reducer

## Installation
```
npm install redux-store-utility
```
## Documentation

### Create Redux store for "PRODUCTS" as follows

store.js
```js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import beginInitialState from "./initialState.json";
import rootReducer from "./rootReducer";


const store = createStore(
    rootReducer,
    beginInitialState,
    applyMiddleware( thunk )
);

export default store;
```

rootReducer.js
```js
import { combineReducers } from "redux";
import reduxStoreUtility from "redux-store-utility";

const pr = reduxStoreUtility.createReducer( "PRODUCTS" )

const app = combineReducers( {
    products: pr.productsReducer,
} );

export default app;
```

initialState.json
```json
{
  "products": {
    "pending": false,
    "error": false,
    "list": []
  }
}
```
### To get synchronous actions
```js
import reduxStoreUtility from "redux-store-utility";

const syncActions = reduxStoreUtility.createActions( "Products" );
```
It will create following actions
- product Reset
- product Pending
- product Success
- product Error


### For fetching (async action) from api and putting in "PRODUCTS" store use as follows
```js
import reduxStoreUtility from "redux-store-utility";

const asyncActions = reduxStoreUtility.createAsyncActions( "Products" );

const request = new Request( 'http://localhost:3002/',
                                {
                                   method: 'GET',
                                   headers: { 'Accept': 'application/json' }
                                } );

const productsFetch = dispatch => request => dispatch( asyncActions.productsFetch( request ) );
```

