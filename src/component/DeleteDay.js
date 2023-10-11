import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {db} from '../db/fbase';
import {collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

export default function DeleteDay() {
  const [days, setDays] = useState([]);
  const [checked, setChecked] = useState([]); // 1. 배열로 초기화
  const navigate = useNavigate();
  
  useEffect(()=> {
    const getDays = async () => {
      const daysCollection = collection(db, 'days');
      const daysSnapshot = await getDocs(daysCollection);
      const getDays = daysSnapshot.docs.map(doc => ({ docId: doc.id, id: doc.data().id, ...doc.data() }));
      setDays(getDays);
    }
    getDays();
  }, []);
  
  const onSubmit = async (e) => {
    e.preventDefault();

    if(checked.length === 0){
      alert('삭제할 요일을 선택하세요.');
      return;
    }

    await Promise.all(checked.map(async (id)=> {
      try{
        await deleteDoc(doc(db, 'days', id));
      } catch(err){
        console.error(`ID ${id} 에러:`, err);
      }
    }));
    alert('선택한 요일을 모두 삭제하였습니다.');
    navigate('/');
  }
  
  
  const onChange = (e) => {
    let dayId = e.target.value; // day.id를 가져옴
    const isChecked = e.target.checked;

    days.forEach((day) => {
      if(day.day === Number(dayId)) {
        dayId = day.docId;
      }
    })
    // days돌면서 dayId와비교 하면서 checked에 추가
  
    if (isChecked) { // checked
      setChecked((prev) => [...prev, dayId]);
    } else { // not checked
      setChecked((prev) => prev.filter((id) => id !== dayId));
    }
  }
  
  const sortedDays = useMemo(() => {
    return days.sort((a, b) => a.day - b.day).map(day => (
      <label key={day.id}>
        <span key={day.id + day.day} className='inputName'>{day.day}</span>
        <input type="checkbox" key={day.id} name='day' value={day.id} onChange={onChange} />
      </label>
    ));
  }, [days]);
  
  return (<>
    <form onSubmit={onSubmit} className='del_radio'>
      {sortedDays}
      <div>
        <button >삭제</button>
      </div>
    </form>
  </>)
}