import { useEffect, useState } from "react"
import { kakaoLoginData } from "../api";
import base64 from 'base-64';


function LoginAuth () {

    const [token, setToken] = useState()
    const [user, setUser] = useState()

    const getData = async (data) => {
        try{
            await kakaoLoginData(data)
            .then((res) => {
                console.log('then 이에요 ')
                setToken(res.data)
                let resData = res.data
                alert(JSON.stringify(res.data))
                console.log(typeof(res.data))
                let payload = resData.substring(resData.indexOf('.')+1,resData.lastIndexOf('.'))
                console.log(base64.decode(payload))
                setUser(base64.decode(payload))
                return res.data
            })
            .catch((err) => {
                console.log('catch 에요 ')
                alert(err)
                return err
            })
        }
        catch (err) {
            alert(err)
        }
    };

    const onclick = e => {
        e.preventDefault()
        const code = new URL(window.location.href).searchParams.get("code");
        kakaoLoginData({"code" : code})
        .then((res) => {
            alert(JSON.stringify(res.data))
        })
        .catch((err) => {
            alert(err) 
        })
    }

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        getData({'code' : code});
    }, []);



    return(
        <div>
            로그인중
            <button onClick={onclick}>버튼</button>
            {user}
            {token}
        </div>
    )
}

export default LoginAuth