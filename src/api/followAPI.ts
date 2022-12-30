import {apiMainType, axiosCreeds} from "./api";

export const FollowAPI = {
    unfollowUser(userID: number) {
        return (
            axiosCreeds.delete<apiMainType>(`follow/${userID}`)
                .then(response => response.data)
        )
    },
    followUser(userID: number) {
        return (
            axiosCreeds.post<apiMainType>(`follow/${userID}`)
                .then(response => response.data)
        )
    }
}