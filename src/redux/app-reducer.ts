import {AuthThunkActionCreator} from "./auth-reducer";

const initializationActionCreatorConst = 'INITIALIZATION';

type initializationActionCreatorType = {
    type: typeof initializationActionCreatorConst
}

// Action creators
export const initializationActionCreator = (): initializationActionCreatorType => {
    return {
        type: initializationActionCreatorConst
    }
}

// thunk action creators
export const initializationAppThunkActionCreator = () => {
    return (dispatch: any) => {

        let authPromise = dispatch(AuthThunkActionCreator())

        authPromise.then(() => {
            dispatch(initializationActionCreator())
        })
    }
}

export type appReducerInitType = {
    initialized: boolean
}

const appReducerInit: appReducerInitType = {
    initialized: false
}
const appReducer = (state = appReducerInit, action: any): appReducerInitType => {
    switch (action.type) {
        case initializationActionCreatorConst:
            return {
                ...state,
                initialized: true
            }
    }
    return state
}

export default appReducer