import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logOutUserThunkActionCreator} from "../../redux/login-reducer";
import {stateType} from "../../redux/redux-store";

type MapStatePropsType = {
    auth: boolean
    loginName: string | null
    userId: number | null
}
type MapDispatchPropsType = {
    logOut: () => void
}
type OwnProps = {}

class HeaderContainer extends React.Component {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

let mapStateToProps = (state: stateType) => {
    return {
        auth: state.loginAuth.isLogged,
        loginName: state.loginAuth.login,
        userId: state.loginAuth.id
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnProps, stateType>(mapStateToProps,
    {logOut: logOutUserThunkActionCreator})
(HeaderContainer)

