import React, { useState, Fragment } from "react"
import '../App.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Header(){
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
    
    const [ users, setUsers ] = useState({
        nickname: '',
        password: ''
    });
    const [ errors, setErrors ] = useState({
        nicknameErr: '',
        passwordErr: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsers(previous => ({
            ...previous,
            [name]: value
        }));
    };

    const navigate = useNavigate();
    const isValid = async () => {
        const response = await axios.get('http://localhost:3001/posts');
        const usersData = response.data;
        if(users.nickname !== ''){
            const foundId = usersData.findIndex(user => user.nickname === users.nickname);
            if(foundId !== -1){
                const foundPassword = (usersData[foundId].password === users.password);
                setErrors(previous => ({...previous, nicknameErr:''}));

                if(foundPassword === true){
                    await axios.put('http://localhost:3001/currentUser', {
                        nickname: users.nickname
                    });
                    setErrors(previous => ({...previous, passwordErr:''}));
                    setUsers(previous => ({...previous, nickname:''}));
                    setUsers(previous => ({...previous, password:''}));
                    alert('로그인 성공!');
                    navigate('/LoginPage');
                }else{
                    setErrors(previous => ({...previous, passwordErr:'비밀번호가 맞지 않습니다.'}));
                }
            }else{
                setErrors(previous => ({...previous, nicknameErr:'닉네임이 맞지 않습니다.'}));
            }
        }else{
            setErrors(previous => ({...previous, nicknameErr:'닉네임이 입력되지 않았습니다.'}));
            setErrors(previous => ({...previous, passwordErr:''}));
        }
    }

    return(
        <Fragment>
            <div className="menuBar">
                {menuEK.map((item, index)=>(<label key={index} onClick={() => {alert('로그인 후 사용 가능합니다.')}} className="menuElement">{item.menuName}</label>))}
            </div>
            <div className="loginBar">
                <div>
                    <b>로그인</b>
                    <br />
                    <input  name="nickname"
                            value={users.nickname}
                            onChange={handleChange}
                            type="text" 
                            placeholder="닉네임" 
                    />
                    &nbsp;
                    <input  name="password"
                            value={users.password}
                            onChange={handleChange}
                            type="password" 
                            placeholder="비밀번호" 
                    />
                    <button onClick={isValid}>로그인</button>
                    <div className="Link">
                        <Link to="/EnterUser" className="Link">회원가입</Link>
                        <b>/</b>
                        <Link to="/FindPassword" className="Link">비밀번호찾기</Link>
                    </div>
                    <div>
                        <b className="WarningMsg">{errors.nicknameErr}</b>
                        &nbsp;
                        <b className="WarningMsg">{errors.passwordErr}</b>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Header