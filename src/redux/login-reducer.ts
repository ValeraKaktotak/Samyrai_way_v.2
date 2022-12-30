import {AuthThunkActionCreator} from "./auth-reducer";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {stateType} from "./redux-store";
import {LoginApi, loginResultCodeEnum} from "../api/loginApi";

const captchaActionCreatorConst = 'CAPTCHA-URL';
type captchaActionCreatorType = {
    type: typeof captchaActionCreatorConst
    captcha: string
}
export const captchaActionCreator = (captcha:string):captchaActionCreatorType => {
    return {
        type: captchaActionCreatorConst,
        captcha
    }
}

export const loginUserThunkActionCreator = (email:string, password:string, rememberMe:boolean, captcha:string):ThunkAction<
    Promise<void>,
    stateType,
    unknown,
    captchaActionCreatorType
> => {
    return async (dispatch: any) => {
        let loginResponse = await LoginApi.login(email, password, rememberMe, captcha)
        if (loginResponse.resultCode === loginResultCodeEnum.success) {
            dispatch(AuthThunkActionCreator())
        } else {
            if(loginResponse.resultCode === loginResultCodeEnum.captcha){
                dispatch(captchaThunk())
            }
            let message = loginResponse.messages.length > 0 ? loginResponse.messages[0] : "Some error";
            let formErrorAction = stopSubmit("login", {_error: message});
            dispatch(formErrorAction);
        }
    }
}
export const captchaThunk = ():ThunkAction<
    Promise<void>,
    stateType,
    unknown,
    captchaActionCreatorType
> => {
    return async (dispatch) => {
        let captchaUrl = await LoginApi.captcha()
        dispatch(captchaActionCreator(captchaUrl))
    }
}

type loginReducerInitType = {
    loginData: Array<any>
    captcha: string | null
}
const loginReducerInit: loginReducerInitType = {
    loginData: [],
    captcha: null
}

const loginReducer = (state = loginReducerInit, action:captchaActionCreatorType) => {
    switch (action.type) {
        case captchaActionCreatorConst:
            return {
                ...state,
                captcha: action.captcha
            }
    }
    return state
}

export default loginReducer