import {AuthThunkActionCreator} from "./auth-reducer"
import {stopSubmit} from "redux-form"
import {baseThunkType, inferActionsTypes} from "./redux-store"
import {LoginApi, loginResultCodeEnum} from "../api/loginApi"

export const loginActionsCreators = {
    captchaActionCreator: (captcha:string) => ({type: 'SN/LOGIN/CAPTCHA-URL', captcha} as const)
}
type actionsTypes = inferActionsTypes<typeof loginActionsCreators>

export const loginUserThunkActionCreator = (email:string, password:string, rememberMe:boolean, captcha:string):baseThunkType<actionsTypes> => {
    return async (dispatch) => {
        let loginResponse = await LoginApi.login(email, password, rememberMe, captcha)
        if (loginResponse.resultCode === loginResultCodeEnum.success) {
            dispatch(AuthThunkActionCreator())
        } else {
            if(loginResponse.resultCode === loginResultCodeEnum.captcha){
                dispatch(captchaThunk())
            }
            let message = loginResponse.messages.length > 0 ? loginResponse.messages[0] : "Some error"
            let formErrorAction: any = stopSubmit("login", {_error: message});
            dispatch(formErrorAction)
        }
    }
}
export const captchaThunk = ():baseThunkType<actionsTypes> => {
    return async (dispatch) => {
        let captchaUrl = await LoginApi.captcha()
        dispatch(loginActionsCreators.captchaActionCreator(captchaUrl))
    }
}

type loginReducerInitType = {
    loginData: Array<any>
    captcha: string | null
}
const loginReducerInit: loginReducerInitType = {
    loginData: [],
    captcha: null as null | string
}

const loginReducer = (state = loginReducerInit, action:actionsTypes) => {
    switch (action.type) {
        case 'SN/LOGIN/CAPTCHA-URL':
            return {
                ...state,
                captcha: action.captcha
            }
    }
    return state
}

export default loginReducer