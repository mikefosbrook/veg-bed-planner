import { useEffect } from 'react';
import BedList from './components/BedList';
import { Link } from 'react-router-dom';
import allActions from '../../actions';
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {
  const dispatchBeds = useDispatch();

  const { beds: bedData, loading, error } = useSelector((state) => state.beds);

  useEffect(() => {
    // only run if we don't already have bedData
    if (!bedData) dispatchBeds(allActions.bedActions.getBeds());
  }, [bedData, dispatchBeds]);

  return (
    <div className="home">
      {error && <div>Error: {error.message}</div>}
      {loading && <div>Loading...</div>}
      {bedData && (
        <>
          <Link to="/add-bed" role="button">
            Add a new bed
          </Link>
          {bedData.length ? <BedList beds={bedData} /> : <p className="prompt">No beds yet. Add one above.</p>}
        </>
      )}
    </div>
  );
}
