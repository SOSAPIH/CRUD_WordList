import { useState, useEffect } from 'react';
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
  
  const onSubmit = async () => {
    if (checked.length === 0) {
      alert('삭제할 요일을 선택하세요.');
      return;
    }
    // checked 배열에 있는 고유 ID를 사용하여 Firestore에서 해당 문서를 삭제
    checked.forEach(async (id) => {
      try {
        await deleteDoc(doc(db, 'days', id));
        // 삭제 성공
        console.log(`문서 ID ${id}가 삭제되었습니다.`);
      } catch (error) {
        // 삭제 중 오류 발생
        console.error(`문서 ID ${id}를 삭제하는 동안 오류가 발생했습니다:`, error);
      }
    });
  
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
    console.log("days:::",days)
  
    console.log('dayId:', dayId);
    console.log('isChecked:', isChecked);
    if (isChecked) { // checked

      setChecked((prev) => [...prev, dayId]);
      console.log(checked);
    } else { // not checked
      setChecked((prev) => prev.filter((id) => id !== dayId));
      console.log(checked);
    }
  }
  
  return (<>
    <form onSubmit={onSubmit} className='del_radio'>
      {days.sort((a,b)=> a.day - b.day).map(day => {
        return <label key={day.id}>
          <span key={day.id+day.day} className='inputName'>{day.day}</span>
          <input type="checkbox" key={day.id} name='day' value={day.id} onChange={onChange}/>
        </label>
      })}
      <div>
        <button >삭제</button>
      </div>
    </form>
  </>)
}