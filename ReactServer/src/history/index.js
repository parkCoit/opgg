import { useState } from 'react'
import axios from 'axios'

function history() {

        let [uuid , setUuid] = useState('')

        const api_key = 'RGAPI-6fa097f9-21d0-4e62-bacc-0819caca80c3'

        
        let user = JSON.parse(localStorage.getItem('summoner'))

        
        let get_uuid = axios.get(`/riot/account/v1/accounts/by-riot-id/${user['name']}/${user['tag']}?api_key=${api_key}`)
                    .then(state => { 
                        console.log(state.data)
                        setUuid(state.data['puuid'])
                        })
                    .catch(a => { return(a.data) })
    
}


export default history

