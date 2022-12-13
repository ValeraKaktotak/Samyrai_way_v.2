import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

const withAuthRedirect = (Component) => {

    class withAuthRedirectContainer extends React.Component {
        render (){
            if(!this.props.isAuth){
                return <Navigate to="/login" />
            }
            return (
                <Component {...this.props}/>
            )
        }
    }

    let mapStateToProps = (state) => {
        return {
            isAuth: state.loginAuth.isLogged,
            loginId: state.loginAuth.id
        }
    }

    return connect(mapStateToProps)(withAuthRedirectContainer)
}

export default withAuthRedirect