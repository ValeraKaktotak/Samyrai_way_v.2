import {successErrorEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {postDataType, photosType, profileType} from "../types/types"
import {ThunkAction} from "redux-thunk";
import {stateType} from "./redux-store";
import {ProfileAPI} from "../api/profileAPI";

const addPostActionCreatorConst = 'ADD-POST';
const setProfileActionCreatorConst = 'SET-PROFILE';
const setUserStatusActionCreatorConst = 'SET-STATUS';
const setPhotoActionCreatorConst = 'SET-PHOTO';


export type addPostActionCreatorType = {
    type: typeof addPostActionCreatorConst
    message: string
}
export const addPostActionCreator = (message: string): addPostActionCreatorType => {
    return {type: addPostActionCreatorConst, message: message}
}

type setProfileActionCreatorType = {
    type: typeof setProfileActionCreatorConst
    profile: profileType
}
export const setProfileActionCreator = (profile: profileType): setProfileActionCreatorType => {
    return {type: setProfileActionCreatorConst, profile}
}

type setUserStatusActionCreatorType = {
    type: typeof setUserStatusActionCreatorConst
    status: string
}
export const setUserStatusActionCreator = (status: string): setUserStatusActionCreatorType => {
    return {type: setUserStatusActionCreatorConst, status}
}

type setPhotoActionCreatorType = {
    type: typeof setPhotoActionCreatorConst
    photo: photosType
}
export const setPhotoActionCreator = (photo: photosType): setPhotoActionCreatorType => {
    return {type: setPhotoActionCreatorConst, photo}
}

export const getUserThunkActionCreator = (userId: number): thunkTypes => {
    return async (dispatch) => {
        let getUser = await ProfileAPI.getUser(userId)
        dispatch(setProfileActionCreator(getUser))
    }
}
export const setUserPhotoThunk = (file: any): thunkTypes => {
    return async (dispatch) => {
        let setPhoto = await ProfileAPI.setPhoto(file)
        dispatch(setPhotoActionCreator(setPhoto.data))
    }
}
export const setProfileDataThunk = (profile: profileType): thunkTypes => {
    return async (dispatch: any) => {
        let setProfile = await ProfileAPI.setProfile(profile)
        if (setProfile.resultCode === successErrorEnum.success) {
            dispatch(setProfileActionCreator(profile))
        } else {
            let message = setProfile.messages.length > 0 ? setProfile.messages[0] : "Some error";
            let formErrorAction = stopSubmit("profile-data", {_error: message});
            dispatch(formErrorAction);
            return Promise.reject(setProfile.messages[0])
        }
    }
}
export const getUserStatusThunkActionCreator = (userId: number): thunkTypes => {
    return async (dispatch) => {
        let getUserStatus = await ProfileAPI.getUserStatus(userId)
        dispatch(setUserStatusActionCreator(getUserStatus))
    }
}
export const setUserStatusThunkActionCreator = (status: string): thunkTypes=> {
    return async (dispatch) => {
        let setUserStatus = await ProfileAPI.setUserStatus(status)
        if (setUserStatus.resultCode === successErrorEnum.success) {
            dispatch(setUserStatusActionCreator(status))
        }
    }
}

type thunkTypes = ThunkAction<
    Promise<void>,
    stateType,
    unknown,
    actionTypes
>

type actionTypes =
    addPostActionCreatorType
    | setProfileActionCreatorType
    | setUserStatusActionCreatorType
    | setPhotoActionCreatorType

const profileReducerInit = {
    postData: [
        {
            id: 1,
            message: 'Hi, it\'s my first post',
            likes: 21,
            avatar: 'https://meragor.com/files/styles//ava_800_800_wm/avto-bmv_bmw-fon-transport-41424.jpg'
        },
        {
            id: 2,
            message: 'Hi, it\'s my second post',
            likes: 11,
            avatar: 'https://meragor.com/files/styles//ava_800_800_wm/avto-bmv_bmw-fon-transport-41424.jpg'
        },
        {
            id: 3,
            message: 'Hi, it\'s my third post',
            likes: 15,
            avatar: 'https://meragor.com/files/styles//ava_800_800_wm/avto-bmv_bmw-fon-transport-41424.jpg'
        },
    ] as Array<postDataType>,
    newMessageArea: '' as string,
    profile: null as profileType | null,
    userStatus: '' as string
}
type profileReducerInitType = typeof profileReducerInit

const profileReducer = (state = profileReducerInit, action: actionTypes): profileReducerInitType => {
    switch (action.type) {
        case addPostActionCreatorConst:
            let newPostObject = {
                id: 4,
                message: action.message,
                likes: 0,
                avatar: 'https://meragor.com/files/styles//ava_800_800_wm/avto-bmv_bmw-fon-transport-41424.jpg'
            }
            return {
                ...state,
                postData: [newPostObject, ...state.postData]
            }
        case setProfileActionCreatorConst:
            return {
                ...state,
                profile: {...state.profile, ...action.profile}
            }
        case setUserStatusActionCreatorConst:
            return {
                ...state,
                userStatus: action.status
            }
        case setPhotoActionCreatorConst:
            return {
                ...state,
                profile: {...state.profile, photos: action.photo} as profileType
            }
    }
    return state
}

export default profileReducer