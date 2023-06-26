import { Link } from 'react-router-dom';

export default function BedList({ beds }) {
  return (
    <div className="bed-list">
      {beds.map((beds) => (
        <article className="beds-preview" key={beds.id}>
          <Link to={`/beds/${beds.id}`}>
            <h2>{beds.name}</h2>
            <p>
              ({beds.cellsX} x {beds.cellsY})
            </p>
          </Link>
        </article>
      ))}
    </div>
  );
}
