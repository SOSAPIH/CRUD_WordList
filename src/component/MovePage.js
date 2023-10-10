import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { db } from '../db/fbase';
import { collection, getDocs} from 'firebase/firestore';

export default function MovePage() {
  const navigate = useNavigate();
  const { day } = useParams(); // 반환값은 문자열
  const [days, setDays] = useState([]);
  
  useEffect(()=> {
    const getDays = async () => {
      const daysCollection = collection(db, 'days');
      const daysSnapshot = await getDocs(daysCollection);
      let daysData = daysSnapshot.docs.map(doc => doc.data());
      setDays(daysData);
    }
    getDays();
  },[])  

  function moveBack() {
    navigate(`/day/${Number(day)-1}`, { replace: true });
  }

  function moveForward() {
    navigate(`/day/${Number(day) + 1}`, { replace: true });
  }
  
  return (
    <div className="direction">
      {day>1 && <button onClick={moveBack} className="direction_left">이전</button>}
      {Number(day) < days.length && <button onClick={moveForward} className="direction_right">이후</button>}
    </div>
  )
}