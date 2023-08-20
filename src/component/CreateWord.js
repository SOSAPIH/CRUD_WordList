import useFetch from '../Hooks/useFetch';
import {useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateWord() {
  const days = useFetch(`http://localhost:4000/days`)
  const navigate = useNavigate(); 
  const [isLoading, setIsLoading] = useState(false);
  const [inputKor, setInputKor] = useState('');
  const [inputEng, setInputEng] = useState('');
  const [selectVal, setSelectVal] = useState('');
  
  function onSubmit(e) {
    e.preventDefault();
    if (!inputEng || !inputKor || !selectVal) {
      alert('빈칸을 전부 채워주세요.');
      return;
    }
    
    if (!isLoading) {
      setIsLoading(true);
      fetch(`http://localhost:4000/words`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          day: dayRef.current.value,
          eng: engRef.current.value,
          kor: korRef.current.value,
          isDone : false
        }),
      }).then(res => {
        if (res.ok) {
          alert('생성이 완료되었습니다.');
          navigate(`/day/${dayRef.current.value}`);
        }
      })
    }
  }

  const engRef = useRef(null);
  const korRef = useRef(null);
  const dayRef = useRef(null);

  const handleChangeEng = (e) => {
    setInputEng(e.target.value);
  }
  const handleChangeKor = (e) => {
    setInputKor(e.target.value);
  }
  const handleChange = e => {
    setSelectVal(e.target.value);
  }
  
  return (<form onSubmit={onSubmit} className="create_word">
    <div className="input_area">
      <label>Eng</label>
      <input type="text" placeholder="computer" value={inputEng} onChange={handleChangeEng} ref={engRef} />
    </div>
    <div className="input_area">
      <label>Kor</label>
      <input type="text" placeholder="컴퓨터" value={inputKor} onChange={handleChangeKor} ref={korRef} />
    </div>
    <div className="input_area">
      <label>Day</label>
      <select ref={dayRef} value={selectVal} onChange={handleChange}>
        <option value="">--- 선택하세요 ---</option>
        {days.map(day => {
          return <option key={day.id} value={day.day}>{day.day}</option>
        })}
      </select>
    </div>
    <button style={{opacity: isLoading? 0.3 : 0.7,}}>{isLoading? "저장 중..." : "저장"}</button>
  </form>)
}