import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBedsState } from '../context/beds/index';

export default function CreateBed() {
  const { beds: bedData, loading, error } = useBedsState();
  const API_HOST = import.meta.env.VITE_API_HOST;
  const [name, setName] = useState('');
  const [cellsX, setCellsX] = useState(1);
  const [cellsY, setCellsY] = useState(1);
  const navigate = useNavigate();

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

  const createBed = async (bed) => {
    await fetch(`${API_HOST}/beds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bed),
    });
    navigate(`/beds/${bedData.id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bed = {
      name,
      cellsX,
      cellsY,
      cells: createCells(cellsX, cellsY),
    };

    createBed(bed);
  };

  return (
    <>
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}

      <h2>Create a new bed</h2>
      {bedData && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="x">Number of squares across</label>
          <input
            type="number"
            id="x"
            name="x"
            min="1"
            max="12"
            value={cellsX}
            onChange={(e) => setCellsX(e.target.value)}
          />
          <label htmlFor="y">Number of squares down</label>
          <input
            type="number"
            id="y"
            name="y"
            min="1"
            max="12"
            value={cellsY}
            onChange={(e) => setCellsY(e.target.value)}
          />
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
