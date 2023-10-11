import { useState, useCallback } from 'react';
import { db } from '../db/fbase';
import { collection, query, where, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';

export default function Word({ word: 단어, day: dayProp }) {
  const [word, setWord] = useState(단어);
  const [isShow, setIsShow] = useState(false);
  const [isDone, setIsDone] = useState(word.isDone);

  const changeIsDone = useCallback(async () => {
    if (word && word.eng) {
      const querySnapshot = await getDocs(query(collection(db, 'words'), where('day', '==', dayProp)));
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { isDone: (prevIsDone) => !prevIsDone });
      });
      setIsDone((prevIsDone) => !prevIsDone);
    }
  }, [dayProp, isDone, word]);

  const del = useCallback(async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      const querySnapshot = await getDocs(query(collection(db, 'words')));
      querySnapshot.forEach(async (doc) => {
        if (doc.data().eng === word.eng) {
          await deleteDoc(doc.ref);
          setWord({ eng: 0 });
        }
      });
    }
  }, [word]);

  const toggleShow = useCallback(() => {
    setIsShow((prevIsShow) => !prevIsShow);
  }, [isShow]);

  if (word.eng === 0) {
    return null;
  }

  return (
    <>
      <tr className={isDone ? 'off' : ''}>
        <td><input type="checkbox" onChange={changeIsDone} checked={isDone} /></td>
        <td>{word.eng}</td>
        <td>{isShow && word.kor}</td>
        <td><button onClick={toggleShow}>뜻 {isShow ? '숨기기' : '보기'}</button></td>
        <td><button className="btn_del" onClick={del}>삭제</button></td>
      </tr>
    </>
  );
}