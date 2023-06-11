import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';

export default function Bed() {
  const { id } = useParams();

  const { data: bedDetails, isLoading, error } = useFetch(`http://localhost:4000/beds/${id}`);

  return (
    <>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}

      {bedDetails && (
        <>
          <h2>{bedDetails.name}</h2>

          <p>
            {bedDetails.cellsX} x {bedDetails.cellsY}
          </p>

          <div className="bed" style={{ gridTemplateColumns: 'auto '.repeat(bedDetails.cellsX) }}>
            {bedDetails.cells.map((cell, i) => {
              return <div className="cell" key={i}></div>;
            })}
          </div>
        </>
      )}
    </>
  );
}
