import { Routes, Route } from 'react-router-dom';
import Final from './Final';
import Header from './Header';
import ObjData from './ObjData';
import SystData from './SystData';
import WallData from './WallData';
import React, { useState } from 'react';
import BracketData from './BracketData';
import Calculator from './Calculator';
import CoverData from './CoverData';

export default function App(props) {
  const [bracketResult, setBracketResult] = useState({});
  const [brickAir, setBrickAir] = useState(1);
  const [brickArea, setBrickArea] = useState('');
  const [brickDensity, setBrickDensity] = useState(1);
  const [brickLambda, setBrickLambda] = useState(0.81);
  const [brickThickness, setBrickThickness] = useState(0.1);
  const [brickVapor, setBrickVapor] = useState(0.155);
  const [buildingAim, setBuildingAim] = useState('');
  const [buildingType, setBuildingType] = useState('');

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
  const [cityValue, setCityValue] = useState('');
  const [concreteAir, setConcreteAir] = useState(1);
  const [concreteArea, setConcreteArea] = useState('');
  const [concreteDensity, setConcreteDensity] = useState(1);
  const [concreteLambda, setConcreteLambda] = useState(2.04);
  const [concreteSpLambda, setConcreteSpLambda] = useState(2.04);
  const [concreteThickness, setConcreteThickness] = useState(0.1);
  const [concreteVapor, setConcreteVapor] = useState(0.03);
  const [concreteWall, setConcreteWall] = useState(false);
  const [coverData, setCoverData] = useState({ r: 0.014, c: 5.3, l: 0.81 });
  const [coverLambda, setCoverLambda] = useState(1);
  const [coverName, setCoverName] = useState(1);
  const [coverThickness, setCoverThickness] = useState(0.01);
  const [coverVapor, setCoverVapor] = useState(1);
  const [eGap, setEgap] = useState();
  const [gObl, setGobl] = useState();
  const [gU, setGu] = useState();
  const [grib, setGrib] = useState('');
  const [gribDepth, setGribDepth] = useState(0.006);
  const [gribPcs, setGribPcs] = useState('');
  const [height, setHeight] = useState(140);
  const [humidity, setHumidity] = useState(50);
  const [innerTemp, setInnerTemp] = useState(20);
  const [insAir, setInsAir] = useState('');
  const [insDensity, setInsDensity] = useState(1);
  const [insLambda, setInsLambda] = useState(0.05);
  const [insThickness, setInsThickness] = useState(0.1);
  const [insVapor, setInsVapor] = useState(0.5);
  const [mr, setMr] = useState(0.63);
  const [objName, setObjName] = useState('');
  const [objAddress, setObjAddress] = useState('');
  const [ownCover, setOwnCover] = useState(false);
  const [plaster, setPlaster] = useState(true);
  const [secondLayer, setSecondLayer] = useState(false);
  const [secondInsAir, setSecondInsAir] = useState(0.5);
  const [secondInsDensity, setSecondInsDensity] = useState(1);
  const [secondInsLambda, setSecondInsLambda] = useState(0.05);
  const [secondInsThickness, setSecondInsThickness] = useState(0.1);
  const [secondInsVapor, setSecondInsVapor] = useState(1);
  const [vaporMembraneR, setVaporMembraneR] = useState(0.1);
  const [ventHeight, setVentHeight] = useState(140);
  const [ventIn, setVentIn] = useState(0.03);
  const [ventMed, setVentMed] = useState(0.06);
  const [ventOut, setVentOut] = useState(0.03);
  const [windMembraneR, setWindMembraneR] = useState(0.1);
  const [windowLength, setWindowLength] = useState('');
  const [windowLambdaLoss, setWindowLambdaLoss] = useState(1);
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
  function handleBrickLambda(changeEvent) {
    setBrickLambda(changeEvent.target.value);
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
  function handleConcreteLambda(changeEvent) {
    setConcreteLambda(changeEvent.target.value);
  }

  function handleConcreteSpLambda() {
    setConcreteSpLambda(cityProp.s === 'А' ? 1.72 : 2.04);
  }
  function handleConcreteThickness(changeEvent) {
    setConcreteThickness(changeEvent.target.value * 0.001);
  }
  function handleConcreteVapor(changeEvent) {
    setConcreteVapor(changeEvent.target.value);
  }

  function handleCoverLambda(changeEvent) {
    setCoverLambda(changeEvent.target.value);
  }
  function handleCoverName(changeEvent) {
    setCoverName(changeEvent.target.value);
  }
  function handleCoverThickness(changeEvent) {
    setCoverThickness(changeEvent.target.value);
  }
  function handleCoverVapor(changeEvent) {
    setCoverVapor(changeEvent.target.value);
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

  function handleEgap() {
    setEgap();
  }
  function handleGobl() {
    setGobl();
  }
  function handleGu() {
    setGu();
  }
  function handleGrib(e) {
    setGrib(e.target.options[e.target.selectedIndex].text);
    setGribDepth(e.target.value);
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
  function handleInsLambda(changeEvent) {
    setInsLambda(changeEvent.target.value);
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
  function handleSecondInsLambda(changeEvent) {
    setSecondInsLambda(changeEvent.target.value);
  }
  function handleSecondInsVapor(changeEvent) {
    setSecondInsVapor(changeEvent.target.value);
  }
  function handleObjAddress(e) {
    setObjAddress(e.target.value);
  }
  function handleObjName(e) {
    setObjName(e.target.value);
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

  function toggleOwnCover() {
    setOwnCover((value) => !value);
  }

  function toggleConcreteWall() {
    setConcreteWall(!concreteWall);
  }

  return (
    <div className="page">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ObjData
              isBuildingAim={buildingAim}
              isBuildingType={buildingType}
              isCityProp={cityProp}
              isCityValue={cityValue}
              isConcreteWall={concreteWall}
              isInnerTemp={innerTemp}
              isHumidity={humidity}
              isMr={mr}
              isObjName={objName || ''}
              isObjAddress={objAddress || ''}
              onBuildingAim={handleBuildingAim}
              onBuildingType={handleBuildingType}
              onCityProp={handleCityProp}
              onCityValue={handleCityValue}
              onConcreteWall={toggleConcreteWall}
              onInnerTemp={handleInnerTemp}
              onHumidity={handleHumidity}
              onMr={handleMr}
              onObjAddress={handleObjAddress}
              onObjName={handleObjName}
            />
          }
        ></Route>
        <Route
          path="/walldata"
          element={
            <WallData
              isBuildingType={buildingType}
              isConcreteSpLambda={concreteSpLambda}
              isSecondLayer={secondLayer}
              onAddSecondLayer={handleAddSecondLayer}
              onBrickAir={handleBrickAir}
              onBrickDensity={handleBrickDensity}
              onBrickLambda={handleBrickLambda}
              onBrickThickness={handleBrickThickness}
              onBrickVapor={handleBrickVapor}
              onDeleteSecondLayer={handleDeleteSecondLayer}
              onConcreteAir={handleConcreteAir}
              onConcreteDensity={handleConcreteDensity}
              onConcreteLambda={handleConcreteLambda}
              onConcreteSpLambda={handleConcreteSpLambda}
              onConcreteThickness={handleConcreteThickness}
              onConcreteVapor={handleConcreteVapor}
              onInsAir={handleInsAir}
              onInsDensity={handleInsDensity}
              onInsLambda={handleInsLambda}
              onInsThickness={handleInsThickness}
              onInsVapor={handleInsVapor}
              onSecondInsAir={handleSecondInsAir}
              onSecondInsDensity={handleSecondInsDensity}
              onSecondInsLambda={handleSecondInsLambda}
              onSecondInsThickness={handleSecondInsThickness}
              onSecondInsVapor={handleSecondInsVapor}
            />
          }
        ></Route>
        <Route
          path="/systdata"
          element={
            <SystData
              isBrickArea={brickArea}
              isBrickLambda={brickLambda}
              isBuildingType={buildingType}
              isConcreteArea={concreteArea}
              isConcreteLambda={concreteLambda}
              isGribPcs={gribPcs}
              isInsLambda={insLambda}
              isInsThickness={insThickness}
              isSecondInsThickness={secondInsThickness}
              isSecondInsLambda={secondInsLambda}
              isSecondLayer={secondLayer}
              isWindowDepth={windowDepth}
              isWindowHeight={windowHeight}
              isWindowLength={windowLength}
              onBrickArea={handleBrickArea}
              onConcreteArea={handleConcreteArea}
              onGrib={handleGrib}
              onGribPcs={handleGribPcs}
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
              isBrickLambda={brickLambda}
              isConcreteLambda={concreteLambda}
              isInsLambda={insLambda}
              isInsThickness={insThickness}
              isSecondLayer={secondLayer}
              isSecondInsThickness={secondInsThickness}
              isSecondInsLambda={secondInsLambda}
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
              onCoverLambda={handleCoverLambda}
              onCoverName={handleCoverName}
              onCoverThickness={handleCoverThickness}
              onCoverVapor={handleCoverVapor}
              onHeight={handleHeight}
              onVentHeight={handleVentHeight}
              onVentIn={handleVentIn}
              onVentMed={handleVentMed}
              onVentOut={handleVentOut}
              onOwnCover={toggleOwnCover}
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
              isBrickLambda={brickLambda}
              isBrickVapor={brickVapor}
              isBrickAir={brickAir}
              isBuildingAim={buildingAim}
              isBuildingType={buildingType}
              isHumidity={humidity}
              isInnerTemp={innerTemp}
              isConcreteAir={concreteAir}
              isConcreteArea={concreteArea}
              isConcreteDensity={concreteDensity}
              isConcreteLambda={concreteLambda}
              isConcreteThickness={concreteThickness}
              isConcreteSpLambda={concreteSpLambda}
              isConcreteVapor={concreteVapor}
              isConcreteWall={concreteWall}
              isCoverData={coverData}
              isCoverLambda={coverLambda}
              isCoverName={coverName}
              isCoverThickness={coverThickness}
              isCoverVapor={coverVapor}
              isCityProp={cityProp}
              isGrib={grib}
              isGribDepth={gribDepth}
              isGribPcs={gribPcs}
              isHeight={height}
              isInsThickness={insThickness}
              isInsDensity={insDensity}
              isInsLambda={insLambda}
              isInsVapor={insVapor}
              isInsAir={insAir}
              isMr={mr}
              isObjAddress={objAddress}
              isObjName={objName}
              isPlaster={plaster}
              isSecondIns={secondLayer}
              isSecondInsAir={secondInsAir}
              isSecondInsThickness={secondInsThickness}
              isSecondInsDensity={secondInsDensity}
              isSecondInsLambda={secondInsLambda}
              isSecondInsVapor={secondInsVapor}
              isVaporMembraneR={vaporMembraneR}
              isVentIn={ventIn}
              isVentMed={ventMed}
              isVentOut={ventOut}
              isVentHeight={ventHeight}
              isWindMembraneR={windMembraneR}
              isWindowLength={windowLength}
              isWindowLambdaLoss={windowLambdaLoss}
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
