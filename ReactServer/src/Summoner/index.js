import { useState, useEffect } from 'react'
import User from '../User'
import './Summoner.css'
import { Nav } from 'react-bootstrap'
import useUserHistory from '../hooks/useUserHistory'
 
function Summoner() {

    const api_key = 'RGAPI-334ce6ce-df40-4d8a-9eca-d6ef646b1c2a'

    let [tab, setTab] = useState(0)

    const {summoner, history , isLoading} = useUserHistory(api_key)

    const tierSrc = `https://opgg-static.akamaized.net/images/medals_new/${summoner.tier}.png?image=q_auto,f_webp,w_144&v=1700641403304`
   
    useEffect(()=>{
        if(!isLoading) { 
            console.log(summoner)
        }
    },[isLoading, summoner])

    return(
        <div>
            <User summoner={summoner} />
            <div className='header'>
                <div className='side-bar'>
                    <div className='bg-gray-top bar-header'>
                        솔로랭크
                    </div>
                    <div className='bg-gray-bottom content'>
                        <div className='rank'>
                            <img width='72px' src={tierSrc} alt='tier' />
                        </div>
                        <div className='info2'>
                            <div className='tier'>{summoner.tier}</div>
                            <div className='lp'>{summoner.leaguePoints} LP</div>
                        </div>
                    </div>
                </div>
                <div className='history'>
                    <div className='bg-gray-top history-header'>
                        <div>
                            <Nav className="active" variant='tabs' defaultActiveKey='rank-1'  >
                                <Nav.Link className='nav-link' eventKey='rank-1' onClick={() => {setTab(0)}} >전체 {tab} </Nav.Link>
                                <Nav.Link eventKey='rank-2' onClick={() => {setTab(1)}}>솔로랭크</Nav.Link>
                                <Nav.Link eventKey='rank-3' onClick={() => {setTab(2)}}>자유랭크</Nav.Link>
                                
                                <select className='select-gray'>
                                    <option> 큐 타입 </option>
                                    <option> 일반 </option>
                                    <option> 무작위 총력전 </option>
                                </select>
                            </Nav>
                        </div>

                        <div className='search'>
                            <img className='search-img' src="https://s-lol-web.op.gg/images/icon/icon-search.svg?v=1700641403304" alt="search"></img>
                            <label className='hidden' htmlFor='championInput'>챔피언 선택</label>
                            <input className='championInput' name='championInput' placeholder='챔피언 검색'/>
                        </div>
                    </div>

                    {
                        history.results && history.results.map((data, i) => {
                            if (data === true) {
                                data = '승리'
                            }
                            else {
                                data = '패배'
                            }

                            return(
                                    <div key={i} className='bg-gray-bottom stats-box'>
                                        <div>
                                            <div className='text'>솔랭</div>
                                            <div className='text'>{data }</div>
                                            <div className='text'>23분11초</div>
                                        </div>
                                        <div>
                                            <div>{history.champions[i]}</div>
                                            <div>{history.kills[i]}/{history.deaths[i]}/{history.assists[i]}</div>
                                        </div>
                                        <div> 
                                        </div>
                                    </div>
                                )
                        })
                    }
                </div>
            </div>
        </div>
        )
}

export default Summoner
