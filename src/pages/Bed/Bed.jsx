import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cell from './components/Cell';
import VegSelect from './components/VegSelect';
import { useBedsState } from '../../contexts/Beds/index';
import { getBeds, deleteBed, updateBed } from '../../contexts/Beds/actions';
import { useBedsDispatch } from '../../contexts/Beds/context';

export default function Bed() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatchBeds = useBedsDispatch();
  const { beds: bedData, loading, error } = useBedsState();
  const [currentBed, setCurrentBed] = useState('');
  const [currentVeg, setCurrentVeg] = useState('');
  const [isSaved, setIsSaved] = useState(true);
  const [selectedCells, setSelectedCells] = useState([]);

  useEffect(() => {
    //only run if we don't already have data in context
    if (bedData.length === 0) {
      console.log('getting beds');
      getBeds(dispatchBeds);
    }
  }, [bedData, dispatchBeds]);

  useEffect(() => {
    const getBed = (id) => {
      id = parseInt(id);
      return bedData.find((bed) => bed.id === id);
    };

    console.log('setCurrentBed', id);

    //check the bed id exists before setting the current bed
    if (bedData.length > 0) {
      setCurrentBed(getBed(id));
    }
  }, [bedData, id]);

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
    let newBedData = { ...currentBed };

    selectedCells.forEach((i) => {
      newBedData.cells[i].vegetable = value;
    });

    dispatchBeds({
      type: 'UPDATE_BED',
      payload: newBedData,
    });

    setSelectedCells([]);
    setIsSaved(false);
  };

  const removeBed = async () => {
    await deleteBed(dispatchBeds, id);
    // dispatchBeds({
    //   type: 'DELETE_BED',
    //   payload: id,
    // });

    navigate('/');
  };

  const saveBed = async () => {
    await updateBed(dispatchBeds, id, currentBed);
    setIsSaved(true);
  };

  return (
    <>
      {error && <div>{error.message}</div>}
      {loading && <div>Loading...</div>}

      <button onClick={() => saveBed()} disabled={isSaved}>
        {loading ? 'Saving...' : 'Save'}
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

      {currentBed && (
        <>
          <h2>{currentBed.name}</h2>

          <p>
            {currentBed.cellsX} x {currentBed.cellsY}
          </p>

          <div className="bed-container">
            <div className="bed" role="grid" style={{ gridTemplateColumns: 'auto '.repeat(currentBed.cellsX) }}>
              {currentBed.cells.map((cell, i) => {
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
              removeBed();
            }}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </>
      )}
    </>
  );
}