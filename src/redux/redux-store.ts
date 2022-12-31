import {Action, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux"
import sidebarReducer from "./sidebar-reducer"
import profileReducer from "./profile-reducer"
import messagesReducer from "./messages-reducer"
import usersReducer from "./users-reducer"
import authReducer from "./auth-reducer"
import loginReducer from "./login-reducer"
import thunkMiddleWear, {ThunkAction} from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer"

const reducers = combineReducers({
    messagesPage: messagesReducer,
    profilePage: profileReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    loginAuth: authReducer,
    loginPage: loginReducer,
    form: formReducer,
    app: appReducer
})

//типизируем общий стэйт
type rootReducersType = typeof reducers
export type stateType = ReturnType<rootReducersType>

//ф-ция для типизации объекта с экшенами
type actionCreatorsObject<T> = T extends { [key: string]: infer U } ? U : never
export type inferActionsTypes<T extends { [key: string]: (...params: any[]) => any }> = ReturnType<actionCreatorsObject<T>>

//типизация для возвращаемых значений thunk
export type baseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, stateType, unknown, A>

//подключаем redux dev tools
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWear)))

//подключение редакса без redux dev tools
//const store = createStore(reducers, applyMiddleware(thunkMiddleWear));

// @ts-ignore
window.store = store

export default store