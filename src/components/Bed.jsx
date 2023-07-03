import useFetch from '../hooks/useFetch';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cell from './Cell';
import VegSelect from './VegSelect';

export default function Bed() {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_HOST = import.meta.env.VITE_API_HOST;
  const { data, isLoading, error, fetchRequest } = useFetch(`${API_HOST}/beds/${id}`);
  const [bedData, setBedData] = useState(null);
  const [currentVeg, setCurrentVeg] = useState('');
  const [isSaved, setIsSaved] = useState(true);
  const [selectedCells, setSelectedCells] = useState([]);

  if (data && !bedData) {
    // this is the first time we have data
    setBedData(data);
  }

  const selectCells = (index) => {
    let newSelectedCells = [...selectedCells];
    if (newSelectedCells.includes(index)) {
      newSelectedCells = newSelectedCells.filter((i) => i !== index);
    } else {
      newSelectedCells.push(index);
    }
    setSelectedCells(newSelectedCells);
  };

  const addVeg = (veg) => {
    if (veg === '') {
      alert('Please select a vegetable');
      return;
    }
    updateCells(veg);
  };

  const removeVeg = () => {
    updateCells('');
  };

  const updateCells = (value) => {
    let newBedData = { ...bedData };

    selectedCells.forEach((i) => {
      newBedData.cells[i].vegetable = value;
    });

    setBedData(newBedData);
    setSelectedCells([]);
    setIsSaved(false);
  };

  const deleteBed = () => {
    fetchRequest(
      `${API_HOST}/beds/${id}`,
      {
        method: 'DELETE',
      },
      () => {
        navigate('/');
      },
    );
  };

  const saveBed = () => {
    fetchRequest(
      `${API_HOST}/beds/${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bedData),
      },
      () => {
        setIsSaved(true);
      },
    );
  };

  return (
    <>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}

      <button onClick={() => saveBed()} disabled={isSaved}>
        Save
      </button>

      <VegSelect veg={currentVeg} setCurrentVeg={setCurrentVeg} />

      <button
        onClick={() => {
          addVeg(currentVeg);
        }}
        disabled={!selectedCells.length}
      >
        Apply selection
      </button>

      <button onClick={removeVeg} disabled={!selectedCells.length}>
        Clear selection
      </button>

      {bedData && (
        <>
          <h2>{bedData.name}</h2>

          <p>
            {bedData.cellsX} x {bedData.cellsY}
          </p>

          <div className="bed-container">
            <div className="bed" style={{ gridTemplateColumns: 'auto '.repeat(bedData.cellsX) }}>
              {bedData.cells.map((cell, i) => {
                return (
                  <Cell
                    name={cell.name}
                    id={cell.id}
                    key={cell.id}
                    index={i}
                    vegetable={cell.vegetable}
                    selectCells={selectCells}
                    isSelected={selectedCells.includes(i)}
                  ></Cell>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => {
              deleteBed();
            }}
          >
            Delete bed
          </button>
        </>
      )}
    </>
  );
}
