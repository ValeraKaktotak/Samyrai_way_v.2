import {photosType, profileType} from "../types/types";
import {apiMainType, axiosCreeds} from "./api";

type setPhotoDataType = {
    photos: photosType
}
export const ProfileAPI = {
    getUser(userId: number) {
        return (
            axiosCreeds.get<profileType>(`profile/${userId}`)
                .then(response => response.data)
        )
    },
    getUserStatus(userId: number) {
        return (
            axiosCreeds.get<string>(`/profile/status/${userId}`)
                .then(response => response.data)
        )
    },
    setUserStatus(userStatus: string) {
        return (
            axiosCreeds.put<apiMainType>(`/profile/status`, {
                status: userStatus
            })
                .then(response => response.data)
        )
    },
    setProfile(profile: profileType) {
        if (!profile.lookingForAJob) {
            profile.lookingForAJob = false;
        }
        return (
            axiosCreeds.put<apiMainType>(`/profile`, profile)
                .then(response => response.data)
        )
    },
    setPhoto(file: any) {
        let formData = new FormData();
        formData.append("image", file);
        return (
            axiosCreeds.put<apiMainType<setPhotoDataType>>(`/profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => response.data)
        )
    }
}