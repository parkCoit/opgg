import { useState } from 'react'
import User from '../User'
import './Summoner.css'
import { Nav } from 'react-bootstrap'
 
function Summoner() {

    let [tab, setTab] = useState(0)

    return(
        <div>
            <User/>
            <div className='header'>
                <div className='side-bar'>
                    <div className='bg-gray-top bar-header'>
                        솔로랭크
                    </div>
                    <div className='bg-gray-bottom'>
                        ㅇㅇ
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
                            <label className='hidden' htmlFor='chmpionInput'>챔피언 선택</label>
                            <input className='chmpionInput' name='chmpionInput' placeholder='챔피언 검색'/>
                        </div>
                    </div>
                    <div className='bg-gray-bottom'>
                        asd
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Summoner
