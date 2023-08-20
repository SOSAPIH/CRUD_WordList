import { useState } from 'react';



export default function Word({word: 단어}) {//props인 word를 00로 표현하겠다
  const [word, setWord] = useState(단어); 
  const [isShow, setIsShow] = useState(false);
  const [isDone, setIsDone] = useState(word.isDone);

  function changeIsDone() {
    fetch(`http://localhost:4000/words/${word.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...word,
        isDone:   !isDone
      })
    })
      .then(res => {
        if (res.ok) {
          setIsDone(!isDone);
        }
      })
  }


  function del() {
    if (window.confirm('삭제하시겠습니까?')) {
      fetch(`http://localhost:4000/words/${word.id}`, {
        method: 'DELETE'
      })
        .then(res => {
          if (res.ok) {
            setWord({ id: 0 });
          }
        })
    }
  }
  
  if (word.id === 0) {
    return null;
  }

  function toggleShow() {
    setIsShow(!isShow);
  }
    return (<>
      <tr className={isDone ? 'off' : ''}>
        <td><input type="checkbox" onChange={changeIsDone} checked={isDone} /></td>
        <td>{word.eng}</td>
        <td>{isShow && word.kor}</td>
        <td><button onClick={toggleShow}>뜻 {isShow ? '숨기기' : '보기'}</button></td>
        <td><button className="btn_del" onClick={del}>삭제</button></td>
      </tr>
    </>)
}