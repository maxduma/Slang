import {applyMiddleware, combineReducers, compose, createStore} from 'redux';

import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appReducer from './app-reducer';
import homeReducer from './home-reducer';

const reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    home: homeReducer,
    form: formReducer,
    app: appReducer
});

// Redux Dev Tools
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)) );

window.store = store;  // delete later
// const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;