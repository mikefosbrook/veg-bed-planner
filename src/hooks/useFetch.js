import { useEffect, useState } from 'react';

const useFetch = (initURL) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // perform a GET request on component load - no body needed
    fetchRequest(initURL);
  }, []);

  const fetchRequest = async (url, options, onSuccessCallBack) => {
    const abortController = new AbortController();
    try {
      const response = await fetch(url, { ...options, signal: abortController.signal });
      const newData = await response.json();
      setIsLoading(false);
      setData(newData);
      if (onSuccessCallBack) {
        onSuccessCallBack(newData);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Fetch request was cancelled');
      } else {
        setIsLoading(false);
        setError(err.message);
      }
    }

    return () => abortController.abort();
  };

  return { fetchRequest, data, isLoading, error };
};

export default useFetch;
