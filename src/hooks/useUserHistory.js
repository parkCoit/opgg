import axios from "axios"
import { useState, useEffect } from "react"

const useUserHistory = (api_key) => {
    const [summoner, setSummoner] = useState({})
    const [history, setHistory] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const startAPI = async () => {
            const usd = JSON.parse(localStorage.getItem('summoner') || '')
            try {
                let userNum = 0
                let userChampions = [] 
                let userKills = []
                let userDeaths = []
                let userAssists = []
                let userPosition = []
                let userResult = []
                let summonerInfo = {}

                const riotIdData = await axios.get(`/riot/account/v1/accounts/by-riot-id/${usd['name']}/${usd['tag']}?api_key=${api_key}`)
                const riotSummonerData = await axios.get(`/lol/summoner/v4/summoners/by-puuid/${riotIdData?.data['puuid']}?api_key=${api_key}`)
                const riotTierData = await axios.get(`/lol/league/v4/entries/by-summoner/${riotSummonerData.data['id']}?api_key=${api_key}`)
                const tierData = riotTierData.data[0]
                const puuid = riotIdData.data['puuid']
                summonerInfo.puuid = riotIdData.data['puuid']
                summonerInfo.gameName = riotIdData.data['gameName']
                summonerInfo.tagLine = riotIdData.data['tagLine']
                summonerInfo.id = riotSummonerData.data['id']
                summonerInfo.profileIconId = riotSummonerData.data['profileIconId']
                summonerInfo.summonerLevel = riotSummonerData.data['summonerLevel']
                summonerInfo.tier = tierData['tier']
                summonerInfo.leaguePoints = tierData['leaguePoints']
                summonerInfo.queueType = tierData['queueType']
                summonerInfo.rank = tierData['rank']
                summonerInfo.wins = tierData['wins']
                summonerInfo.losses = tierData['losses']
                setSummoner(summonerInfo)
                console.log(summonerInfo)
                // console.log(riotIdData.data)
                // console.log(riotSummonerData.data)
                // console.log(riotTierData.data[0])
                const matchIdData = await axios.get(`/lol/match/v5/matches/by-puuid/${riotIdData?.data['puuid']}/ids?type=ranked&api_key=${api_key}`)
                console.log(matchIdData.data.length)
                for (var i = 0; i < matchIdData.data.length; i++) {
                    const matchGameData = await axios.get(`/lol/match/v5/matches/${matchIdData.data[i]}?api_key=${api_key}`)
                    const metaData = matchGameData.data['metadata']['participants']
                    for (var j = 0; j < 10; j++) {
                        if (metaData[j] === puuid) {
                            userNum = j
                        }
                    }
                    let userInfo = matchGameData.data['info']["participants"][userNum]
                    userChampions.push(userInfo['championName'])
                    userKills.push(userInfo['kills']) 
                    userDeaths.push(userInfo['deaths'])
                    userAssists.push(userInfo['assists'])
                    userResult.push(userInfo['win'])
                    userPosition.push(userInfo['teamPosition'])
                    
                    
                }
                setHistory({champions : userChampions, kills : userKills, deaths : userDeaths, assists : userAssists, results : userResult, position : userPosition})
                // console.log(userChampions)
                // console.log(userKills)
                // console.log(userDeaths)
                // console.log(userAssists)
                // console.log(userResult)
                // console.log(userPosition)
            }
            catch(err) {
                console.log('err : ',err)
            }
            finally {
                setIsLoading(false)
                console.log('finish')
            }
        }
        startAPI() 
    },[api_key])

    return {summoner : summoner, history : history , isLoading}
}

export default useUserHistory