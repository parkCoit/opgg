import axios from "axios"
const server = `http://localhost:8000`

export const kakaoLoginData = req =>  axios.post(`${server}/kakao/login`, req)
export const summonerData = req => {
    console.log('req : ',req)
    return axios.get(`${server}/gameList/users/`, {
        params : req
    })
}
export const historyData = req => axios.post(`${server}/gameList/history/`, req)
export const historyUpdate = req => axios.put(`${server}/gameList/history/`, req)

