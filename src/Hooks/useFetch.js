import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState([]);

   useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => {
        console.error('Failed to fetch data:', error);
      });
  }, [url]);
  return data;
}