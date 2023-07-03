import { Link } from 'react-router-dom';

export default function BedList({ beds, deleteBed }) {
  return (
    <div className="bed-list">
      {beds.map((bed) => (
        <Link className="beds-preview" to={`/beds/${bed.id}`} key={bed.id}>
          <article key={bed.id}>
            <h2>{bed.name}</h2>
            <p>
              ({bed.cellsX} x {bed.cellsY})
            </p>

            <button
              className="btn btn-inline outline"
              type="button"
              onClick={(e) => {
                deleteBed(bed.id);
                e.preventDefault();
              }}
            >
              Delete
            </button>
          </article>
        </Link>
      ))}
    </div>
  );
}
