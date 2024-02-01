import { useEffect, useState } from "react"
import { kakaoLoginData } from "../api";


function LoginAuth () {

    const [data, setData] = useState()

    const getData = async (code) => {
        try{
            await kakaoLoginData(code)
            .then((res) => {
                console.log('then 이에요 ')
                alert(res.data)
                return res.data
            })
            .catch((err) => {
                console.log('catch 에요 ')
                alert(err.data)
                return err.data 
            })
        }
        catch (err) {
            alert(err)
        }
    };

    const onclick = e => {
        e.preventDefault()
        const code = new URL(window.location.href).searchParams.get("code");
        kakaoLoginData(code)
        .then((res) => {
            alert(JSON.stringify(res.data))
        })
        .catch((err) => {
            alert(err.data) 
        })
    }

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        getData(code);
    }, []);



    return(
        <div>
            로그인중
            <button onClick={onclick}>버튼</button>
        </div>
    )
}

export default LoginAuth