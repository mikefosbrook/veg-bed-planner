import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cell from './Cell';
import VegSelect from './VegSelect';

export default function Bed() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetch(`http://localhost:4000/beds/${id}`);
  const [bedData, setBedData] = useState(null);
  const [currentVeg, setCurrentVeg] = useState('');
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    if (data) {
      setBedData(data);
    }
  }, [data]);

  const updateCell = (index) => {
    if (currentVeg === '') {
      alert('Please select a vegetable');
      return;
    }
    let newBedData = { ...bedData };
    newBedData.cells[index].vegetable = currentVeg;
    setBedData(newBedData);
    setIsSaved(false);
  };

  const deleteBed = async (id) => {
    await fetch(`http://localhost:4000/beds/${id}`, {
      method: 'DELETE',
    });
    navigate('/');
  };

  const saveBed = async (id) => {
    try {
      await fetch(`http://localhost:4000/beds/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bedData),
      });
      setIsSaved(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}

      <button onClick={() => saveBed(id)} disabled={isSaved}>
        Save
      </button>

      <VegSelect veg={currentVeg} setCurrentVeg={setCurrentVeg} />
      {bedData && (
        <>
          <h2>{bedData.name}</h2>

          <p>
            {bedData.cellsX} x {bedData.cellsY}
          </p>

          <div className="bed" style={{ gridTemplateColumns: 'auto '.repeat(bedData.cellsX) }}>
            {bedData.cells.map((cell, i) => {
              return (
                <Cell
                  name={cell.name}
                  id={cell.id}
                  key={cell.id}
                  index={i}
                  vegetable={cell.vegetable}
                  updateCell={updateCell}
                ></Cell>
              );
            })}
          </div>

          <button
            onClick={() => {
              deleteBed(id);
            }}
          >
            Delete
          </button>
        </>
      )}
    </>
  );
}
