import { useParams } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import './User.css'
import { historyUpdate } from '../api'

 
function User(props) {

    let userLocalSession = JSON.parse(localStorage.getItem('summoner'))

    const {region, name} = useParams('')
    console.log('summoner :',props.summoner)
    

    const iconSrc = `https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon${props.summoner.profileIconId}.jpg?image=q_auto,f_webp,w_auto&v=1700641403304`

    const onclick = e => {
        e.preventDefault()
        const request = props.summoner
        historyUpdate(request)
        .then((res) => {
            alert(res.data)
            alert(JSON.stringify(res.data))
        })
        .catch((err) => {
            alert(err.data) 
        })
    }


    return(
        <div>
            <div className='content-header'>
                <div className='summoner'>
                    <img alt='img' className='margin-top' src={iconSrc} width='10%' height='20%' />
                    <div className='info'>
                        <h3> { userLocalSession['name'] } </h3>
                        <p> #{ userLocalSession['tag'] } </p>
                        <button onClick={onclick}>전적갱신</button>
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