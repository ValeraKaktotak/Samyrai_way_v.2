import axios from "axios";

export const axiosCreeds = axios.create({
    headers: {
        'API-KEY': 'a4f8c407-514e-498b-9290-450a3d80d2b0'
    },
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export enum successErrorEnum {
    success = 0,
    error = 1
}
export type apiMainType<D = {}, RC = successErrorEnum> = {
    resultCode: RC
    messages: Array<string>
    data: D
}








