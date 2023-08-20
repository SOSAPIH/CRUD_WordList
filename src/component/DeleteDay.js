import useFetch from '../Hooks/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DeleteDay() {
  const days = useFetch(`http://localhost:4000/days`);  
  const [checked, setChecked] = useState([]); // 1. 배열로 초기화
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    if (checked.length === 0){
      alert('삭제할 요일을 선택하세요.');
      return;
    }
    Promise.all(
      checked.map(check => (
        fetch(`http://localhost:4000/days/${check}`, {
          method: 'DELETE',
        })  
      ))
    ).then(res => {
      console.log('res', res);
      const deleteResult = res.map(res => res.ok);
      console.log('deleteResult:', deleteResult);
      if (deleteResult.every(result => result === true)) {
        alert('선택한 요일을 모두 삭제하였습니다.');
        navigate('/');
      } else {
        alert('요일 삭제에 실패하였습니다.');
      }
    })
  }
  
  function onChange(e) {
    const value = e.target.value;
    if (e.target.checked) { //checked
      setChecked(prev => [...prev, value]); // 2. 배열로 업데이트
    } else { // not checked
      setChecked(prev => prev.filter(item => item !== value));
    }
  }
  
  return (<>
    <form onSubmit={onSubmit} className='del_radio'>
      {days.map(day => {
        return <label key={day.id}>
          <span key={day.id+day.day} className='inputName'>{day.day}</span>
          <input type="checkbox" key={day.id} name='day' value={day.day} onChange={onChange} checked={checked.includes(`${day.day}`)} />
        </label>
      })}
      <div>
        <button >삭제</button>
      </div>
    </form>
  </>)
}
