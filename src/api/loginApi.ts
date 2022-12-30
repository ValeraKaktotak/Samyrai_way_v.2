import {apiMainType, axiosCreeds} from "./api";

export enum loginResultCodeEnum {
    success = 0,
    error = 1,
    captcha = 10
}

type loginType = {
    userId: number
}

export const LoginApi = {
    login(email: string, password: string, rememberMe = false, captcha: string) {
        return (
            axiosCreeds.post<apiMainType<loginType, loginResultCodeEnum>>(`/auth/login`, {
                email,
                password,
                rememberMe,
                captcha
            })
                .then(response => response.data)
        )
    },
    logOut() {
        return (
            axiosCreeds.delete<apiMainType>(`/auth/login`)
                .then(response => response.data)
        )
    },
    captcha() {
        return (
            axiosCreeds.get<string>(`/security/get-captcha-url`)
                .then(response => response.data)
        )
    }
}