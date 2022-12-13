import {createSelector} from "reselect";

const getUsersSelector = (state) => {
    return state.usersPage.users;
}
 //example for reselect
export const getUsers = createSelector(getUsersSelector, items => {
    return items.filter(u => true);
})


export const getUsersCountOnPage = (state) => {
    return state.usersPage.usersCountOnPage;
}
export const getUsersCount = (state) => {
    return state.usersPage.usersCount;
}
export const getUsersCurrentPage = (state) => {
    return state.usersPage.usersCurrentPage;
}
export const getIsLoader = (state) => {
    return state.usersPage.isLoader;
}
export const getFollowingProgress = (state) => {
    return state.usersPage.isFollowingProcess;
}