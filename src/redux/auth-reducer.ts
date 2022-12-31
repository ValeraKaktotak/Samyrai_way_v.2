import {baseThunkType, inferActionsTypes} from "./redux-store"
import {successErrorEnum} from "../api/api"
import {LoginApi} from "../api/loginApi"
import {AuthAPI} from "../api/authAPI"

type actionsTypes = inferActionsTypes<typeof authActionCreators>
export const authActionCreators = {
    setAuthActionCreator: (id: number | null, email: string | null, login: string | null, isLogged: boolean) => {
        return {
            type: 'SN/AUTH/SET-LOGIN-AUTH',
            UserData: {
                id, email, login, isLogged
            }
        } as const
    }
}

export const AuthThunkActionCreator = (): baseThunkType<actionsTypes> => {
    return async (dispatch) => {
        let response = await AuthAPI.authMe();
        if (response.resultCode == successErrorEnum.success) {
            let {id, email, login} = response.data;
            dispatch(authActionCreators.setAuthActionCreator(id, email, login, true))
        }
    }
}

export const logOutUserThunkActionCreator = (): baseThunkType<actionsTypes> => {
    return async (dispatch) => {
        let logOutResponse = await LoginApi.logOut()
        if (logOutResponse.resultCode === successErrorEnum.success) {
            dispatch(logOutHeaderAuthThunkActionCreator())
        }
    }
}

export const logOutHeaderAuthThunkActionCreator = (): baseThunkType<actionsTypes, void> => {
    return (dispatch) => {
        dispatch(authActionCreators.setAuthActionCreator(null, null, null, false))
    }
}

const authReducerInit = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isLogged: false as boolean,
}
export type authReducerInitType = typeof authReducerInit

const authReducer = (state = authReducerInit, action: actionsTypes): authReducerInitType => {
    switch (action.type) {
        case 'SN/AUTH/SET-LOGIN-AUTH':
            return {
                ...state,
                ...action.UserData,
            }
    }
    return state
}

export default authReducer