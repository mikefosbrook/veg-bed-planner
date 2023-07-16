import { useEffect } from 'react';
import BedList from './components/BedList';
import { Link } from 'react-router-dom';
import { useBedsState } from '../../contexts/Beds/index';
import { getBeds } from '../../contexts/Beds/actions';
import { useBedsDispatch } from '../../contexts/Beds/context';

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
          {bedData.length ? <BedList beds={bedData} /> : <p>No beds yet. Add one above.</p>}
        </>
      )}
    </div>
  );
}
