import { useEffect, useState } from "react"
import "./WordLearningCss.css"
import axios from "axios";
import { Link } from "react-router-dom";

export default function() {
    const [ inData, setInData ] = useState('');
    const [ resultData, setResultData ] = useState('');
    const [ wordArr, setWordArr ] = useState([]);
    const [ userWordArr, setUserWordArr ] = useState([]);
    const [ showLearningWindow, setShowLearningWindow ] = useState(false);
    const [ showResultListBox, setShowResultListBox ] = useState(false);
    const [ selectWords, setSelectWords ]  = useState([])
    const [ randomArrIndex, setRandomArrIndex ]  = useState(0);
    const [ isCorrect, setIsCorrect] = useState([])

    useEffect(() => {
        const userChoiceWord = async () => {
            const response = await axios.get('https://grateful-fir-jury.glitch.me/userChoiceWord');
            setWordArr(response.data);
            setUserWordArr(response.data);
            const reset = await axios.get('https://grateful-fir-jury.glitch.me/selectWords');
            reset.data.map((item) => {
                axios.delete(`https://grateful-fir-jury.glitch.me/selectWords/${item.id}`)
                .catch(() => {})
            })
        }
        userChoiceWord();
    }, []);

    const findWord = (value) => {
        const found = value;
        const result = wordArr.filter(item => item.word.includes(found));
        if(result){
            setUserWordArr(result);
        }
    }

    const addUserArr = async (checked, itemId) => {
        const updatedWordArr = wordArr.map((item) => 
            item.id === itemId ? {...item, choice: checked} : item
        );
        const updatedUserWordArr = userWordArr.map((item) => 
            item.id === itemId ? {...item, choice: checked} : item
        );

        if(checked){
            await axios.post('https://grateful-fir-jury.glitch.me/selectWords', {
                id: wordArr[itemId-1].id,
                choice: checked,
                word: wordArr[itemId-1].word,
                mean: wordArr[itemId-1].mean
            });
        }else{
            await axios.delete(`https://grateful-fir-jury.glitch.me/selectWords/${itemId}`)
        }
        
        setWordArr(updatedWordArr);
        setUserWordArr(updatedUserWordArr);
    };
    
    const wordLearning = async () => {
        const learningWords = await axios.get('https://grateful-fir-jury.glitch.me/selectWords');
        if(learningWords.data.length === 0)  {
            alert("학습할 단어를 체크해주세요");
        }else{
            const randomArr = learningWords.data;
            for(let i = randomArr.length - 1; 0 < i; i--){
                const j = Math.floor(Math.random() * (i + 1));
                [randomArr[i], randomArr[j]] = [randomArr[j], randomArr[i]]
            }
            setSelectWords(randomArr)
            setShowLearningWindow(true)
        }

    }

    const answerEvent = () => { 
        let isAnswerCorrect = false;
        let isUserAnswer = "";
        if(resultData.trim() !== ""){
            isAnswerCorrect = selectWords[randomArrIndex].mean.includes(resultData);
            isUserAnswer = resultData;
        }else{
            isUserAnswer = "입력 X"
        }
        setIsCorrect(previous => [...previous, {
            isCorrect: isAnswerCorrect,
            inUserAnswer: isUserAnswer
        }]);
        if(randomArrIndex < selectWords.length - 1) {
            setRandomArrIndex(randomArrIndex + 1);
        }else{
            setShowResultListBox(true)
            console.log(isCorrect)
        }
        setResultData('');
    }

    return(
        <>
            <Link to='/LoginPage'>홈으로 가기</Link>
            <div className="wordEditorBox">
                <div className="wordAddBox">
                    <input  value={inData}
                            className="wordFindBox" 
                            placeholder="검색할 단어를 입력해주세요." 
                            onChange={(e) => (setInData(e.target.value))} 
                    />
                    <button className="findBtn" 
                            onClick={() => {findWord(inData)}}>
                    검색</button>
                </div>
                <div className="wordListBox">
                    {
                        userWordArr.map(item => (
                            <div className="wordItem" key={item.id}>
                                <input  className="wordCheckBox" 
                                        type="checkbox" 
                                        checked={item.choice || false}
                                        onChange={(e) => (addUserArr(e.target.checked, item.id))}
                                />
                                <b>{item.id}. &nbsp; {item.word} &nbsp; → &nbsp; {item.mean}</b>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <button className="submitBtn"
                            onClick={() => (wordLearning())}       
                    >학습하기</button>
                </div>
            </div>
            {showLearningWindow && (   
                <div className="learningWindow">
                    <h2 className="learningBoxLabel">학습 박스</h2>
                    <div className="learningBox">
                        {selectWords.length > 0 &&(
                            <h1 className="learningWordFont">{selectWords[randomArrIndex].word}</h1>
                        )}
                    </div>
                    <input  className="answerBox"
                            placeholder="정답을 입력해주세요." 
                            type="text" 
                            value={resultData}
                            onChange={(e) => (setResultData(e.target.value))}
                    />
                    <button className="answerCheckBox"
                            onClick={() => {answerEvent()}}
                    >확인</button>
                    <button className="learningCloseBtn"
                            onClick={() => (setShowLearningWindow(false), setShowResultListBox(false), setRandomArrIndex(0), setIsCorrect([]))}
                    >닫기</button>
                    {
                    showResultListBox && 
                        <div className="resultBox">
                            <h2>체점 결과</h2>
                            <div className="totalListBox">
                                <ul className="resultList1">
                                    {selectWords.map((item, index) => (
                                        <li className={`resultIcon ${isCorrect[index].isCorrect ? 'O' : 'X'}`}><b>정답</b> : {item.mean}</li>
                                    ))}
                                </ul>
                                <ul className="resultList2">
                                    {isCorrect.map((item) => (
                                        <li><b>사용자</b> : {item.inUserAnswer}</li>
                                    ))}
                                </ul>
                            </div>
                            <button
                                className="retryBtn"
                                onClick={() => (setShowResultListBox(false), wordLearning(), setRandomArrIndex(0), setIsCorrect([]))}
                            >다시학습</button>
                        </div>
                    }
                </div>
            )}
        </>
    )
}
