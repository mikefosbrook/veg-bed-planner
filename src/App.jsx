import './App.scss';
import Home from './components/Home.jsx';
import Bed from './components/Bed.jsx';
import NotFound from './components/NotFound.jsx';
import CreateBed from './components/CreateBed';
import { Routes, Route, NavLink } from 'react-router-dom';

function App() {
  return (
    <>
      <header>
        <nav className="container-fluid">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/create-bed">Add bed</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container">
        <h1>Veg bed planner</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-bed" element={<CreateBed />} />
          <Route path="/beds/:id" element={<Bed />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
