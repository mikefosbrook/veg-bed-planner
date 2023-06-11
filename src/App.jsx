import './App.scss';
import Home from './components/Home.jsx';
import Bed from './components/Bed.jsx';
import NotFound from './components/NotFound.jsx';
import CreateBed from './components/CreateBed';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <h1>Veg bed planner</h1>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-bed" element={<CreateBed />} />
          <Route path="/beds/:id" element={<Bed />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
