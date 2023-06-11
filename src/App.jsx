import { useState } from 'react';
import './App.scss';
import Bed from './components/Bed.jsx';
import CreateBed from './components/CreateBed';

function App() {
  return (
    <>
      <h1>Veg bed planner</h1>
      {/* <Bed /> */}
      <CreateBed />
    </>
  );
}

export default App;
