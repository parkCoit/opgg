import './Main.css'
import { useState } from 'react'
import { summonerData, historyData } from '../api'
import useUserHistory from '../hooks/useUserHistory'


function Main() {

    let [data, setData] = useState({region : 'kr'})

    const api_key = 'RGAPI-7e1085af-49af-46ec-8e62-adc761942c32'

    const {summoner} = useUserHistory(api_key)

    const handleSubmitButton = (e) => {
        e.preventDefault()
        summonerData(summoner)
        .then((res) => {
            alert(JSON.stringify(res.data))
            localStorage.setItem('summonerData', JSON.stringify(res.data))
        })
        .catch((err) =>{
            alert(err)
        })
        
        
        console.log(data)
        console.log('e : ',e?.target)
        localStorage.setItem('summoner' , JSON.stringify(data))
        window.location.href=`/summoner/${data['region']}/${data['name']}`
    }

    const handleChange = (e) => {
        if (e.target.name === 'summoner') {
            let asd = e.target.value
            const target = asd.split('#')
            data.name = target[0]
            data.tag = target[1]
            setData(data)
            console.log(data)
        }
        else{
            if(e.target.value === 'korea'){
                data.region = 'kr'
                setData(data)
            }
            else{
                data.region = 'jp'
                setData(data)
            }
        }
    }
    

    return(
        <div className="bg-gray">
            <div>
                <img alt="web-logo" src='https://meta-static.op.gg/logo/image/3e4822d54ae8100dced135597718821c.png?image=q_auto,f_webp,w_auto,h_448&v=1700641403304' width='30%' />
            </div>
            <form className='flex' id="form" onSubmit={handleSubmitButton}>
                <select name='region' onChange={handleChange} >
                <option>korea</option>
                <option>Japan</option>
                </select>
                <div className='column'>
                    <label htmlFor="summoner">이름</label>
                    <input required name='summoner' type='text' placeholder="플레이어 이름 + #KR1" onChange={handleChange}/>  
                </div>
                <button type='summit' >.GG</button>
            </form>
        </div>
    )
}


export default Main