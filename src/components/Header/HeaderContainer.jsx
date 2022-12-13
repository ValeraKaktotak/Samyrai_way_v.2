import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logOutUserThunkActionCreator} from "../../redux/login-reducer";

class HeaderContainer extends React.Component{
    render(){
        return (
            <Header {...this.props} />
        )
    }
}

let mapStateToProps = (state) => {
    return{
        auth: state.loginAuth.isLogged,
        loginName: state.loginAuth.login,
        userId: state.loginAuth.id
    }
}

export default connect (mapStateToProps,
    {logOut:logOutUserThunkActionCreator})
(HeaderContainer)


//follow: (userid) => {
//  dispatch(followActionCreator(userid))
//}