import { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'

function Login() {

    let [id, setId] = useState();
    let [password, setPassword] = useState();
    console.log(id)
    console.log(password)

    const navigate = useNavigate();
    const navigateToSignUp =() => {
        navigate('./signup')
    };

    const REST_API_KEY = '83737e699fa7fe760ecf8b866a016030';
    const REDIRECT_URI = 'http://localhost:3000/auth';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const loginHandler = () => {
        alert(link)
        window.location.href = link;
    };

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
                    <button className='button-bg mg-rt10' onClick={navigateToSignUp}>회원 가입</button>
                    <button className='button-bg'  type='submit'>로그인</button>
                    <button type='button' onClick={loginHandler}>
                        카카오 로그인
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login