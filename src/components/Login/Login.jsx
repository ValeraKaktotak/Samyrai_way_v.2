import style from './Login.module.css';
import { Field, reduxForm } from 'redux-form'
import {connect} from "react-redux";
import {loginUserThunkActionCreator} from "../../redux/login-reducer";
import {Element} from "../commons/FormsControls/FormsControls";
import {maxLength20, required} from "../../helpers/validators";
import {Navigate} from "react-router-dom";
import React from "react";

const Login = (props) => {
    const onSubmitFunction = (formData) => {
        let {email, password, rememberMe, captcha} = formData;
        props.login(email, password, rememberMe = false, captcha)
    }
    if(props.isAuth){
        return (
            <Navigate to="/Profile" />
        )
    }
    return (
        <>
            <header className={style.login}>
                <h1>Login form</h1>
            </header>
            <WithReduxForm captcha={props.captcha} onSubmit={onSubmitFunction} />
        </>
    )
}

const Input = Element("input");

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <Field name="email" component={Input} type="text" validate={[required, maxLength20]} />
            </ div>
            <div>
                <label htmlFor="password">Password</label>
                <Field name="password" component={Input} type="text" validate={[required, maxLength20]} />
            </div>
            <div>
                <label htmlFor="rememberMe">Remember me</label>
                <Field name="rememberMe" component={Input} type="checkbox" />
            </div>
            {props.captcha && <img src={props.captcha} />}
            {props.captcha && <Field name="captcha" component={Input} type="text" validate={[required]} />}

            {props.error && <div className={style.error}>{props.error}</div>}
            <button>Login</button>
        </form>
    )
}

let WithReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)

let mapStateToProps = (state) => {
    return{
        isAuth: state.loginAuth.isLogged,
        captcha: state.loginPage.captcha
    }
}

export default connect(mapStateToProps, {login:loginUserThunkActionCreator})(Login)




