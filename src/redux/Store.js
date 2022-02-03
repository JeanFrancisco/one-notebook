import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../components/auth/reducers";
import { notesReducer } from "./reducers/notesReducer";
import { uiReducer } from "./reducers/uiReducer";


const allReducers = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    notes: notesReducer,
});

/* <---- FOR DEBUG ENVIRONMENT ONLY ----> */
const composeEnhancers = ( typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 15
}) ) || compose;

const Store = createStore(
    allReducers,
    composeEnhancers( applyMiddleware(thunk) ),
);

export default Store;