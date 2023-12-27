import { useState } from 'react'
import './Login.css'

function Login() {

    let [id, setId] = useState()
    let [password, setPassword] = useState()
    console.log(id)
    console.log(password)

    return(
        <div className="login">
            <form>
                <div className='mg-bt10'>
                    <label className='mg-rt10' htmlFor="id">아이디 : </label>
                    <input className='bg-white' name='id' type='text' onChange={(e) => {setId(e.target.value)}}/>
                </div>
                <div className='mg-bt10'>
                    <label className='mg-rt10' htmlFor="password">비밀번호 : </label>
                    <input className='bg-white' name='password' type='text' onChange={(e) => {setPassword(e.target.value)}} />
                </div>
                <div>
                    <button className='button-bg mg-rt10'>회원 가입</button>
                    <button className='button-bg'  type='submit'>로그인</button>
                </div>
            </form>
        </div>
    )
}

export default Login