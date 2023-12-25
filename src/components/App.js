import { Route, Routes } from 'react-router-dom';
import Final from './Final';
import Header from './Header';
import Intro from './Intro';
import ObjData from './ObjData';
import SystData from './SystData';
import WallData from './WallData';
import React, { useState } from 'react';
import SecondLayer from './SecondLayer';

export default function App() {
  const [secondInsulation, setSecondInsulation] = useState(false);

  function handleAddInsulation() {
    setSecondInsulation(true);
  }

  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path="/" element={<Intro />}></Route>
        <Route path="/objdata" element={<ObjData />}></Route>
        <Route
          path="/walldata"
          element={<WallData onAdd={handleAddInsulation} isSecondLayer={secondInsulation} />}
        ></Route>
        <Route path="/systdata" element={<SystData />}></Route>
        <Route path="/final" element={<Final />}></Route>
      </Routes>
    </div>
  );
}
