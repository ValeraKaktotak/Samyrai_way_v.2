import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import sidebarReducer from "./sidebar-reducer";
import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import loginReducer from "./login-reducer";
import thunkMiddleWear from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";

const reducers = combineReducers({
    messagesPage: messagesReducer,
    profilePage: profileReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    loginAuth: authReducer,
    loginPage: loginReducer,
    form: formReducer,
    app:appReducer
})

//подключаем redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWear)));

//подключение редакса без redux dev tools
//const store = createStore(reducers, applyMiddleware(thunkMiddleWear));

window.store = store;

export default store