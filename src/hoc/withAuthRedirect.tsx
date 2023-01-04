import React from "react"
import {Navigate} from "react-router-dom"
import {connect} from "react-redux"
import {stateType} from "../redux/redux-store"

export function withAuthRedirect(Component:React.ComponentType) {
    type mapStateType = ReturnType<typeof mapStateToProps>
    type mapDispatchType = {
        fake: () => void
    }

    const withAuthRedirectContainer:React.FC<mapStateType & mapDispatchType> = (props) => {
        let {isAuth, loginId, fake, ...restProps} = props
        if (!isAuth) {
            return <Navigate to="/login"/>
        }
        return (
            <Component {...restProps}/>
        )
    }

    let mapStateToProps = (state: stateType) => {
        return {
            isAuth: state.loginAuth.isLogged,
            loginId: state.loginAuth.id
        }
    }

    return connect<mapStateType, mapDispatchType, {}, stateType>(mapStateToProps)(withAuthRedirectContainer)
}

export default withAuthRedirect