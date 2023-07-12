export default function VegSelect(props) {
  const { veg, setCurrentVeg } = props;

  const handleChange = (e) => {
    setCurrentVeg(e.target.value);
  };

  const vegList = [
    { name: 'Beetroot', value: 'beetroot' },
    { name: 'Carrot', value: 'carrot' },
    { name: 'Courgette', value: 'courgette' },
    { name: 'Kale', value: 'kale' },
    { name: 'Leek', value: 'leek' },
    { name: 'Lettuce', value: 'lettuce' },
    { name: 'Onion', value: 'onion' },
    { name: 'Pepper', value: 'pepper' },
    { name: 'Potato', value: 'potato' },
    { name: 'Radish', value: 'radish' },
    { name: 'Tomato', value: 'tomato' },
  ];

  return (
    <select value={veg} onChange={handleChange}>
      <option value="">Select a vegetable</option>
      {vegList.map((v) => {
        return (
          <option key={v.value} value={v.value}>
            {v.name}
          </option>
        );
      })}
    </select>
  );
}
