import {FollowAPI, followResultCodeEnum, UsersAPI} from "../api/api";
import {usersType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {stateType} from "./redux-store";

const followActionCreatorConst = 'FOLLOW';
const unfollowActionCreatorConst = 'UNFOLLOW';
const addUsersActionCreatorConst = 'ADD-USERS';
const addUsersCountActionCreatorConst = 'ADD-USERS-COUNT';
const changeUsersCurrentPageActionCreatorConst = 'CHANGE-CURRENT-PAGE';
const preloaderActionCreatorConst = 'PRELOADER';
const followingProcessActionCreatorConst = 'TOGGLE_IS_FOLLOWING';

// Action creators
type followActionCreatorType = {
    type: typeof followActionCreatorConst
    userId: number
}
export const followActionCreator = (userId: number): followActionCreatorType => {
    return {type: followActionCreatorConst, userId}
}

type unfollowActionCreatorType = {
    type: typeof unfollowActionCreatorConst
    userId: number
}
export const unfollowActionCreator = (userId: number): unfollowActionCreatorType => {
    return {type: unfollowActionCreatorConst, userId}
}

type addUsersActionCreatorType = {
    type: typeof addUsersActionCreatorConst
    newUsers: Array<usersType>
}
export const addUsersActionCreator = (newUsers: Array<usersType>): addUsersActionCreatorType => {
    return {type: addUsersActionCreatorConst, newUsers}
}

type addUserCountActionCreatorType = {
    type: typeof addUsersCountActionCreatorConst
    count: number
}
export const addUserCountActionCreator = (count: number): addUserCountActionCreatorType => {
    return {type: addUsersCountActionCreatorConst, count}
}

type changeUsersCurrentPageActionCreatorType = {
    type: typeof changeUsersCurrentPageActionCreatorConst
    page: number
}
export const changeUsersCurrentPageActionCreator = (page: number): changeUsersCurrentPageActionCreatorType => {
    return {type: changeUsersCurrentPageActionCreatorConst, page}
}

type preloaderActionCreatorType = {
    type: typeof preloaderActionCreatorConst
    isLoader: boolean
}
export const preloaderActionCreator = (isLoader: boolean): preloaderActionCreatorType => {
    return {type: preloaderActionCreatorConst, isLoader}
}

type followingProcessActionCreatorType = {
    type: typeof followingProcessActionCreatorConst,
    toggleStatus: boolean,
    userId: number
}
export const followingProcessActionCreator = (toggleStatus: boolean, userId: number): followingProcessActionCreatorType => {
    return {type: followingProcessActionCreatorConst, toggleStatus, userId}
}

// thunk action creators
export const getUsersThunkActionCreator = (usersCurrentPage: number, usersCountOnPage: number): thunkTypes => {
    // dispatch:Dispatch<actionTypes>
    return (dispatch) => {
        dispatch(preloaderActionCreator(true))
        UsersAPI.getUsers(usersCurrentPage, usersCountOnPage)
            .then((response) => {
                dispatch(addUsersActionCreator(response.items))
                dispatch(addUserCountActionCreator(response.totalCount))
                dispatch(preloaderActionCreator(false))
            })
    }
}
export const changePagesThunkActionCreator = (usersCurrentPage: number, usersCountOnPage: number): thunkTypes => {
    return (dispatch) => {
        dispatch(preloaderActionCreator(true))
        dispatch(changeUsersCurrentPageActionCreator(usersCurrentPage))
        UsersAPI.getUsers(usersCurrentPage, usersCountOnPage)
            .then((response: any) => {
                dispatch(addUsersActionCreator(response.items))
                dispatch(addUserCountActionCreator(response.totalCount))
                dispatch(preloaderActionCreator(false))
            })
    }
}
export const unfollowThunkActionCreator = (usersId: number): thunkTypes => {
    return (dispatch) => {
        dispatch(followingProcessActionCreator(true, usersId))
        FollowAPI.unfollowUser(usersId)
            .then((response) => {
                if (response.resultCode == followResultCodeEnum.success) {
                    dispatch(unfollowActionCreator(usersId))
                }
                dispatch(followingProcessActionCreator(false, usersId))
            })
    }
}
export const followThunkActionCreator = (usersId: number): thunkTypes => {
    return (dispatch) => {
        dispatch(followingProcessActionCreator(true, usersId))
        FollowAPI.followUser(usersId)
            .then((response) => {
                if (response.resultCode == followResultCodeEnum.success) {
                    dispatch(followActionCreator(usersId))
                }
                dispatch(followingProcessActionCreator(false, usersId))
            })
    }
}


const usersReducerInit = {
    users: [] as Array<usersType> | [],
    usersCountOnPage: 10 as number,
    usersCurrentPage: 1 as number,
    usersCount: 0 as number,
    isLoader: false as boolean,
    isFollowingProcess: [] as Array<number>
}
export type usersReducerInitType = typeof usersReducerInit
type actionTypes =
    followActionCreatorType
    | unfollowActionCreatorType
    | addUsersActionCreatorType
    | addUserCountActionCreatorType
    | changeUsersCurrentPageActionCreatorType
    | preloaderActionCreatorType
    | followingProcessActionCreatorType

type thunkTypes = ThunkAction<
    void,
    stateType,
    unknown,
    actionTypes
>

const usersReducer = (state = usersReducerInit, action: actionTypes): usersReducerInitType => {
    switch (action.type) {
        case followActionCreatorConst:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case unfollowActionCreatorConst:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case addUsersActionCreatorConst:
            return {
                ...state, users: [...action.newUsers]
            }
        case addUsersCountActionCreatorConst:
            return {
                ...state, usersCount: action.count
            }
        case changeUsersCurrentPageActionCreatorConst:
            return {
                ...state, usersCurrentPage: action.page
            }
        case preloaderActionCreatorConst:
            return {
                ...state, isLoader: action.isLoader
            }
        case followingProcessActionCreatorConst:
            return {
                ...state,
                isFollowingProcess: action.toggleStatus
                    ? [...state.isFollowingProcess, action.userId]
                    : [...state.isFollowingProcess.filter(id => id !== action.userId)]
            }
    }
    return state
}
export default usersReducer