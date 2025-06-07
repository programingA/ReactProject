import { React, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import '../App.css'
import axios from "axios";

function LoginPage(){
    const navigate = useNavigate();
    const menuEK = [
        {
            pageName: 'WordsLearning',
            menuName: '단어학습'
        },
        {
            pageName: 'Community',
            menuName: '계시판'
        }
    ];
    
    const [ currentUser, setCurrentUser ] = useState('');
    useEffect(() => {
        const userNickname = async () => {
            const response = await axios.get('https://grateful-fir-jury.glitch.me/currentUser');
            setCurrentUser(response.data.nickname);
        };
        userNickname();
    }, []);
    
    return(
        <>
            <div className="menuBar">
                {menuEK.map((item, index)=>(<Link key={index} to={item.pageName} className="menuElement">{item.menuName}</Link>))}
            </div>
            <div className="loginBar">
                <div>
                    <b>
                        {currentUser}님 환영합니다.
                    </b>
                    <br />
                    <button onClick={() => (navigate('/'))}>로그아웃</button>
                </div>
            </div>

        </>
    )
}

export default LoginPage