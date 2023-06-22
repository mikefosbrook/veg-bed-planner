import BedList from '../components/BedList';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

export default function Home() {
  const API_HOST = import.meta.env.VITE_API_HOST;
  const { data: beds, isLoading, error } = useFetch(`${API_HOST}/beds/`);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      <Link to="/create-bed">
        <button type="button">Add a new bed</button>
      </Link>
      {beds && <BedList beds={beds} />}
    </div>
  );
}
