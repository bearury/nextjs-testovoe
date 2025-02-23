import axios from "axios";

export const fetcherAxios = (...args) => {
    return axios.post(...args).then(res => res)
}
