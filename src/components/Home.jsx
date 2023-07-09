import { useEffect } from 'react';
import BedList from '../components/BedList';
import { Link } from 'react-router-dom';
import { useBedsState } from '../context/beds/index';
import { getBeds } from '../context/beds/actions';
import { useBedsDispatch } from '../context/beds/context';

export default function Home() {
  const dispatchBeds = useBedsDispatch();
  const { beds: bedData, loading, error } = useBedsState();

  useEffect(() => {
    //only run if we don't already have data in context
    if (bedData.length === 0) getBeds(dispatchBeds);
  }, [bedData, dispatchBeds]);

  return (
    <div className="home">
      {error && <div>{error.message}</div>}
      {loading && <div>Loading...</div>}
      {bedData && (
        <>
          <Link to="/add-bed" role="button">
            Add a new bed
          </Link>
          <BedList beds={bedData} />
        </>
      )}
    </div>
  );
}
