import React from 'react';
import MyProfile from "./MyProfile";
import {connect} from "react-redux";
import {
    getUserStatusThunkActionCreator,
    getUserThunkActionCreator, setProfileDataThunk, setUserPhotoThunk,
    setUserStatusThunkActionCreator
} from "../../../redux/profile-reducer";
import withRouter from "../../../hoc/withRouter";
import withAuthRedirect from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {Navigate} from "react-router-dom";
import {stateType} from "../../../redux/redux-store";
import {profileType} from "../../../types/types";

type mapStateTypes = {
    profile: profileType
    userStatus: string
}

type mapDispatchTypes = {
    getUser: (data: number) => void
    getUserStatus: (data: number) => void
    setUserStatus: (data: string) => void
    setPhoto: (data: any) => void
    setProfileData: (data: profileType) => void
}

type OwnPropsType = {
    router: any
    isAuth: boolean
    loginId: number
}

type propsType = mapStateTypes & mapDispatchTypes & OwnPropsType

class MyProfileContainer extends React.Component<propsType> {

    componentDidMount() {
        let userId = this.props.router.params.userId;

        if (!userId) {
            if (!this.props.isAuth) {
                return (
                    <Navigate to="/login"/>
                )
            }
            userId = this.props.loginId
        }
        this.props.getUserStatus(userId)
        this.props.getUser(userId)
    }

    componentDidUpdate(prevProps: propsType) {
        let userId = this.props.router.params.userId

        if (userId !== prevProps.router.params.userId) {
            if (!userId) {
                userId = this.props.loginId
            }
            this.props.getUserStatus(userId)
            this.props.getUser(userId)
        }
    }

    render() {
        return (
            <MyProfile setPhoto={this.props.setPhoto}
                       isOwner={!this.props.router.params.userId}
                       profile={this.props.profile}
                       userStatus={this.props.userStatus}
                       setUserStatus={this.props.setUserStatus}
                       setProfileData={this.props.setProfileData}/>
            //<MyProfile {...this.props}/>
        )
    }
}

let mapStateToProps = (state: stateType): mapStateTypes => {
    return {
        profile: state.profilePage.profile,
        userStatus: state.profilePage.userStatus
    } as mapStateTypes
}

export default compose(
    withRouter,
    withAuthRedirect,
    connect<mapStateTypes, mapDispatchTypes, OwnPropsType, stateType>(mapStateToProps,
        {
            setPhoto: setUserPhotoThunk,
            getUser: getUserThunkActionCreator,
            getUserStatus: getUserStatusThunkActionCreator,
            setUserStatus: setUserStatusThunkActionCreator,
            setProfileData: setProfileDataThunk
        }
    )
)(MyProfileContainer)
