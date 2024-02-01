import { useState } from "react"
import User from "../User";
import './Champions.css'



function Champions() {

    const [name, setName] = useState()

    const handleName = (event) => {
        event.preventDefault();
        setName(event.target.value)
    }

    return(
        <div>
            <User/>
            <div className="header">
                <div >
                    <form action="./dd">
                        <div>
                            <label htmlFor="userText">글 작성</label>
                        </div>
                        <div>
                            <input id="userText" type="text" className="bg-white" onChange={(event) => {handleName(event)}}/>
                            <button type="submit" onClick={() => {}}>글작성</button>
                        </div>
                        {name}
                    </form>
                </div>

                <div className="articleList">ss</div>
                
            </div>
        </div>
    )
}

export default Champions