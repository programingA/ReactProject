import axios from "axios";
import "../App.css"
import { React, useState } from "react"
import { useNavigate, Link } from "react-router-dom";

async function checkNickname(nickname) {
    const response = await axios.get('http://localhost:3001/posts');
    const users = response.data;
    const found = users.find(user => user.nickname === nickname);
    
    return found;
}

function EnterUserMain() {
    const navigate = useNavigate();
    const [ name, setName ] = useState('');
    const [ nickname, setNickname ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordCheck, setPasswordCheck ] = useState('');
    const [ isName, setIsName ] = useState('');
    const [ isNickname, setIsNickname ] = useState('');
    const [ isPassword, setIsPassword ] = useState('');
    const [ isPasswordCek, setIsPasswordCek ] = useState('');

    const onSubmit = async () => {
        const isValid = await validata();
        checkNickname(nickname).then(found => {
            if(found){
                setIsNickname("*같은 닉네임이 있습니다.");
                isValid = false;
            }else if(nickname === ''){
                setIsNickname('*닉네임이 비어있습니다.');
                isValid = false;
            }else{
                setIsNickname('');
            }
            if(name === ''){
                setIsName("*이름이 비어있습니다.");
                isValid = false;
            }else{
                setIsName("");
            }
            if(password === ''){
                setIsPassword("*비밀번호가 비어있습니다.");
                isValid = false;
            }else{
                setIsPassword("");
            }
            if(password !== passwordCheck){
                setIsPasswordCek("*비밀번호가 맞지 않습니다.")
                isValid = false;
            }else{
                setIsPasswordCek("");
            }
            if(isValid) {
                axios.post('http://localhost:3001/posts', {
                    name: name,
                    nickname: nickname,
                    password: password
                });
                setName('');
                setNickname('');
                setPassword('');
                setPasswordCheck('');
                alert("회원가입이 완료되었습니다!");
                navigate('/');
            }
        })
    }
    
    return(
        <>
            <Link to='/'>홈으로 가기</Link>
            <div className="EnterBox">
                <h2 className="EnterLabel">회원가입</h2>
                <div className="EnterText">
                    <b>이름</b>
                    <b>닉네임</b>
                    <b>비밀번호</b>
                    <b>비밀번호 확인</b>
                </div>
                <div className="EnterInputBox">
                    <div>
                        <input  value={name} 
                                onChange={(e)=>(setName(e.target.value))}
                        />
                        <br />
                        <b className="EnterWarningMsg">{isName}</b>
                    </div>
                    <div>
                        <input  value={nickname} 
                                onChange={(e)=>(setNickname(e.target.value))}
                        />
                        <br />
                        <b className="EnterWarningMsg">{isNickname}</b>
                    </div>
                    <div>
                        <input  type="password"
                                value={password}
                                onChange={(e)=>(setPassword(e.target.value))}
                        />
                        <br />
                        <b className="EnterWarningMsg">{isPassword}</b>
                    </div>
                    <div>
                        <input  type="password" 
                                value={passwordCheck}
                                onChange={(e)=>{setPasswordCheck(e.target.value);}}
                        />
                        <br />
                        <b className="EnterWarningMsg">{isPasswordCek}</b>
                    </div>
                </div>
                <button onClick={()=>{onSubmit()}} 
                        className="EnterBtn">
                submit</button>
            </div>
        </>
    )
}

export default EnterUserMain;