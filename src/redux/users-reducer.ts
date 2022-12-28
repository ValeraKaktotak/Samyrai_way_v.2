import {FollowAPI, followResultCodeEnum, UsersAPI} from "../api/api";
import {usersType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {inferActionsTypes, stateType} from "./redux-store";

const followActionCreatorConst = 'FOLLOW';
const unfollowActionCreatorConst = 'UNFOLLOW';
const addUsersActionCreatorConst = 'ADD-USERS';
const addUsersCountActionCreatorConst = 'ADD-USERS-COUNT';
const changeUsersCurrentPageActionCreatorConst = 'CHANGE-CURRENT-PAGE';
const preloaderActionCreatorConst = 'PRELOADER';
const followingProcessActionCreatorConst = 'TOGGLE_IS_FOLLOWING';

// Action creators

type actionsTypes = inferActionsTypes<typeof actionsCreators>

export const actionsCreators = {
    followActionCreator: (userId: number) => {
        return {type: followActionCreatorConst, userId} as const
    },
    unfollowActionCreator: (userId: number) => {
        return {type: unfollowActionCreatorConst, userId} as const
    },
    addUsersActionCreator: (newUsers: Array<usersType>) => {
        return {type: addUsersActionCreatorConst, newUsers} as const
    },
    addUserCountActionCreator: (count: number) => {
        return {type: addUsersCountActionCreatorConst, count} as const
    },
    changeUsersCurrentPageActionCreator: (page: number) => {
        return {type: changeUsersCurrentPageActionCreatorConst, page} as const
    },
    preloaderActionCreator: (isLoader: boolean) => {
        return {type: preloaderActionCreatorConst, isLoader} as const
    },
    followingProcessActionCreator: (toggleStatus: boolean, userId: number) => {
        return {type: followingProcessActionCreatorConst, toggleStatus, userId} as const
    }
}

// thunk action creators
export const getUsersThunkActionCreator = (usersCurrentPage: number, usersCountOnPage: number): thunkTypes => {
    // dispatch:Dispatch<actionTypes>
    return (dispatch) => {
        dispatch(actionsCreators.preloaderActionCreator(true))
        UsersAPI.getUsers(usersCurrentPage, usersCountOnPage)
            .then((response) => {
                dispatch(actionsCreators.addUsersActionCreator(response.items))
                dispatch(actionsCreators.addUserCountActionCreator(response.totalCount))
                dispatch(actionsCreators.preloaderActionCreator(false))
            })
    }
}
export const changePagesThunkActionCreator = (usersCurrentPage: number, usersCountOnPage: number): thunkTypes => {
    return (dispatch) => {
        dispatch(actionsCreators.preloaderActionCreator(true))
        dispatch(actionsCreators.changeUsersCurrentPageActionCreator(usersCurrentPage))
        UsersAPI.getUsers(usersCurrentPage, usersCountOnPage)
            .then((response: any) => {
                dispatch(actionsCreators.addUsersActionCreator(response.items))
                dispatch(actionsCreators.addUserCountActionCreator(response.totalCount))
                dispatch(actionsCreators.preloaderActionCreator(false))
            })
    }
}
export const unfollowThunkActionCreator = (usersId: number): thunkTypes => {
    return (dispatch) => {
        dispatch(actionsCreators.followingProcessActionCreator(true, usersId))
        FollowAPI.unfollowUser(usersId)
            .then((response) => {
                if (response.resultCode == followResultCodeEnum.success) {
                    dispatch(actionsCreators.unfollowActionCreator(usersId))
                }
                dispatch(actionsCreators.followingProcessActionCreator(false, usersId))
            })
    }
}
export const followThunkActionCreator = (usersId: number): thunkTypes => {
    return (dispatch) => {
        dispatch(actionsCreators.followingProcessActionCreator(true, usersId))
        FollowAPI.followUser(usersId)
            .then((response) => {
                if (response.resultCode == followResultCodeEnum.success) {
                    dispatch(actionsCreators.followActionCreator(usersId))
                }
                dispatch(actionsCreators.followingProcessActionCreator(false, usersId))
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

type thunkTypes = ThunkAction<
    void,
    stateType,
    unknown,
    actionsTypes
>

const usersReducer = (state = usersReducerInit, action: actionsTypes): usersReducerInitType => {
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