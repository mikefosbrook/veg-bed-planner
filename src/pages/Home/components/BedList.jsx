import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import allActions from '../../../actions';

export default function BedList({ beds }) {
  const dispatchBeds = useDispatch();

  return (
    <div className="bed-list">
      {beds.map((bed) => (
        <Link className="beds-preview" to={`/beds/${bed.id}`} key={bed.id}>
          <article key={bed.id}>
            <h1>{bed.name}</h1>
            <p>
              ({bed.cellsX} x {bed.cellsY})
            </p>

            <button
              className="btn btn-inline outline align-right"
              type="button"
              onClick={(e) => {
                dispatchBeds(allActions.bedActions.deleteBed(bed.id));
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
