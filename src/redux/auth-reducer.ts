import {AuthAPI, LoginApi} from "../api/api";
const setAuthActionCreatorConst = 'SET-LOGIN-AUTH';

type setAuthActionType = {
    type: typeof setAuthActionCreatorConst,
    UserData: authReducerInitType
}
export const setAuthActionCreator = (id: number | null, email: string | null, login: string | null, isLogged: boolean):setAuthActionType => {
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

export const logOutUserThunkActionCreator = () => {
    return async (dispatch: any) => {
        let logOutResponse = await LoginApi.logOut()
        if (logOutResponse.resultCode === 0) {
            dispatch(logOutHeaderAuthThunkActionCreator())
        }
    }
}

export const logOutHeaderAuthThunkActionCreator = () => {
    return (dispatch: any) => {
        dispatch(setAuthActionCreator(null, null, null, false))
    }
}

const authReducerInit = {
    id: null as number | null,
    email: null as string | null,
    login: null as string |null,
    isLogged: false as boolean,
}
export type authReducerInitType = typeof authReducerInit

const authReducer = (state = authReducerInit, action:setAuthActionType):authReducerInitType => {
    switch (action.type) {
        case setAuthActionCreatorConst:
            return {
                ...state,
                ...action.UserData,
            }
    }
    return state
}

export default authReducer