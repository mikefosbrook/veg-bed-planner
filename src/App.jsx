import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { BedsProvider } from './contexts/Beds';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home/Home';
import AddBed from './pages/AddBed/AddBed';
import Bed from './pages/Bed/Bed';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <>
      <BedsProvider ContextProvider>
        <header>
          <Navigation />
        </header>
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-bed" element={<AddBed />} />
            <Route path="/beds/:id" element={<Bed />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BedsProvider>
    </>
  );
}

export default App;
