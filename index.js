import { createActions } from "./lib/createActions";
import { createAsyncActions } from "./lib/createAsyncActions";
import createConstants from "./lib/createConstants";
import { createReducer } from "./lib/createReducer";

const utility = {
    createActions: createActions,
    createAsyncActions: createAsyncActions,
    createConstants: createConstants,
    createReducer: createReducer,
}

export default utility;
