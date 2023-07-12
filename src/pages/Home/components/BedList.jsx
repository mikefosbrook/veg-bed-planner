import { Link } from 'react-router-dom';
import { useBedsDispatch } from '../../../contexts/Beds/context';
import { deleteBed } from '../../../contexts/Beds/actions';

export default function BedList({ beds }) {
  const dispatchBeds = useBedsDispatch();

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
                deleteBed(dispatchBeds, bed.id);
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
