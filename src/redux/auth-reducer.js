import {AuthAPI} from "../api/api";

const setAuthActionCreatorConst = 'SET-LOGIN-AUTH';

// Action creators
export const setAuthActionCreator = (id, email, login, isLogged) => {
    return {
        type: setAuthActionCreatorConst,
        UserData: {
            id, email, login, isLogged
        }
    }
}

// thunk action creators
export const AuthThunkActionCreator = () => {
    return async (dispatch) => {
        let response = await AuthAPI.authMe();
        if (response.resultCode === 0) {
            let {id, email, login} = response.data;
            dispatch(setAuthActionCreator(id, email, login, true))
        }
    }
}

export const logOutHeaderAuthThunkActionCreator = () => {
    return (dispatch) => {
        dispatch(setAuthActionCreator(null, null, null, false))
    }
}

//передаем часть данных связанных с данным редьюсером для первого рендера(создание state)
const init = {
    id: null,
    email: null,
    login: null,
    isLogged: false,
}
const authReducer = (state = init, action) => {
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