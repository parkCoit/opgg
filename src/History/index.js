import { useState } from 'react'
import axios from 'axios'

function History() {

        let [puuid , setPuuid] = useState('')

        const api_key = 'RGAPI-6fa097f9-21d0-4e62-bacc-0819caca80c3'

        
        let user = JSON.parse(localStorage.getItem('summoner'))

        
        let uuid = axios.get(`/riot/account/v1/accounts/by-riot-id/${user['name']}/${user['tag']}?api_key=${api_key}`)
                    .then(state => { 
                        console.log(state.data)
                        setPuuid(state.data['puuid'])
                        })
                    .catch(a => { return(a.data) })
        

        // let match_id  = axios.get(`/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${api_key}`)
        //                     .then((state) => {return(state.data)})
        // //                     .catch(a => { return(a.data) })
        // return(localStorage.setItem('history', [{user : user['name'], puuid : puuid, match_id : match_id}]))
        
}


export default History

