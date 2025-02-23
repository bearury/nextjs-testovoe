import {fetcherAxios} from "@/helpers/fetcher";
import {mutate} from "swr";

const baseUrlLogin = 'http://localhost:8080/auth/login';
const baseUrlRegister = 'http://localhost:8080/auth/signup';

export const authAPI = async ({email, password, isLogin}) => {
    return await mutate(isLogin ? baseUrlLogin : baseUrlRegister, fetcherAxios(isLogin ? baseUrlLogin : baseUrlRegister, {
        email, password
    })).then(res => res).catch(res => res.response)
}

