import { Link } from 'react-router-dom';

export default function BedList({ beds }) {
  return (
    <div className="bed-list">
      {beds.map((beds) => (
        <div className="beds-preview" key={beds.id}>
          <Link to={`/beds/${beds.id}`}>
            <h2>{beds.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}
