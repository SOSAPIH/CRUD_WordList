import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {db} from '../db/fbase';
import { collection, addDoc, getDocs} from 'firebase/firestore';

export default function CreateWord() {
  const [days, setDays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [inputEng, setInputEng] = useState('');
  const [inputKor, setInputKor] = useState(''); 
  const [selectVal, setSelectVal] = useState(''); 

  const engRef = useRef(null);
  const korRef = useRef(null);
  const dayRef = useRef(null);
  
  const sortedDays = useMemo(() => {
    return days.sort((a, b) => a.day - b.day);
  }, [days]);

  useEffect(() => {
    const getDays = async () => {
      const daysCollection = collection(db, "days");
      const daysSnapshot = await getDocs(daysCollection);
      let daysData = daysSnapshot.docs.map(doc => doc.data());
      console.log('daysSnapshot:', daysSnapshot);
      setDays(daysData);
    };
    getDays();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!engRef.current.value || !korRef.current.value || !dayRef.current.value) {
      alert('빈칸을 전부 채워주세요.');
      return;
    }

    setIsLoading(true);
    const docRef = await addDoc(collection(db, "words"), {
      day: dayRef.current.value,
      eng: engRef.current.value,
      kor: korRef.current.value,
      isDone: false,
    });

    if (docRef) {
      alert('생성이 완료되었습니다.');
      navigate(`/day/${dayRef.current.value}`);
    } else {
      alert('생성에 실패하였습니다.');
    }
    setIsLoading(false);
  }

  

  const handleChangeEng = useCallback((e) => {
    setInputEng(e.target.value);
  }, []);
  
  const handleChangeKor = useCallback((e) => {
    setInputKor(e.target.value);
  }, []);
  
  const handleChange = useCallback((e) => {
    setSelectVal(e.target.value);
  }, []);
  
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
        {sortedDays.map(day => {
  return <option key={day.eng} value={day.day}>{day.day}</option>
})}
      </select>
    </div>
    <button style={{opacity: isLoading? 0.3 : 0.7}}>{isLoading? "저장 중..." : "저장"}</button>
  </form>)
}
