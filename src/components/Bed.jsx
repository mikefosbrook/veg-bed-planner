import { useState, useEffect } from 'react';

export default function Bed() {
  const [bedDetails, setBedDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/beds/1')
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setBedDetails(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, []);

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
