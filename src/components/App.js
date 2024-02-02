import { Route, Routes } from 'react-router-dom';
import Final from './Final';
import Header from './Header';
import ObjData from './ObjData';
import SystData from './SystData';
import WallData from './WallData';
import React, { useState } from 'react';
import BracketData from './BracketData';
import Calculator from './Calculator';
import CoverData from './CoverData';
import { FormDataProvider } from '../contexts/FormContext';

export default function App(props) {
  const [bracketResult, setBracketResult] = useState({});
  const [brickAir, setBrickAir] = useState(1);
  const [brickArea, setBrickArea] = useState(1);
  const [brickDensity, setBrickDensity] = useState(1);
  const [brickHeat, setBrickHeat] = useState(0.81);
  const [brickThickness, setBrickThickness] = useState(0.1);
  const [brickVapor, setBrickVapor] = useState(1);
  const [buildingAim, setBuildingAim] = useState(1);
  const [buildingType, setBuildingType] = useState(1);

  const [cityProp, setCityProp] = useState({
    c: 'Москва',
    t: -26,
    tm: -7.8,
    z8: 204,
    t8: -2.2,
    z10: 222,
    t10: -1.3,
    w: 84,
    vm: 2,
    v: 1.8,
    s: 'Б',
  });
  const [cityValue, setCityValue] = useState(1);
  const [concreteAir, setConcreteAir] = useState(1);
  const [concreteArea, setConcreteArea] = useState(1);
  const [concreteDensity, setConcreteDensity] = useState(1);
  const [concreteHeat, setConcreteHeat] = useState(2.04);
  const [concreteSpHeat, setConcreteSpHeat] = useState(2.04);
  const [concreteThickness, setConcreteThickness] = useState(0.1);
  const [concreteVapor, setConcreteVapor] = useState(1);
  const [concreteWall, setConcreteWall] = useState(false);
  const [coverData, setCoverData] = useState({ r: 0.001, c: 0.05, l: 221 });
  const [coverHeat, setCoverHeat] = useState(1);
  const [coverThickness, setCoverThickness] = useState(1);
  const [eGap, setEgap] = useState();
  const [gObl, setGobl] = useState();
  const [gU, setGu] = useState();
  const [gribDepth, setGribDepth] = useState(1);
  const [gribPcs, setGribPcs] = useState(1);
  const [height, setHeight] = useState(20);
  const [humidity, setHumidity] = useState(50);
  const [innerTemp, setInnerTemp] = useState(20);
  const [insAir, setInsAir] = useState('');
  const [insDensity, setInsDensity] = useState(1);
  const [insHeat, setInsHeat] = useState(0.05);
  const [insThickness, setInsThickness] = useState(0.1);
  const [insVapor, setInsVapor] = useState(1);
  const [mr, setMr] = useState(0.63);
  const [ownCover, setOwnCover] = useState(false);
  const [secondLayer, setSecondLayer] = useState(false);
  const [secondInsAir, setSecondInsAir] = useState(1);
  const [secondInsDensity, setSecondInsDensity] = useState(1);
  const [secondInsHeat, setSecondInsHeat] = useState(0.05);
  const [secondInsThickness, setSecondInsThickness] = useState(0.1);
  const [secondInsVapor, setSecondInsVapor] = useState(1);
  const [vaporMembraneR, setVaporMembraneR] = useState(0.1);
  const [ventHeight, setVentHeight] = useState(20);
  const [ventIn, setVentIn] = useState(0.02);
  const [ventMed, setVentMed] = useState(0.02);
  const [ventOut, setVentOut] = useState(0.02);
  const [windMembraneR, setWindMembraneR] = useState(0.1);
  const [windowLength, setWindowLength] = useState(1);
  const [windowHeatLoss, setWindowHeatLoss] = useState(1);
  const [windowHeight, setWindowHeight] = useState('1');
  const [windowDepth, setWindowDepth] = useState('1');

  function handleAddSecondLayer() {
    setSecondLayer(true);
  }
  function handleBracketResult({ index, value, bracket, pcs, type, weight, wall }) {
    setBracketResult((prevBracketResult) => ({
      ...prevBracketResult,
      [index]: { value, bracket, pcs, type, weight, wall },
    }));
  }
  function handleBrickAir(changeEvent) {
    setBrickAir(changeEvent.target.value);
  }
  function handleBrickArea(changeEvent) {
    setBrickArea(changeEvent.target.value);
  }
  function handleBrickDensity(changeEvent) {
    setBrickDensity(changeEvent.target.value);
  }
  function handleBrickHeat(changeEvent) {
    setBrickHeat(changeEvent.target.value);
  }
  function handleBrickThickness(changeEvent) {
    setBrickThickness(changeEvent.target.value * 0.001);
  }
  function handleBrickVapor(changeEvent) {
    setBrickVapor(changeEvent.target.value);
  }
  function handleBuildingAim(changeEvent) {
    setBuildingAim(changeEvent.target.value);
  }
  function handleBuildingType(changeEvent) {
    setBuildingType(changeEvent.target.value);
  }
  function handleCityValue(changeEvent) {
    setCityValue(changeEvent.target.value);
  }
  function handleConcreteAir(changeEvent) {
    setConcreteAir(changeEvent.target.value);
  }
  function handleConcreteArea(changeEvent) {
    setConcreteArea(changeEvent.target.value);
  }
  function handleConcreteDensity(changeEvent) {
    setConcreteDensity(changeEvent.target.value);
  }
  function handleConcreteHeat(changeEvent) {
    setConcreteHeat(changeEvent.target.value);
  }

  function handleConcreteSpHeat() {
    setConcreteSpHeat(cityProp.s === 'А' ? 1.72 : 2.04);
  }
  function handleConcreteThickness(changeEvent) {
    setConcreteThickness(changeEvent.target.value * 0.001);
  }
  function handleConcreteVapor(changeEvent) {
    setConcreteVapor(changeEvent.target.value);
  }
  function toggleConcreteWall() {
    setConcreteWall(!concreteWall);
  }
  function handleCoverHeat(changeEvent) {
    setCoverHeat(changeEvent.target.value);
  }

  function handleDeleteSecondLayer() {
    setSecondLayer(false);
  }
  function handleCityProp(item) {
    setCityProp(item);
  }

  function handleCoverData(changeEvent) {
    setCoverData(changeEvent.target.value);
  }

  function handleCoverThickness(changeEvent) {
    setCoverThickness(changeEvent.target.value * 0.001);
  }
  function handleEgap() {
    setEgap();
  }
  function handleGobl() {
    setGobl();
  }
  function handleGu() {
    setGu();
  }
  function handleGribDepth(changeEvent) {
    setGribDepth(changeEvent.target.value);
  }

  function handleGribPcs(changeEvent) {
    setGribPcs(changeEvent.target.value);
  }
  function handleHeight(changeEvent) {
    setHeight(changeEvent.target.value * 0.001);
  }
  function handleHumidity(changeEvent) {
    setHumidity(changeEvent.target.value);
  }
  function handleInsAir(changeEvent) {
    setInsAir(changeEvent.target.value);
  }
  function handleInsDensity(changeEvent) {
    setInsDensity(changeEvent.target.value);
  }
  function handleInsHeat(changeEvent) {
    setInsHeat(changeEvent.target.value);
  }
  function handleInsThickness(changeEvent) {
    setInsThickness(changeEvent.target.value * 0.001);
  }
  function handleInsVapor(changeEvent) {
    setInsVapor(changeEvent.target.value);
  }
  function handleMr(changeEvent) {
    setMr(changeEvent.target.value);
  }
  function handleInnerTemp(changeEvent) {
    setInnerTemp(changeEvent.target.value);
  }
  function handleSecondInsAir(changeEvent) {
    setSecondInsAir(changeEvent.target.value);
  }
  function handleSecondInsThickness(changeEvent) {
    setSecondInsThickness(changeEvent.target.value * 0.001);
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

  function handleVentHeight(changeEvent) {
    setVentHeight(changeEvent.target.value * 0.001);
  }
  function handleVentIn(changeEvent) {
    setVentIn(changeEvent.target.value * 0.001);
  }
  function handleVentMed(changeEvent) {
    setVentMed(changeEvent.target.value * 0.001);
  }
  function handleVentOut(changeEvent) {
    setVentOut(changeEvent.target.value * 0.001);
  }
  function handleWindowLength(changeEvent) {
    setWindowLength(changeEvent.target.value);
  }
  function handleWindowHeight(changeEvent) {
    setWindowHeight(changeEvent.target.value);
  }
  function handleWindowDepth(changeEvent) {
    setWindowDepth(changeEvent.target.value);
  }
  function handleWindMembraneR(changeEvent) {
    setWindMembraneR(changeEvent.target.value);
  }
  function handleVaporMembraneR(changeEvent) {
    setVaporMembraneR(changeEvent.target.value);
  }
  function handleWindowHeatLoss(value) {
    setWindowHeatLoss(value);
  }

  const handleOwnCover = () => setOwnCover((value) => !value);

  return (
    <div className="page">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ObjData
              isBuildingAim={buildingAim}
              isCityProp={cityProp}
              isCityValue={cityValue}
              isInnerTemp={innerTemp}
              isHumidity={humidity}
              onCityProp={handleCityProp}
              onBuildingAim={handleBuildingAim}
              isBuildingType={buildingType}
              onBuildingType={handleBuildingType}
              onCityValue={handleCityValue}
              onConcreteSpHeat={handleConcreteSpHeat}
              onConcreteWall={toggleConcreteWall}
              onInnerTemp={handleInnerTemp}
              onHumidity={handleHumidity}
              onMr={handleMr}
            />
          }
        ></Route>
        <Route
          path="/walldata"
          element={
            <WallData
              isBuildingType={buildingType}
              isConcreteSpHeat={concreteSpHeat}
              isSecondLayer={secondLayer}
              onAddSecondLayer={handleAddSecondLayer}
              onBrickAir={handleBrickAir}
              onBrickDensity={handleBrickDensity}
              onBrickHeat={handleBrickHeat}
              onBrickThickness={handleBrickThickness}
              onBrickVapor={handleBrickVapor}
              onDeleteSecondLayer={handleDeleteSecondLayer}
              onConcreteAir={handleConcreteAir}
              onConcreteDensity={handleConcreteDensity}
              onConcreteHeat={handleConcreteHeat}
              onConcreteSpHeat={handleConcreteSpHeat}
              onConcreteThickness={handleConcreteThickness}
              onConcreteVapor={handleConcreteVapor}
              onInsAir={handleInsAir}
              onInsDensity={handleInsDensity}
              onInsHeat={handleInsHeat}
              onInsThickness={handleInsThickness}
              onInsVapor={handleInsVapor}
              onSecondInsAir={handleSecondInsAir}
              onSecondInsDensity={handleSecondInsDensity}
              onSecondInsHeat={handleSecondInsHeat}
              onSecondInsThickness={handleSecondInsThickness}
              onSecondInsVapor={handleSecondInsVapor}
            />
          }
        ></Route>
        <Route
          path="/systdata"
          element={
            <SystData
              onBrickArea={handleBrickArea}
              onConcreteArea={handleConcreteArea}
              onGribDepth={handleGribDepth}
              onGribPcs={handleGribPcs}
              onWindowHeatLoss={handleWindowHeatLoss}
              isSecondLayer={secondLayer}
              isInsThickness={insThickness}
              isSecondInsThickness={secondInsThickness}
              isInsHeat={insHeat}
              isSecondInsHeat={secondInsHeat}
              isBuildingType={buildingType}
              isConcreteHeat={concreteHeat}
              isBrickHeat={brickHeat}
              onWindowLength={handleWindowLength}
              onWindowHeight={handleWindowHeight}
              onWindowDepth={handleWindowDepth}
            />
          }
        ></Route>
        <Route
          path="/bracketdata"
          element={
            <BracketData
              isBuildingType={buildingType}
              isBrickHeat={brickHeat}
              isConcreteHeat={concreteHeat}
              isInsHeat={insHeat}
              isInsThickness={insThickness}
              isSecondLayer={secondLayer}
              isSecondInsThickness={secondInsThickness}
              isSecondInsHeat={secondInsHeat}
              onBracketResult={handleBracketResult}
            />
          }
        ></Route>
        <Route
          path="/coverdata"
          element={
            <CoverData
              isOwnCover={ownCover}
              onCoverData={handleCoverData}
              onCoverHeat={handleCoverHeat}
              onCoverThickness={handleCoverThickness}
              onHeight={handleHeight}
              onVentHeight={handleVentHeight}
              onVentIn={handleVentIn}
              onVentMed={handleVentMed}
              onVentOut={handleVentOut}
              onOwnCover={handleOwnCover}
            />
          }
        ></Route>
        <Route path="/final" element={<Final />}></Route>

        <Route
          path="/pz"
          element={
            <Calculator
              isBracketResult={bracketResult}
              isBrickArea={brickArea}
              isBrickThickness={brickThickness}
              isBrickDensity={brickDensity}
              isBrickHeat={brickHeat}
              isBrickVapor={brickVapor}
              isBrickAir={brickAir}
              isBuildingAim={buildingAim}
              isBuildingType={buildingType}
              isHumidity={humidity}
              isInnerTemp={innerTemp}
              isConcreteAir={concreteAir}
              isConcreteArea={concreteArea}
              isConcreteDensity={concreteDensity}
              isConcreteHeat={concreteHeat}
              isConcreteThickness={concreteThickness}
              isConcreteSpHeat={concreteSpHeat}
              isConcreteVapor={concreteVapor}
              isConcreteWall={concreteWall}
              isCoverData={coverData}
              isCoverHeat={coverHeat}
              isCoverThickness={coverThickness}
              isCityProp={cityProp}
              isGribDepth={gribDepth}
              isGribPcs={gribPcs}
              isHeight={height}
              isInsThickness={insThickness}
              isInsDensity={insDensity}
              isInsHeat={insHeat}
              isInsVapor={insVapor}
              isInsAir={insAir}
              isMr={mr}
              isSecondLayer={secondLayer}
              isSecondIns={secondLayer}
              isSecondInsAir={secondInsAir}
              isSecondInsThickness={secondInsThickness}
              isSecondInsDensity={secondInsDensity}
              isSecondInsHeat={secondInsHeat}
              isSecondInsVapor={secondInsVapor}
              isVaporMembraneR={vaporMembraneR}
              isVentIn={ventIn}
              isVentMed={ventMed}
              isVentOut={ventOut}
              isVentHeight={ventHeight}
              isWindMembraneR={windMembraneR}
              isWindowLength={windowLength}
              isWindowHeatLoss={windowHeatLoss}
              isWindowHeight={windowHeight}
              isWindowDepth={windowDepth}
              onEgap={handleEgap}
              onGobl={handleGobl}
              onGu={handleGu}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}
