import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Word from './Word';
import MovePage from './MovePage';
import {db} from '../db/fbase';
import { collection, getDocs, query, where} from 'firebase/firestore';
// import useFetch from '../Hooks/useFetch';

export default function Day() {
  const { day } = useParams();
  const [words, setWords] = useState([]);  

  useEffect(()=> {
    const getWords = async () => {
      const wordsCollection = collection(db, "words");
      const q = query(wordsCollection, where("day", "==", day));
      const wordsSnapshot = await getDocs(q);
      const wordsData = wordsSnapshot.docs.map(doc => doc.data());

      
      setWords(wordsData);
      // setWords(wordsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    getWords();
  }, [day]);
  
  return (
    <div className="day">
    <h2 className="dayName">Day {day}</h2>
    {words.length === 0 && (<span>단어 없음</span>)}
    <table>
      <tbody>
        {words.map(word => (
          <Word word={word} key={word.kor}  day={day}/>
        ))}
      </tbody>
      </table>
      <MovePage/>
  </div>)
}