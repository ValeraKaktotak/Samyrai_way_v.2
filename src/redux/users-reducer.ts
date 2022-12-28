import {FollowAPI, followResultCodeEnum, UsersAPI} from "../api/api";
import {usersType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {inferActionsTypes, stateType} from "./redux-store";

// Action creators

type actionsTypes = inferActionsTypes<typeof actionsCreators>

export const actionsCreators = {
    followActionCreator: (userId: number) => {
        return {type: 'FOLLOW', userId} as const
    },
    unfollowActionCreator: (userId: number) => {
        return {type: 'UNFOLLOW', userId} as const
    },
    addUsersActionCreator: (newUsers: Array<usersType>) => {
        return {type: 'ADD-USERS', newUsers} as const
    },
    addUserCountActionCreator: (count: number) => {
        return {type: 'ADD-USERS-COUNT', count} as const
    },
    changeUsersCurrentPageActionCreator: (page: number) => {
        return {type: 'CHANGE-CURRENT-PAGE', page} as const
    },
    preloaderActionCreator: (isLoader: boolean) => {
        return {type: 'PRELOADER', isLoader} as const
    },
    followingProcessActionCreator: (toggleStatus: boolean, userId: number) => {
        return {type: 'TOGGLE_IS_FOLLOWING', toggleStatus, userId} as const
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
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case 'ADD-USERS':
            return {
                ...state, users: [...action.newUsers]
            }
        case 'ADD-USERS-COUNT':
            return {
                ...state, usersCount: action.count
            }
        case 'CHANGE-CURRENT-PAGE':
            return {
                ...state, usersCurrentPage: action.page
            }
        case 'PRELOADER':
            return {
                ...state, isLoader: action.isLoader
            }
        case 'TOGGLE_IS_FOLLOWING':
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