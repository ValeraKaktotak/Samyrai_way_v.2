import axios from "axios";
import {profileType} from "../types/types";

const axiosCreeds = axios.create({
    headers:{
        'API-KEY':'a4f8c407-514e-498b-9290-450a3d80d2b0'
    },
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export const UsersAPI = {
    getUsers (usersCurrentPage = 1, usersCountOnPage = 10){
        return(
            axiosCreeds.get(`users?page=${usersCurrentPage}&count=${usersCountOnPage}`)
            .then(response=>response.data)
        )
    }
}

export const FollowAPI = {
    unfollowUser (userID:number){
        return(
            axiosCreeds.delete(`follow/${userID}`)
                .then(response=>response.data)
        )
    },
    followUser (userID:number){
        return(
            axiosCreeds.post(`follow/${userID}`)
                .then(response=>response.data)
        )
    }
}

export const AuthAPI = {
    authMe (){
        return(
            axiosCreeds.get(`auth/me/`)
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
    login (email: string, password:number, rememberMe = false, captcha:string){
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








