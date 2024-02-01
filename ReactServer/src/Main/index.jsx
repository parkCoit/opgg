import './Main.css'
import { useState,  } from 'react'
import { summonerData } from '../api'

function Main() {

    let [data, setData] = useState({region : 'kr'})

    const handleSubmitButton = (e) => {
        e.preventDefault()
        summonerData(data)
        .then((res) => {
            alert(JSON.stringify(res.data))

        })
        .catch((err) =>{
            alert(err)
        })
        alert(JSON.stringify(data))
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