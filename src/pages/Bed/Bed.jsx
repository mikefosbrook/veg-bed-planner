import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cell from './components/Cell';
import VegSelect from './components/VegSelect';
import { useBedsState } from '../../contexts/Beds/index';
import { getBeds, deleteBed, updateBed } from '../../contexts/Beds/actions';
import { useBedsDispatch } from '../../contexts/Beds/context';

export default function Bed() {
  const { id } = useParams();
  const bedId = parseInt(id);
  const navigate = useNavigate();
  const dispatchBeds = useBedsDispatch();
  const { beds: bedData, loading, error } = useBedsState();
  const [currentBed, setCurrentBed] = useState('');
  const [currentVeg, setCurrentVeg] = useState('');
  const [isSaved, setIsSaved] = useState(true);
  const [selectedCells, setSelectedCells] = useState([]);

  useEffect(() => {
    //only run if we don't already have data in context (if you land on this page directly)
    if (bedData.length === 0) {
      getBeds(dispatchBeds);
    }
  }, [bedData, dispatchBeds]);

  useEffect(() => {
    const getBed = (bedId) => {
      return bedData.find((bed) => bed.id === bedId);
    };
    const currentBedData = getBed(bedId);

    if (currentBedData && currentBed === '') {
      setCurrentBed(currentBedData);
    }
    if (!currentBedData && currentBed === '') {
      navigate('/404');
    }
  }, [bedData, bedId, navigate, currentBed]);

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
    await deleteBed(dispatchBeds, bedId);
    navigate('/');
  };

  const saveBed = async () => {
    await updateBed(dispatchBeds, bedId, currentBed);
    setIsSaved(true);
  };

  return (
    <>
      {error && <div>Error: {error.message}</div>}
      {loading && <div>Loading...</div>}

      <button onClick={() => saveBed()} disabled={isSaved}>
        {loading ? 'Saving...' : 'Save'}
      </button>

      <VegSelect veg={currentVeg} setCurrentVeg={setCurrentVeg} />

      <div className="grid">
        <button
          onClick={() => {
            addVeg(currentVeg);
          }}
          disabled={!selectedCells.length || !currentVeg}
        >
          Apply selection
        </button>

        <button onClick={removeVeg} disabled={!selectedCells.length}>
          Clear selection
        </button>
      </div>

      {currentBed && (
        <>
          <h1 className="collapse-margin">{currentBed.name}</h1>

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
