import {AuthAPI} from "../api/api";

const setAuthActionCreatorConst = 'SET-LOGIN-AUTH';

export type authReducerInitType = {
    id: number | null
    email: string | null
    login: string | null
    isLogged: boolean | null
}
type setAuthActionType = {
    type: typeof setAuthActionCreatorConst,
    UserData: authReducerInitType
}

export const setAuthActionCreator = (id: number | null, email: string | null, login: string | null, isLogged: boolean | null):setAuthActionType => {
    return {
        type: setAuthActionCreatorConst,
        UserData: {
            id, email, login, isLogged
        }
    }
}

export const AuthThunkActionCreator = () => {
    return async (dispatch: any) => {
        let response = await AuthAPI.authMe();
        if (response.resultCode === 0) {
            let {id, email, login} = response.data;
            dispatch(setAuthActionCreator(id, email, login, true))
        }
    }
}

export const logOutHeaderAuthThunkActionCreator = () => {
    return (dispatch: any) => {
        dispatch(setAuthActionCreator(null, null, null, false))
    }
}

const authReducerInit:authReducerInitType = {
    id: null,
    email: null,
    login: null,
    isLogged: false,
}
const authReducer = (state = authReducerInit, action:setAuthActionType):authReducerInitType => {
    switch (action.type) {
        case setAuthActionCreatorConst:
            return {
                ...state,
                ...action.UserData
            }
    }
    return state
}

export default authReducer