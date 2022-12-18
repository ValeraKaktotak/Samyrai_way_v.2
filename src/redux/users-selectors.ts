import {createSelector} from "reselect";
import {stateType} from "./redux-store";

const getUsersSelector = (state: stateType) => {
    return state.usersPage.users
}
//example for reselect
export const getUsers = createSelector(getUsersSelector, items => {
    return items.filter(u => true)
})


export const getUsersCountOnPage = (state: stateType) => {
    return state.usersPage.usersCountOnPage
}
export const getUsersCount = (state: stateType) => {
    return state.usersPage.usersCount
}
export const getUsersCurrentPage = (state: stateType) => {
    return state.usersPage.usersCurrentPage
}
export const getIsLoader = (state: stateType) => {
    return state.usersPage.isLoader
}
export const getFollowingProgress = (state: stateType) => {
    return state.usersPage.isFollowingProcess
}