import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../db/fbase';
import { collection, getDocs} from 'firebase/firestore';
// import useFetch from '../Hooks/useFetch';
// import dummy from "../db/data.json";

export default function DayList() {
  const [days, setDays] = useState([]);

  const mappedDays = useMemo(() => {
    return days.map(day => (
      <li key={day.id}>
        <Link to={`/day/${day.day}`}>Day {day.day}</Link>
      </li>
    ));
  }, [days]);

  const hasNoDays = useMemo(() => days.length === 0, [days]);
  
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
  
 
  return (
    <div>
      {hasNoDays ? <span className="wait">Wait...</span> : (
        <ul className="list_day">
          {mappedDays}
        </ul>
      )}
    </div>
  );
}