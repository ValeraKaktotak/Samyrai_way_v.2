import axios from "axios";
import {profileType} from "../types/types";

const axiosCreeds = axios.create({
    headers:{
        'API-KEY':'a4f8c407-514e-498b-9290-450a3d80d2b0'
    },
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

type getUsersItem = {
    name: string,
    id: number,
    photos: {
        small: string | null,
        large: string | null
    },
    status: string | null,
    followed: boolean

}
type getUsersTypes = {
    items: Array<getUsersItem>
    totalCount: number
    error: string
}
export const UsersAPI = {
    getUsers (usersCurrentPage = 1, usersCountOnPage = 10){
        return(
            axiosCreeds.get<getUsersTypes>(`users?page=${usersCurrentPage}&count=${usersCountOnPage}`)
            .then(response=>response.data)
        )
    }
}

export enum followResultCodeEnum {
    success = 0,
    error = 1
}
type followType = {
    resultCode: followResultCodeEnum
    messages: Array<string>,
    data: {}
}
export const FollowAPI = {
    unfollowUser (userID:number){
        return(
            axiosCreeds.delete<followType>(`follow/${userID}`)
                .then(response=>response.data)
        )
    },
    followUser (userID:number){
        return(
            axiosCreeds.post<followType>(`follow/${userID}`)
                .then(response=>response.data)
        )
    }
}

export enum authResultCodeEnum {
    success = 0,
    error = 1
}
type authType = {
    resultCode: authResultCodeEnum
    messages: Array<string>,
    data: {
        id: number,
        email: string,
        login: string
    }
}
export const AuthAPI = {
    authMe (){
        return(
            axiosCreeds.get<authType>(`auth/me/`)
                .then(response=>response.data)
        )
    }
}

export const ProfileAPI = {
    getUser (userId:number){
        return(
            axiosCreeds.get(`profile/${userId}`)
                .then(response=>response.data)
        )
    },
    getUserStatus (userId:number){
        return(
            axiosCreeds.get(`/profile/status/${userId}`)
                .then(response=>response.data)
        )
    },
    setUserStatus (userStatus: string){
        return (
            axiosCreeds.put(`/profile/status`, {
                status: userStatus
            })
                .then(response=>response.data)
        )
    },
    setProfile (profile: profileType){
        if(!profile.lookingForAJob){
            profile.lookingForAJob = false;
        }
        return (
            axiosCreeds.put(`/profile`, profile)
                .then(response=>response.data)
        )
    },
    setPhoto (file: any){
        let formData = new FormData();
        formData.append("image", file);
        return (
            axiosCreeds.put(`/profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response=>response.data)
        )
    }
}

export const LoginApi = {
    login (email: string, password:string, rememberMe = false, captcha:string){
        return(
            axiosCreeds.post(`/auth/login`, {
                email,
                password,
                rememberMe,
                captcha
            })
                .then(response=>response.data)
        )
    },
    logOut (){
        return(
            axiosCreeds.delete(`/auth/login`)
                .then(response=>response.data)
        )
    },
    captcha (){
        return(
            axiosCreeds.get(`/security/get-captcha-url`)
                .then(response=>response.data)
        )
    }
}







