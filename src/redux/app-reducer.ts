import {AuthThunkActionCreator} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {stateType} from "./redux-store";

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
export const initializationAppThunkActionCreator = ():ThunkAction<
    void,
    stateType,
    unknown,
    initializationActionCreatorType
> => {
    return (dispatch) => {

        let authPromise = dispatch(AuthThunkActionCreator())

        authPromise.then(() => {
            dispatch(initializationActionCreator())
        })
    }
}

type appReducerInitType = {
    initialized: boolean
}

const appReducerInit: appReducerInitType = {
    initialized: false
}
const appReducer = (state = appReducerInit, action: initializationActionCreatorType): appReducerInitType => {
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