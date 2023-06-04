import { useState, useEffect } from 'react';

export default function Bed() {
  const defaultBed = {
    id: 1,
    name: 'Bed 1',
    cellsX: 6,
    cellsY: 4,
  };
  const [bedDetails, setBedDetails] = useState(defaultBed);
  const [bedCells, setBedCells] = useState([]);

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

  useEffect(() => {
    setBedCells(createCells(bedDetails.cellsX, bedDetails.cellsY));
  }, [bedDetails]);

  const styles = { gridTemplateColumns: 'auto '.repeat(bedDetails.cellsX) };

  return (
    <>
      <h2>{bedDetails.name}</h2>
      <p>
        {bedDetails.cellsX} x {bedDetails.cellsY}
      </p>
      <div className="bed" style={styles}>
        {bedCells.map((cell, i) => {
          return <div className="cell" key={i}></div>;
        })}
      </div>
    </>
  );
}
