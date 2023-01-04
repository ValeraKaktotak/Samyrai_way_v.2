import {ThunkAction} from "redux-thunk"
import {inferActionsTypes, stateType} from "./redux-store"
import {successErrorEnum} from "../api/api"
import {UsersAPI} from "../api/usersAPI"
import {FollowAPI} from "../api/followAPI"
import {usersType} from "../types/types"

// Action creators

type actionsTypes = inferActionsTypes<typeof actionsCreators>

export const actionsCreators = {
    followActionCreator: (userId: number) => {
        return {type: 'CN/USERS/FOLLOW', userId} as const
    },
    unfollowActionCreator: (userId: number) => {
        return {type: 'CN/USERS/UNFOLLOW', userId} as const
    },
    addUsersActionCreator: (newUsers: Array<usersType>) => {
        return {type: 'CN/USERS/ADD-USERS', newUsers} as const
    },
    addUserCountActionCreator: (count: number) => {
        return {type: 'CN/USERS/ADD-USERS-COUNT', count} as const
    },
    changeUsersCurrentPageActionCreator: (page: number) => {
        return {type: 'CN/USERS/CHANGE-CURRENT-PAGE', page} as const
    },
    preloaderActionCreator: (isLoader: boolean) => {
        return {type: 'CN/USERS/PRELOADER', isLoader} as const
    },
    followingProcessActionCreator: (toggleStatus: boolean, userId: number) => {
        return {type: 'CN/USERS/TOGGLE_IS_FOLLOWING', toggleStatus, userId} as const
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
                if (response.resultCode == successErrorEnum.success) {
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
                if (response.resultCode == successErrorEnum.success) {
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
        case 'CN/USERS/FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case 'CN/USERS/UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case 'CN/USERS/ADD-USERS':
            return {
                ...state, users: [...action.newUsers]
            }
        case 'CN/USERS/ADD-USERS-COUNT':
            return {
                ...state, usersCount: action.count
            }
        case 'CN/USERS/CHANGE-CURRENT-PAGE':
            return {
                ...state, usersCurrentPage: action.page
            }
        case 'CN/USERS/PRELOADER':
            return {
                ...state, isLoader: action.isLoader
            }
        case 'CN/USERS/TOGGLE_IS_FOLLOWING':
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