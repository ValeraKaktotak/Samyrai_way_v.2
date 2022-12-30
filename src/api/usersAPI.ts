import {usersType} from "../types/types";
import {axiosCreeds} from "./api";

type getUsersTypes = {
    items: Array<usersType>
    totalCount: number
    error: string
}
export const UsersAPI = {
    getUsers(usersCurrentPage = 1, usersCountOnPage = 10) {
        return (
            axiosCreeds.get<getUsersTypes>(`users?page=${usersCurrentPage}&count=${usersCountOnPage}`)
                .then(response => response.data)
        )
    }
}