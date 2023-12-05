import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import './User.css'
import axios from 'axios'

 
function User() {

    const api_key = 'RGAPI-6fa097f9-21d0-4e62-bacc-0819caca80c3'

    let user = JSON.parse(localStorage.getItem('summoner'))

    const {region, name} = useParams('')

    let [puuid, setPuuid] = useState('')

    let [match_id, setMatch_id] = useState([])

    useEffect(() => {
        axios.get(`/riot/account/v1/accounts/by-riot-id/${user['name']}/${user['tag']}?api_key=${api_key}`)
            .then(state => { 
                setPuuid(state.data['puuid'])
                })
            .catch(a => { return(a.data) })
        
    }, [])

    useEffect(() => {
        axios.get(`/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${api_key}`)
                            .then((state) => { setMatch_id(state.data) })
                            .catch(a => { return(a.data) })
    }, [puuid])



    return(
        <div>
            <div className='content-header'>
                <div className='summoner'>
                    <img alt='img' className='margin-top' src='https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon29.jpg?image=q_auto,f_webp,w_auto&v=1700641403304' width='10%' height='20%' />
                    <div className='info'>
                        <h3> { user['name'] } </h3>
                        <p> #{ user['tag'] } </p>
                        <button>전적갱신</button>
                    </div>
                </div>
                    
                <Nav className="nav-bar active" variant='tabs'  >
                    <Nav.Item>
                        <Nav.Link className='nav-box px-3' eventKey="all" href={`/summoner/${region}/${name}`} >종합</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className='nav-box px-3' eventKey="champions" href={`/summoner/${region}/${name}/champions`} >챔피언</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className='nav-box px-3' eventKey="ingame" href={`/summoner/${region}/${name}/ingame`}  >인게임 정보</Nav.Link>
                    </Nav.Item>
                </Nav>
            
            </div>
        </div>
        )
}

export default User
