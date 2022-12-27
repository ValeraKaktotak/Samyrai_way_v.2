import style from './Login.module.css';
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {connect} from "react-redux";
import {loginUserThunkActionCreator} from "../../redux/login-reducer";
import {Element} from "../commons/FormsControls/FormsControls";
import {maxLength20, required} from "../../helpers/validators";
import {Navigate} from "react-router-dom";
import React from "react";
import {stateType} from "../../redux/redux-store";

type mapStatePropsType = {
    isAuth: boolean
    captcha: string | null
}
type mapDispatchPropsType = {
    login: (email:string, password:string, rememberMe:boolean, captcha:string) => void
}
type loginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type loginFormOwnProps = {
    captcha: string | null
}

const Login: React.FC<mapStatePropsType & mapDispatchPropsType> = (props) => {
    const onSubmitFunction = (formData: loginFormValuesType) => {
        let {email, password, rememberMe, captcha} = formData;
        props.login(email, password, rememberMe = false, captcha)
    }
    if (props.isAuth) {
        return (
            <Navigate to="/Profile"/>
        )
    }
    return (
        <>
            <header className={style.login}>
                <h1>Login form</h1>
            </header>
            <WithReduxForm captcha={props.captcha} onSubmit={onSubmitFunction}/>
        </>
    )
}

const Input = Element("input");

const LoginForm: React.FC<InjectedFormProps<loginFormValuesType, loginFormOwnProps> & loginFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <Field name="email" component={Input} type="text" validate={[required, maxLength20]}/>
            </ div>
            <div>
                <label htmlFor="password">Password</label>
                <Field name="password" component={Input} type="text" validate={[required, maxLength20]}/>
            </div>
            <div>
                <label htmlFor="rememberMe">Remember me</label>
                <Field name="rememberMe" component={Input} type="checkbox"/>
            </div>
            {props.captcha && <img src={props.captcha}/>}
            {props.captcha && <Field name="captcha" component={Input} type="text" validate={[required]}/>}

            {props.error && <div className={style.error}>{props.error}</div>}
            <button>Login</button>
        </form>
    )
}

let WithReduxForm = reduxForm<loginFormValuesType, loginFormOwnProps>({
    // a unique name for the form
    form: 'login'
})(LoginForm)

let mapStateToProps = (state: stateType): mapStatePropsType => {
    return {
        isAuth: state.loginAuth.isLogged,
        captcha: state.loginPage.captcha
    }
}

export default connect(mapStateToProps, {login: loginUserThunkActionCreator})(Login)




