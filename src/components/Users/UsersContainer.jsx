import style from './Users.module.css';
import Users from "./Users";
import {connect} from "react-redux";
import {
    changePagesThunkActionCreator, followThunkActionCreator,
    getUsersThunkActionCreator, unfollowThunkActionCreator
} from "../../redux/users-reducer";
import React from "react";
import defaultAvatar from "../../assets/images/avatar.jpg";
import Preloader from "../Preloader/Preloader";
import {NavLink} from "react-router-dom";
import {compose} from "redux";
import {
    getFollowingProgress,
    getIsLoader,
    getUsersCount,
    getUsersCountOnPage,
    getUsersCurrentPage, getUsers
} from "../../redux/users-selectors";


class UsersContainer extends React.Component{

    componentDidMount() {
        this.props.getUser(this.props.usersCurrentPage, this.props.usersCountOnPage)
    }

    buildUsers = () => {
        return(
            this.props.users.map(u =>
                <div className={style.user} key={u.id}>
                    <div className={style.left}>
                        <NavLink to={`/profile/${u.id}`}>
                            <img className={style.avatar} src={u.photos.small ? u.photos.small : defaultAvatar}
                                 alt="avatar"/>
                        </NavLink>
                        {u.followed?
                            <button disabled={this.props.followingProgress.some(id => id === u.id)} onClick={()=>
                                {
                                    this.props.setUnfollow(u.id)
                                }
                            }>
                                Unfollow
                            </ button>:
                            <button disabled={this.props.followingProgress.some(id => id === u.id)} onClick={()=>
                                {
                                    this.props.setFollow(u.id)
                                }
                            }>
                                Follow
                            </ button>
                        }
                    </div>
                    <div className={style.right}>
                        <p>{u.photos.small}</p>
                        <p>{u.name}</p>
                        <p>{u.location}</p>
                        <p>{this.props.usersCount}</p>
                    </div>
                </div>
            )
        )
    }

    render() {
        return(
            <>
                { this.props.isLoader?<Preloader/>: null}
                <Users usersCount={this.props.usersCount}
                       usersCurrentPage={this.props.usersCurrentPage}
                       changePage={this.props.changePage}
                       buildUsers={this.buildUsers}
                       usersCountOnPage={this.props.usersCountOnPage}
                />
            </>
        );
    }
}

//mapStateToProps без селекторов
// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         usersCountOnPage: state.usersPage.usersCountOnPage,
//         usersCount: state.usersPage.usersCount,
//         usersCurrentPage: state.usersPage.usersCurrentPage,
//         isLoader: state.usersPage.isLoader,
//         followingProgress: state.usersPage.isFollowingProcess
//     }
// }

//mapStateToProps селекторы
let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        usersCountOnPage: getUsersCountOnPage(state),
        usersCount: getUsersCount(state),
        usersCurrentPage: getUsersCurrentPage(state),
        isLoader: getIsLoader(state),
        followingProgress: getFollowingProgress(state)
    }
}

//оптимизировал эту функцию в объект ниже
// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userid) => {
//             dispatch(followActionCreator(userid))
//         },
//         unFollow: (userid) => {
//             dispatch(unfollowActionCreator(userid))
//         },
//         addUsers: (users) => {
//             dispatch(addUsersActionCreator(users))
//         },
//         addUserCount: (count) => {
//             dispatch(addUserCountActionCreator(count))
//         },
//         changeCurrentPage: (page) => {
//             dispatch(changeUsersCurrentPageActionCreator(page))
//         },
//         preloaderActionCreator: (isLoader) => {
//             dispatch(preloaderActionCreator(isLoader))
//         }
//     }
// }

/*
Объединил HOCs в функции compose

let withAuth = withAuthRedirect(UsersContainer)

export default connect(mapStateToProps, {
    changePage:changePagesThunkActionCreator,
    getUser:getUsersThunkActionCreator,
    setUnfollow: unfollowThunkActionCreator,
    setFollow: followThunkActionCreator,
})(withAuth)
*/

export default compose(
    connect(mapStateToProps, {
        changePage:changePagesThunkActionCreator,
        getUser:getUsersThunkActionCreator,
        setUnfollow: unfollowThunkActionCreator,
        setFollow: followThunkActionCreator,
    })
)(UsersContainer)

