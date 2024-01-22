import { Route, Routes } from 'react-router-dom';
import Final from './Final';
import Header from './Header';
import Intro from './Intro';
import ObjData from './ObjData';
import SystData from './SystData';
import WallData from './WallData';
import React, { useState } from 'react';
import BracketData from './BracketData';
import Calculator from './Calculator';
import CoverData from './CoverData';

export default function App(props) {
  const [arrayType, setArrayType] = useState('windows');
  const [bracketPcs, setBracketPcs] = useState('');
  const [brickAir, setBrickAir] = useState('');
  const [brickArea, setBrickArea] = useState('');
  const [brickDensity, setBrickDensity] = useState('');
  const [brickHeat, setBrickHeat] = useState('');
  const [brickThickness, setBrickThickness] = useState('');
  const [brickVapor, setBrickVapor] = useState('');
  const [buildingAim, setBuildingAim] = useState('');
  const [buildingType, setBuildingType] = useState('1');
  const [calcResult, setCalcResult] = useState('');
  const [cityProp, setCityProp] = useState('');
  const [concreteArea, setConcreteArea] = useState('');
  const [concreteDensity, setConcreteDensity] = useState('');
  const [concreteHeat, setConcreteHeat] = useState('');
  const [concreteSpHeat, setConcreteSpHeat] = useState('');
  const [concreteThickness, setConcreteThickness] = useState('');
  const [concreteVapor, setConcreteVapor] = useState('');
  const [concreteAir, setConcreteAir] = useState('');
  const [gribDepth, setGribDepth] = useState('');
  const [gribPcs, setGribPcs] = useState('');
  const [firstInsulation, setFirstInsulation] = useState(true);
  const [innerHumidity, setInnerHumidity] = useState(50);
  const [innerTemp, setInnerTemp] = useState(20);
  const [insAir, setInsAir] = useState('');
  const [insDensity, setInsDensity] = useState('');
  const [insHeat, setInsHeat] = useState('');
  const [insThickness, setInsThickness] = useState('');
  const [insVapor, setInsVapor] = useState('');
  const [mr, setMr] = useState(0.63);
  const [ownCover, setOwnCover] = useState(false);
  const [secondInsulation, setSecondInsulation] = useState(false);
  const [secondInsAir, setSecondInsAir] = useState('');
  const [secondInsDensity, setSecondInsDensity] = useState('');
  const [secondInsHeat, setSecondInsHeat] = useState('');
  const [secondInsThickness, setSecondInsThickness] = useState('');
  const [secondInsVapor, setSecondInsVapor] = useState('');
  const [windowLength, setWindowLength] = useState('');
  const [windowHeatLoss, setWindowHeatLoss] = useState('');

  function handleAddFirstInsulation() {
    setFirstInsulation(true);
  }
  function handleAddSecondInsulation() {
    setSecondInsulation(true);
  }
  function handleDeleteFirstInsulation() {
    setFirstInsulation(false);
  }
  function handleDeleteSecondInsulation() {
    setSecondInsulation(false);
  }
  function handleTemp(changeEvent) {
    setInnerTemp(changeEvent.target.value);
  }
  function handleHumidity(changeEvent) {
    setInnerHumidity(changeEvent.target.value);
  }
  function handleCityProp(item) {
    setCityProp(item);
  }
  function handleBuildingAim(changeEvent) {
    setBuildingAim(changeEvent.target.value);
  }
  function handleBuildingType(changeEvent) {
    setBuildingType(changeEvent.target.value);
  }
  function handleMr(changeEvent) {
    setMr(changeEvent.target.value);
  }
  function handleConcreteThickness(changeEvent) {
    setConcreteThickness(changeEvent.target.value);
  }
  function handleConcreteDensity(changeEvent) {
    setConcreteDensity(changeEvent.target.value);
  }
  function handleConcreteHeat(changeEvent) {
    setConcreteHeat(changeEvent.target.value);
  }
  function handleConcreteVapor(changeEvent) {
    setConcreteVapor(changeEvent.target.value);
  }
  function handleConcreteAir(changeEvent) {
    setConcreteAir(changeEvent.target.value);
  }

  function handleBrickThickness(changeEvent) {
    setBrickThickness(changeEvent.target.value);
  }
  function handleBrickDensity(changeEvent) {
    setBrickDensity(changeEvent.target.value);
  }
  function handleBrickHeat(changeEvent) {
    setBrickHeat(changeEvent.target.value);
  }
  function handleBrickVapor(changeEvent) {
    setBrickVapor(changeEvent.target.value);
  }
  function handleBrickAir(changeEvent) {
    setBrickAir(changeEvent.target.value);
  }

  function handleInsThickness(changeEvent) {
    setInsThickness(changeEvent.target.value);
  }
  function handleInsDensity(changeEvent) {
    setInsDensity(changeEvent.target.value);
  }
  function handleInsHeat(changeEvent) {
    setInsHeat(changeEvent.target.value);
  }
  function handleInsVapor(changeEvent) {
    setInsVapor(changeEvent.target.value);
  }
  function handleInsAir(changeEvent) {
    setInsAir(changeEvent.target.value);
  }

  function handleSecondInsThickness(changeEvent) {
    setSecondInsThickness(changeEvent.target.value);
  }
  function handleSecondInsDensity(changeEvent) {
    setSecondInsDensity(changeEvent.target.value);
  }
  function handleSecondInsHeat(changeEvent) {
    setSecondInsHeat(changeEvent.target.value);
  }
  function handleSecondInsVapor(changeEvent) {
    setSecondInsVapor(changeEvent.target.value);
  }
  function handleSecondInsAir(changeEvent) {
    setSecondInsAir(changeEvent.target.value);
  }
  function handleConcreteSpHeat() {
    setConcreteSpHeat(cityProp.s == 'А' ? 1.72 : 2.04);
  }
  function handleWindowLength(changeEvent) {
    setWindowLength(changeEvent.target.value);
  }
  function handleBrickArea(changeEvent) {
    setBrickArea(changeEvent.target.value);
  }

  function handleConcreteArea(changeEvent) {
    setConcreteArea(changeEvent.target.value);
  }

  function handleCalcResult(value) {
    setCalcResult(value);
  }
  function handleWindowHeatLoss(value) {
    setWindowHeatLoss(value);
  }

  function handleArrayTypeWindow() {
    setArrayType('windows');
  }
  function handleArrayTypeBracket() {
    setArrayType('bracketData');
  }

  function handleBracketPcs(value) {
    setBracketPcs(value);
  }

  function handleGribDepth(changeEvent) {
    setGribDepth(changeEvent.target.value);
  }
  function handleGribPcs(changeEvent) {
    setGribPcs(changeEvent.target.value);
  }
  const handleOwnCover = () => setOwnCover((value) => !value);

  const heatTemp = buildingAim == 2 ? cityProp.t10 : cityProp.t8;
  const heatLength = buildingAim == 2 ? cityProp.z10 : cityProp.z8;

  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path="/" element={<Intro />}></Route>
        <Route
          path="/objdata"
          element={
            <ObjData
              onTemp={handleTemp}
              onHumidity={handleHumidity}
              isTemp={innerTemp}
              isHumidity={innerHumidity}
              onCityProp={handleCityProp}
              onBuildingAim={handleBuildingAim}
              isBuildingType={buildingType}
              onBuildingType={handleBuildingType}
              isHeatTemp={heatTemp}
              isHeatLength={heatLength}
              onMr={handleMr}
              onConcreteSpHeat={handleConcreteSpHeat}
            />
          }
        ></Route>
        <Route
          path="/walldata"
          element={
            <WallData
              onAddFirstLayer={handleAddFirstInsulation}
              onAddSecondLayer={handleAddSecondInsulation}
              onDeleteFirstLayer={handleDeleteFirstInsulation}
              onDeleteSecondLayer={handleDeleteSecondInsulation}
              isSecondLayer={secondInsulation}
              isFirstLayer={firstInsulation}
              isBuildingType={buildingType}
              onConcreteThickness={handleConcreteThickness}
              onConcreteDensity={handleConcreteDensity}
              onConcreteHeat={handleConcreteHeat}
              onConcreteVapor={handleConcreteVapor}
              onConcreteAir={handleConcreteAir}
              onBrickThickness={handleBrickThickness}
              onBrickDensity={handleBrickDensity}
              onBrickHeat={handleBrickHeat}
              onBrickVapor={handleBrickVapor}
              onBrickAir={handleBrickAir}
              onInsThickness={handleInsThickness}
              onInsDensity={handleInsDensity}
              onInsHeat={handleInsHeat}
              onInsVapor={handleInsVapor}
              onInsAir={handleInsAir}
              onSecondInsThickness={handleSecondInsThickness}
              onSecondInsDensity={handleSecondInsDensity}
              onSecondInsHeat={handleSecondInsHeat}
              onSecondInsVapor={handleSecondInsVapor}
              onSecondInsAir={handleSecondInsAir}
              isConcreteSpHeat={concreteSpHeat}
              onConcreteSpHeat={handleConcreteSpHeat}
            />
          }
        ></Route>
        <Route
          path="/systdata"
          element={
            <SystData
              onWindowLength={handleWindowLength}
              onBrickArea={handleBrickArea}
              onConcreteArea={handleConcreteArea}
              onGribDepth={handleGribDepth}
              onGribPcs={handleGribPcs}
              onWindowType={handleArrayTypeWindow}
              isArrayType={arrayType}
              onWindowHeatLoss={handleWindowHeatLoss}
            />
          }
        ></Route>
        <Route
          path="/bracketdata"
          element={
            <BracketData
              isArrayType={arrayType}
              onBracketType={handleArrayTypeBracket}
              onBracketPcs={handleBracketPcs}
              isBracketResult={calcResult}
              onCalcResult={handleCalcResult}
            />
          }
        ></Route>
        <Route path="/coverdata" element={<CoverData onOwnCover={handleOwnCover} isOwnCover={ownCover} />}></Route>
        <Route path="/final" element={<Final />}></Route>
      </Routes>
      <Calculator
        isBracketPcs={bracketPcs}
        isBrickArea={brickArea}
        isBrickThickness={brickThickness}
        isBrickDensity={brickDensity}
        isBrickHeat={brickHeat}
        isBrickVapor={brickVapor}
        isBrickAir={brickAir}
        isBuildingAim={buildingAim}
        isHeatLength={heatLength}
        isHeatTemp={heatTemp}
        isInnerHumidity={innerHumidity}
        isInnerTemp={innerTemp}
        isConcreteAir={concreteAir}
        isConcreteArea={concreteArea}
        isConcreteDensity={concreteDensity}
        isConcreteHeat={concreteHeat}
        isConcreteThickness={concreteThickness}
        isConcreteSpHeat={concreteSpHeat}
        isConcreteVapor={concreteVapor}
        isCityProp={cityProp}
        isGribDepth={gribDepth}
        isGribPcs={gribPcs}
        isInsThickness={insThickness}
        isInsDensity={insDensity}
        isInsHeat={insHeat}
        isInsVapor={insVapor}
        isInsAir={insAir}
        isMr={mr}
        isSecondIns={secondInsulation}
        isSecondInsAir={secondInsAir}
        isSecondInsThickness={secondInsThickness}
        isSecondInsDensity={secondInsDensity}
        isSecondInsHeat={secondInsHeat}
        isSecondInsVapor={secondInsVapor}
        isWindowLength={windowLength}
        isWindowHeatLoss={windowHeatLoss}
      />
    </div>
  );
}
