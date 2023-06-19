import { useState } from 'react';

export default function Cell(props) {
  const { id, name, vegetable, index, isSelected, selectCells } = props;

  const handleClick = () => {
    selectCells(index);
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
