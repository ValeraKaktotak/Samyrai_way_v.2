import {AuthThunkActionCreator} from "./auth-reducer";

const initializationActionCreatorConst = 'INITIALIZATION';

// Action creators
export const initializationActionCreator = () => {
    return {
        type: initializationActionCreatorConst
    }
}

// thunk action creators
export const initializationAppThunkActionCreator = () => {
    return (dispatch) => {

        let authPromise = dispatch(AuthThunkActionCreator())

        authPromise.then(() => {
            dispatch(initializationActionCreator())
        })
        // Если промисов много, помещаем их в массив и используем .then к массиву
        // Promise.all([authPromise, promise1, promise2])
        //     .then(()=>{
        //
        //     })
    }
}

const init = {
    initialized: false
}
const appReducer = (state = init, action) => {
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