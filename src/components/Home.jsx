import { useState, useEffect } from 'react';
import BedList from '../components/BedList';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

export default function Home() {
  const API_HOST = import.meta.env.VITE_API_HOST;
  const { data, isLoading, error, fetchRequest } = useFetch(`${API_HOST}/beds/`);
  const [bedData, setBedData] = useState(null);

  const deleteBed = (id) => {
    fetchRequest(`${API_HOST}/beds/${id}`, { method: 'DELETE' }, () => {
      setBedData(bedData.filter((bed) => bed.id !== id));
    });
  };

  if (data && !bedData) {
    setBedData(data);
  }

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {bedData && (
        <>
          <Link to="/create-bed" role="button">
            Add a new bed
          </Link>
          <BedList beds={bedData} deleteBed={deleteBed} />
        </>
      )}
    </div>
  );
}
