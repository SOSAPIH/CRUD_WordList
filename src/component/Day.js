import { useParams} from 'react-router-dom';
import Word from './Word';
import useFetch from '../Hooks/useFetch';
import MovePage from './MovePage';

export default function Day() {
  const { day } = useParams();
  console.log(day);
  const words = useFetch(`http://localhost:4000/words?day=${day}`) 
  
  return (
    <div className="day">
    <h2 className="dayName">Day {day}</h2>
    {words.length === 0 && (<span>단어 없음</span>)}
    <table>
      <tbody>
        {words.map(word => (
          <Word word={word} key={word.id} />
        ))}
      </tbody>
      </table>
      <MovePage/>
  </div>)
} 