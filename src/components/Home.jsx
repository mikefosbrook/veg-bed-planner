import BedList from '../components/BedList';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

export default function Home() {
  const { data: beds, isLoading, error } = useFetch('http://localhost:4000/beds/');

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      <Link to="/create-bed">Add a new bed</Link>
      {beds && <BedList beds={beds} />}
    </div>
  );
}
