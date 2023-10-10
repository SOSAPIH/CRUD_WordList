import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { db } from '../db/fbase';
import { collection, getDocs} from 'firebase/firestore';
// import useFetch from '../Hooks/useFetch';
// import dummy from "../db/data.json";

export default function DayList() {
  const [days, setDays] = useState([]);

  useEffect(()=> {
    const getDays = async () => {
      const daysCollection = collection(db, 'days');
      const daysSnapshot = await getDocs(daysCollection);
      let daysData = daysSnapshot.docs.map(doc => doc.data());
      daysData = daysData.sort((a,b)=> a.day - b.day);
      setDays(daysData);
    }
    
    getDays();
  }, [days]);
  
  if (days.length === 0) {
    return <span className="wait">Wait...</span>
  }
 
  return (
    <ul className="list_day">
      {days.map(day => (<li key={day.id}>
        <Link to={`/day/${day.day}`}>Day {day.day}</Link>
      </li>))}
    </ul>)
}