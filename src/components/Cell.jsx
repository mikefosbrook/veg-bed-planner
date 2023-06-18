import { useState } from 'react';

export default function Cell(props) {
  const { id, name, vegetable, index, updateCell } = props;
  const [isSelected, setSelected] = useState(false);

  const handleClick = () => {
    updateCell(index);
    setSelected(!isSelected);
  };

  return (
    <div
      onClick={handleClick}
      className={`cell cell-${id} ${isSelected ? 'cell-selected' : ''}`}
      data-cell-name={name}
      data-vegetable={vegetable}
    >
      {vegetable}
    </div>
  );
}
