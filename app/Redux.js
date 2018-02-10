import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'

import {authReducer} from "./reducers/AuthReducer";
import {logsReducer} from "./reducers/LogsReducer";
import {sessionReducer} from "./reducers/SessionReducer";

import {loginService} from "./services/AuthService";
import {logsService} from "./services/LogsService";
import {sessionService} from "./services/SessionService";

const appReducer = combineReducers({
	auth: authReducer,
	logs: logsReducer,
	session: sessionReducer,
});

const persistConfig = {
	key: 'root',
	storage: storage,
	blacklist: ['session']
};
const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = createStore(persistedReducer, composeWithDevTools(
	applyMiddleware(loginService),
	applyMiddleware(logsService),
	applyMiddleware(sessionService),
));


export const persistor = persistStore(store);


window.store = store;
window.persistor = persistor;

// export default store;
// export default persistor;

// exports.persistor = persistor;
// exports.store = store;
