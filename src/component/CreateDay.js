// import useFetch from '../Hooks/useFetch';
import { useState, useEffect, useCallback } from 'react';
import {useNavigate} from 'react-router-dom';
import {db} from '../db/fbase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function CreateDay() {
  const [days, setDays] = useState([]);
  const navigate = useNavigate();

  const getDays = useCallback(async () => {
    const daysCollection = collection(db, 'days');
    const daysSnapshot = await getDocs(daysCollection);
    let daysData = daysSnapshot.docs.map(doc => doc.data());
    setDays(daysData);
  }, []);

  useEffect(() => {
    getDays();
  }, [getDays]);
  
  const addDay = useCallback(async () => {
    const newDay = days.length + 1;
    await addDoc(collection(db, "days"), {
      id: newDay,
      day: newDay
    });
    setDays(prev => [...prev, { id: newDay, day: newDay }]);
    navigate('/');
  }, [days.length, navigate]);
  
  return (<div className="create_day">
    <h3>현재 일수: {days.length}일</h3>
    <button onClick={addDay}>Day 추가</button>
  </div>)    
}