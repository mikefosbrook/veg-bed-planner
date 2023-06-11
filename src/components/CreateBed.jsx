import { useState } from 'react';

export default function CreateBed() {
  const [name, setName] = useState('');
  const [cellsX, setCellsX] = useState(1);
  const [cellsY, setCellsY] = useState(1);

  function createCells(x, y) {
    const cells = x * y;
    const emptyCells = [];
    for (let i = 1; i <= cells; i++) {
      let cell = {
        id: i,
        name: `Cell '${i}`,
      };
      emptyCells.push(cell);
    }
    return emptyCells;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const bed = {
      name,
      cellsX,
      cellsY,
      cells: createCells(cellsX, cellsY),
    };
    console.log(bed);
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
        <input type="submit" value="Create" disabled={name == '' ? true : false} />
      </form>
    </>
  );
}
