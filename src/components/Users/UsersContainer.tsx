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
import {usersType} from "../../types/types";
import {stateType} from "../../redux/redux-store";

type propTypes = {
    usersCount: number
    usersCurrentPage: number
    usersCountOnPage: number
    isLoader: boolean
    users: Array<usersType>
    followingProgress: Array<number>
    getUser: (usersCurrentPage: number, usersCountOnPage: number) => void
    changePage: (usersCurrentPage: number, usersCountOnPage: number) => void
    setUnfollow: (id: number) => void
    setFollow: (id: number) => void
}

class UsersContainer extends React.Component<propTypes>{

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

let mapStateToProps = (state:stateType) => {
    return {
        users: getUsers(state),
        usersCountOnPage: getUsersCountOnPage(state),
        usersCount: getUsersCount(state),
        usersCurrentPage: getUsersCurrentPage(state),
        isLoader: getIsLoader(state),
        followingProgress: getFollowingProgress(state)
    }
}

export default compose(
    connect(mapStateToProps, {
        changePage:changePagesThunkActionCreator,
        getUser:getUsersThunkActionCreator,
        setUnfollow: unfollowThunkActionCreator,
        setFollow: followThunkActionCreator,
    })
)(UsersContainer)

