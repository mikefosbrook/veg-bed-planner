import { useEffect, useState } from 'react';

const useFetch = (initURL) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortController = new AbortController();

  useEffect(() => {
    // perform a GET request on component load
    fetchRequest(initURL, { method: 'GET', signal: abortController.signal });
  }, []);

  const fetchRequest = async (url, options, onSuccessCallBack) => {
    try {
      const response = await fetch(url, { ...options, signal: abortController.signal });
      const newData = await response.json();
      setIsLoading(false);
      // if method is POST or DELETE, we don't want to set data as the response
      // Delete would be an empty object, and POST would be the new object
      if (!options || options.method === 'GET') {
        setData(newData);
      }
      if (onSuccessCallBack) {
        onSuccessCallBack(newData);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Fetch request was cancelled');
        console.log('abortController.signal.aborted', abortController.signal.aborted);
      } else {
        setIsLoading(false);
        setError(err.message);
      }
    }

    // cleanup function to abort fetch request
    return () => abortController.abort();
  };

  return { data, isLoading, error, fetchRequest };
};

export default useFetch;
