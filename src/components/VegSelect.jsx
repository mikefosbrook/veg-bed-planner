export default function VegSelect(props) {
  const { veg, setCurrentVeg } = props;

  const handleChange = (e) => {
    setCurrentVeg(e.target.value);
  };

  const vegList = ['Carrot', 'Cucumber', 'Lettuce', 'Onion', 'Pepper', 'Potato', 'Radish', 'Tomato'];

  return (
    <select value={veg} onChange={handleChange}>
      <option value="">Select a vegetable</option>
      {vegList.map((v) => {
        return (
          <option key={v} value={v}>
            {v}
          </option>
        );
      })}
    </select>
  );
}
