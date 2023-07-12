export default function Cell(props) {
  const { id, name, vegetable, index, isSelected, selectCells } = props;

  const handleClick = () => {
    selectCells(index);
  };

  return (
    <div
      className={`cell cell-${id} icon-${vegetable} ${isSelected ? 'cell-selected' : ''}`}
      data-cell-name={name}
      data-vegetable={vegetable}
      role="gridcell"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleClick();
        }
      }}
    ></div>
  );
}
