export default function Cell(props) {
  const { id, name, vegetable, index, isSelected, selectCells } = props;

  const handleClick = () => {
    selectCells(index);
  };

  return (
    <div
      onClick={handleClick}
      className={`cell cell-${id} icon-${vegetable} ${isSelected ? 'cell-selected' : ''}`}
      data-cell-name={name}
      data-vegetable={vegetable}
      role="gridcell"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleClick();
        }
      }}
    ></div>
  );
}
