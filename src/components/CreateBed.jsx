import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateBed() {
  const [name, setName] = useState('');
  const [cellsX, setCellsX] = useState(1);
  const [cellsY, setCellsY] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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
    try {
      const res = await fetch('http://localhost:4000/beds/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bed),
      });
      setIsLoading(false);
      const data = await res.json();
      const id = data.id;
      navigate(`/beds/${id}`);
    } catch (err) {
      throw Error('Could not fetch the data for that resource');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      <h2>Create a new bed</h2>
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
          value={isLoading ? 'Creating bed...' : 'Create bed'}
          disabled={name == '' ? true : false}
        />
      </form>
    </>
  );
}
