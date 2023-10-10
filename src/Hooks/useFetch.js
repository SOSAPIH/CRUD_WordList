// import { useEffect, useState } from 'react';
// import {db} from '../db/fbase';
// import { collection, doc, query, orderBy, getDocs} from 'firebase/firestore';

// firebase.initializeApp(firebaseConfig);

// export default function useFirebaseFetch(ref) {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const dbRef = firebase.database().ref(ref);
//     const handleData = snap => {
//       if (snap.val()) setData(snap.val());
//     }
//     dbRef.on('value', handleData, error => console.error('Failed to fetch data:', error));
//     return () => { dbRef.off('value', handleData); };
//   }, [ref]);

//   return data;
// }


// export default function useFetch(url) {
//   const [data, setData] = useState([]);

//    useEffect(() => {
//     fetch(url)
//       .then(res => res.json())
//       .then(data => setData(data))
//       .catch(error => {
//         console.error('Failed to fetch data:', error);
//       });
//   }, [url]);
//   return data;
// }