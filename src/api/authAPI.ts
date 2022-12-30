import {apiMainType, axiosCreeds} from "./api";

type authType = {
    id: number,
    email: string,
    login: string
}
export const AuthAPI = {
    authMe() {
        return (
            axiosCreeds.get<apiMainType<authType>>(`auth/me/`)
                .then(response => response.data)
        )
    }
}