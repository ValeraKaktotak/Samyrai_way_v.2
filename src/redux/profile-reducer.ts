import {ProfileAPI} from "../api/api";
import {AuthThunkActionCreator} from "./auth-reducer";
import {stopSubmit} from "redux-form";
import {postDataType, contactsType, photosType, profileType} from "../types/types"

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
export const setPhotoActionCreator = (photo: photosType ): setPhotoActionCreatorType => {
    return {type: setPhotoActionCreatorConst, photo}
}

//ассинронный запрос async-await
export const getUserThunkActionCreator = (userId:number) => {
    return async (dispatch:any) => {
        let getUser = await ProfileAPI.getUser(userId)
        dispatch(setProfileActionCreator(getUser))
    }
}
//ассинронный запрос async-await
export const setUserPhotoThunk = (file: any) => {
    return async (dispatch:any) => {
        let setPhoto = await ProfileAPI.setPhoto(file)
        dispatch(setPhotoActionCreator(setPhoto))
    }
}
//ассинронный запрос async-await
export const setProfileDataThunk = (profile: profileType) => {
    return async (dispatch:any) => {
        let setProfile = await ProfileAPI.setProfile(profile)
        if (setProfile.resultCode === 0) {
            dispatch(setProfileActionCreator(profile))
        } else {
            let message = setProfile.messages.length > 0 ? setProfile.messages[0] : "Some error";
            let formErrorAction = stopSubmit("profile-data", {_error: message});
            dispatch(formErrorAction);
            return Promise.reject(setProfile.messages[0])
        }
    }
}
//ассинхронный запрос .then
export const getUserStatusThunkActionCreator = (userId: number) => {
    return async (dispatch:any) => {
        let getUserStatus = await ProfileAPI.getUserStatus(userId)
        dispatch(setUserStatusActionCreator(getUserStatus))
    }
}

//ассинхронный запрос .then
export const setUserStatusThunkActionCreator = (status: string) => {
    return async (dispatch:any) => {
        let setUserStatus = await ProfileAPI.setUserStatus(status)
        if(setUserStatus.resultCode === 0){
            dispatch(setUserStatusActionCreator(status))
        }
    }
}

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
    ]as Array<postDataType> ,
    newMessageArea: '' as string,
    profile: null as profileType | null,
    userStatus: '' as string
}
type profileReducerInitType = typeof profileReducerInit

const profileReducer = (state = profileReducerInit, action: any):profileReducerInitType => {
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
                profile: {...state.profile, photos: action.data.photos} as profileType
            }
    }
    return state
}

export default profileReducer