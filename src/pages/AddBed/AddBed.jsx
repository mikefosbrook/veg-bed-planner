import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../actions';

export default function AddBed() {
  const { recentBed, beds: bedData, loading, error } = useSelector((state) => state.beds);
  const [name, setName] = useState('');
  const [cellsX, setCellsX] = useState(1);
  const [cellsY, setCellsY] = useState(1);
  const navigate = useNavigate();
  const dispatchBeds = useDispatch();

  useEffect(() => {
    if (recentBed) {
      const newBed = { ...recentBed };
      dispatchBeds({ type: 'CLEAR_RECENT_BED' });
      navigate(`/beds/${newBed.id}`);
    } else if (!bedData) {
      dispatchBeds(allActions.bedActions.getBeds());
    }
  }, [bedData, recentBed, dispatchBeds, navigate]);

  const createCells = (x, y) => {
    const cells = x * y;
    const emptyCells = [];
    for (let i = 1; i <= cells; i++) {
      let cell = {
        id: i,
        name: `Cell ${i}`,
      };
      emptyCells.push(cell);
    }
    return emptyCells;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bed = {
      name,
      cellsX,
      cellsY,
      cells: createCells(cellsX, cellsY),
    };

    dispatchBeds(allActions.bedActions.createBed(bed));

    // navigate to the new bed is handled by useEffect above
  };

  return (
    <>
      {error && <div>Error: {error.message}</div>}
      {loading && <div>Loading...</div>}

      <h1>Add a new bed</h1>
      {bedData && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="grid">
            <label htmlFor="x">
              Squares across
              <input
                type="number"
                id="x"
                name="x"
                min="1"
                max="12"
                value={cellsX}
                onChange={(e) => setCellsX(e.target.value)}
              />
            </label>
            <label htmlFor="y">
              Squares down
              <input
                type="number"
                id="y"
                name="y"
                min="1"
                max="12"
                value={cellsY}
                onChange={(e) => setCellsY(e.target.value)}
              />
            </label>
          </div>
          <input
            type="submit"
            value={loading ? 'Creating bed...' : 'Create bed'}
            disabled={name == '' ? true : false}
          />
        </form>
      )}
    </>
  );
}
