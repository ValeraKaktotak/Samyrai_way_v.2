import {FollowAPI, UsersAPI} from "../api/api";

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
    users: usersType
}
export const addUsersActionCreator = (users: usersType): addUsersActionCreatorType => {
    return {type: addUsersActionCreatorConst, users}
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
export const getUsersThunkActionCreator = (usersCurrentPage: number, usersCountOnPage: number) => {
    return (dispatch: any) =>{
        dispatch(preloaderActionCreator(true))
        UsersAPI.getUsers(usersCurrentPage, usersCountOnPage)
            .then((response: any)=>{
                dispatch(addUsersActionCreator(response.items))
                dispatch(addUserCountActionCreator(response.totalCount))
                dispatch(preloaderActionCreator(false))
            })
    }
}
export const changePagesThunkActionCreator = (usersCurrentPage: number, usersCountOnPage: number) => {
    return (dispatch: any) => {
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
export const unfollowThunkActionCreator = (usersId: number) => {
    return (dispatch: any) => {
        dispatch(followingProcessActionCreator(true, usersId))
        FollowAPI.unfollowUser(usersId)
            .then((response: any) => {
                if (response.resultCode === 0) {
                    dispatch(unfollowActionCreator(usersId))
                }
                dispatch(followingProcessActionCreator(false, usersId))
            })
    }
}
export const followThunkActionCreator = (usersId: number) => {
    return (dispatch: any) => {
        dispatch(followingProcessActionCreator(true, usersId))
        FollowAPI.followUser(usersId)
            .then((response: any) => {
                if (response.resultCode === 0) {
                    dispatch(followActionCreator(usersId))
                }
                dispatch(followingProcessActionCreator(false, usersId))
            })
    }
}

type usersPhotosType = {
    small: null | string
    large: null | string
}
type usersType = {
    name: string
    id: number
    photos: usersPhotosType
    status: null | string
    followed: boolean

}
const usersReducerInit = {
    users: [] as Array<any>,
    usersCountOnPage: 10 as number ,
    usersCurrentPage: 1 as number,
    usersCount: 0 as number,
    isLoader: false as boolean,
    isFollowingProcess: [] as Array<any>
}
type usersReducerInitType = typeof usersReducerInit
const usersReducer = (state = usersReducerInit, action: any): usersReducerInitType => {
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
                ...state, users: [...action.users]
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