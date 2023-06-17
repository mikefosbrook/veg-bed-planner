import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    const fetchData = async () => {
      try {
        const res = await fetch(url, { signal: abortCont.signal });
        const newData = await res.json();
        setIsLoading(false);
        setData(newData);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch request was cancelled');
        } else {
          setIsLoading(false);
          setError(err.message);
        }
      }
    };
    fetchData();
    return () => abortCont.abort();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
