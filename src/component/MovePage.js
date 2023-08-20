import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';

export default function MovePage() {
  const navigate = useNavigate();
  const { day } = useParams(); // 반환값은 문자열
  const days = useFetch('http://localhost:4000/days');
  
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