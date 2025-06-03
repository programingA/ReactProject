import axios from "axios";
import "./EnterCss.css"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";

function EnterUser() {
    const [ users, setUsers ] = useState({
        name: '',
        nickname: '',
        password: '',
        passwordCheck: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsers(previous => ({
            ...previous,
            [name]: value
        }));
    }

    const [ errors, setErrors ] = useState({});
    const validate = async () => {
        const newErrors = {};
        
        if(!users.name) newErrors.name = "*이름이 입력되지 않았습니다."
        if(!users.nickname) {
            newErrors.nickname = "*닉네임이 입력되지 않았습니다."
        }else{
            const response = await axios.get('http://localhost:3001/posts');
            const usersData = response.data;
            const found = usersData.find(user => user.nickname === users.nickname);
            if (found) newErrors.nickname = "*같은 닉네임이 있습니다."
        }
        if (!users.password) newErrors.password = "*비밀번호가 입력되지 않았습니다."
        if (users.password !== users.passwordCheck) newErrors.passwordCheck = "*비밀번호가 일치하지 않습니다."

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    
    const navigate = useNavigate();
    const onSubmit = async () => {
        const isValid = await validate();
        
        if(isValid) {
            await axios.post('http://localhost:3001/posts', {
                name: users.name,
                nickname: users.nickname,
                password: users.password
            });
            setUsers({
                name: '',
                nickname: '',
                password: '',
                passwordCheck: ''
            });
            setErrors({});
            alert("회원가입이 완료되었습니다!");
            navigate('/');
        }
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
                        <input  name="name"
                                value={users.name} 
                                onChange={handleChange}
                        />
                        <br />
                        <b className="WarningMsg">{errors.name}</b>
                    </div>
                    <div>
                        <input  name="nickname"
                                value={users.nickname} 
                                onChange={handleChange}
                        />
                        <br />
                        <b className="WarningMsg">{errors.nickname}</b>
                    </div>
                    <div>
                        <input  type="password"
                                name="password"
                                value={users.password}
                                onChange={handleChange}
                        />
                        <br />
                        <b className="WarningMsg">{errors.password}</b>
                    </div>
                    <div>
                        <input  type="password"
                                name="passwordCheck" 
                                value={users.passwordCheck}
                                onChange={handleChange}
                        />
                        <br />
                        <b className="WarningMsg">{errors.passwordCheck}</b>
                    </div>
                </div>
                <button onClick={()=>{onSubmit()}} 
                        className="EnterBtn">
                submit</button>
            </div>
        </>
    )
}

export default EnterUser;