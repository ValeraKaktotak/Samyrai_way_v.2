import {LoginApi} from "../api/api";
import {logOutHeaderAuthThunkActionCreator, AuthThunkActionCreator} from "./auth-reducer";
import {stopSubmit} from "redux-form";


const captchaActionCreatorConst = 'CAPTCHA-URL';

export const captchaActionCreator = (captcha) => {
    return {
        type: captchaActionCreatorConst,
        captcha
    }
}

export const loginUserThunkActionCreator = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        let loginResponse = await LoginApi.login(email, password, rememberMe, captcha)
        if (loginResponse.resultCode === 0) {
            dispatch(AuthThunkActionCreator())
        } else {
            if(loginResponse.resultCode === 10){
                dispatch(captchaThunk())
            }
            let message = loginResponse.messages.length > 0 ? loginResponse.messages[0] : "Some error";
            let formErrorAction = stopSubmit("login", {_error: message});
            dispatch(formErrorAction);
        }
    }
}

export const captchaThunk = () => {
    return async (dispatch) => {
        let captchaUrl = await LoginApi.captcha()
        dispatch(captchaActionCreator(captchaUrl))
    }
}

export const logOutUserThunkActionCreator = () => {
    return async (dispatch) => {
        let logOutResponse = await LoginApi.logOut()
        if (logOutResponse.resultCode === 0) {
            dispatch(logOutHeaderAuthThunkActionCreator())
        }
    }
}

//передаем часть данных связанных с данным редьюсером для первого рендера(создание state)
const init = {
    loginData: [],
    captcha: null
}
const loginReducer = (state = init, action) => {
    switch (action.type) {
        case captchaActionCreatorConst:
            return {
                ...state,
                captcha: action.captcha.url
            }
    }
    return state
}

export default loginReducer