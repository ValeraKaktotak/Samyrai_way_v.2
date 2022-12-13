import usersReducer, {preloaderActionCreator} from "./users-reducer";

//1.test data
const state = {
    users: [],
    usersCountOnPage: 10,
    usersCurrentPage: 1,
    usersCount: 0,
    isLoader: false,
    isFollowingProcess: []
}

test('test preloader', () => {

    //1.test data
    const action = preloaderActionCreator(true);

    //2.test action
    const reducer = usersReducer(state, action);

    //3.expectation
    expect(reducer.isLoader).toBe(true);
});
