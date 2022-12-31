import {AuthThunkActionCreator} from "./auth-reducer"
import {ThunkAction} from "redux-thunk"
import {inferActionsTypes, stateType} from "./redux-store"

type actionsTypes = inferActionsTypes<typeof appActionsCreators>
export const appActionsCreators = {
    initializationActionCreator: () => {
        return {type: 'SN/APP/INITIALIZATION'} as const
    }
}

// thunk action creators
export const initializationAppThunkActionCreator = ():ThunkAction<
    void,
    stateType,
    unknown,
    actionsTypes
> => {
    return (dispatch) => {

        let authPromise = dispatch(AuthThunkActionCreator())

        authPromise.then(() => {
            dispatch(appActionsCreators.initializationActionCreator())
        })
    }
}

const appReducerInit = {
    initialized: false
}
type appReducerInitType = typeof appReducerInit

const appReducer = (state = appReducerInit, action: actionsTypes): appReducerInitType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZATION':
            return {
                ...state,
                initialized: true
            }
    }
    return state
}

export default appReducer