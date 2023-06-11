import './App.scss';
import Bed from './components/Bed.jsx';
import CreateBed from './components/CreateBed';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <h1>Veg bed planner</h1>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateBed />} />
          <Route path="/beds/:id" element={<Bed />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
