import {stopSubmit} from "redux-form"
import {baseThunkType, inferActionsTypes} from "./redux-store"
import {successErrorEnum} from "../api/api"
import {ProfileAPI} from "../api/profileAPI"
import {postDataType, photosType, profileType} from "../types/types"

export const profileActionCreators = {
    addPostActionCreator: (message: string) => ({type: 'SN/PROFILE/ADD-POST', message: message} as const),
    setProfileActionCreator: (profile: profileType) => ({type: 'SN/PROFILE/SET-PROFILE', profile} as const),
    setUserStatusActionCreator: (status: string) => ({type: 'SN/PROFILE/SET-STATUS', status} as const),
    setPhotoActionCreator: (photo: photosType) => ({type: 'SN/PROFILE/SET-PHOTO', photo} as const)
}
export type profileActionsTypes = inferActionsTypes<typeof profileActionCreators>
type profileThunkTypes = baseThunkType<profileActionsTypes>

export const getUserThunkActionCreator = (userId: number): profileThunkTypes => {
    return async (dispatch) => {
        let getUser = await ProfileAPI.getUser(userId)
        dispatch(profileActionCreators.setProfileActionCreator(getUser))
    }
}
export const setUserPhotoThunk = (file: File): profileThunkTypes => {
    return async (dispatch) => {
        let setPhoto = await ProfileAPI.setPhoto(file)
        dispatch(profileActionCreators.setPhotoActionCreator(setPhoto.data.photos))
    }
}
export const setProfileDataThunk = (profile: profileType): profileThunkTypes => {
    return async (dispatch) => {
        let setProfile = await ProfileAPI.setProfile(profile)
        if (setProfile.resultCode === successErrorEnum.success) {
            dispatch(profileActionCreators.setProfileActionCreator(profile))
        } else {
            let message = setProfile.messages.length > 0 ? setProfile.messages[0] : "Some error";
            let formErrorAction: any = stopSubmit("profile-data", {_error: message});
            dispatch(formErrorAction);
            return Promise.reject(setProfile.messages[0])
        }
    }
}
export const getUserStatusThunkActionCreator = (userId: number): profileThunkTypes => {
    return async (dispatch) => {
        let getUserStatus = await ProfileAPI.getUserStatus(userId)
        dispatch(profileActionCreators.setUserStatusActionCreator(getUserStatus))
    }
}
export const setUserStatusThunkActionCreator = (status: string): profileThunkTypes=> {
    return async (dispatch) => {
        let setUserStatus = await ProfileAPI.setUserStatus(status)
        if (setUserStatus.resultCode === successErrorEnum.success) {
            dispatch(profileActionCreators.setUserStatusActionCreator(status))
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
    ] as Array<postDataType>,
    newMessageArea: '' as string,
    profile: null as profileType | null,
    userStatus: '' as string
}
type profileReducerInitType = typeof profileReducerInit

const profileReducer = (state = profileReducerInit, action: profileActionsTypes): profileReducerInitType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST':
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
        case 'SN/PROFILE/SET-PROFILE':
            return {
                ...state,
                profile: {...state.profile, ...action.profile}
            }
        case 'SN/PROFILE/SET-STATUS':
            return {
                ...state,
                userStatus: action.status
            }
        case 'SN/PROFILE/SET-PHOTO':
            return {
                ...state,
                profile: {...state.profile, photos: action.photo} as profileType
            }
    }
    return state
}

export default profileReducer