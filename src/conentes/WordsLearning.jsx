import { useEffect, useState } from "react"
import "./WordLearningCss.css"
import axios from "axios";

export default function() {
    const [ inD, setInD ] = useState('');
    const [ wordArr, setWordArr ] = useState([{}]);
    const [ userWordArr, setUserWordArr ] = useState([]);

    useEffect(() => {
        const userChoiceWord = async () => {
            const response = await axios.get('https://grateful-fir-jury.glitch.me/userChoiceWord');
            setWordArr(response.data);
        }
        userChoiceWord();
    });

    const findWord = (value) => {
        const found = value;
        const result = wordArr.filter(item => item.word.includes(found));
        if(result){
            
        }
    }
    const addUserArr = (prop) => {
        /*
        if(prop.trim() === '')
            return;
        const addData = prop;
        setWordArrLen(wordArrLen => (
            [...wordArrLen, addData]
        ));
        */
        setInD('');
    }
    
    return(
        <>
            <div className="wordEditorBox">
                <div className="wordAddBox">
                    <input  value={inD}
                            className="wordFindBox" 
                            placeholder="검색할 단어를 입력해주세요." 
                            onChange={(e) => (setInD(e.target.value))} 
                    />
                    <button className="findBtn" 
                            onClick={() => {findWord(inD)}}>
                    검색</button>
                </div>
                <div className="wordListBox">
                    {
                        userWordArr.map(item => (
                            <div className="wordItem">
                                <input className="wordCheckBox" type="checkbox" />
                                <b>{item.id}. &nbsp; {item.word} &nbsp; → &nbsp; {item.mean}</b>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <button className="submitBtn">학습하기</button>
                </div>
            </div>
            
        </>
    )
}