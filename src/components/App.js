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
  const [bracket, setBracket] = useState('MFT-MF HS');
  const [bracketPcs, setBracketPcs] = useState(1);
  const [bracketResult, setBracketResult] = useState([]);
  const [brickAir, setBrickAir] = useState(1);
  const [brickArea, setBrickArea] = useState(1);
  const [brickDensity, setBrickDensity] = useState(1);
  const [brickHeat, setBrickHeat] = useState(0.81);
  const [brickThickness, setBrickThickness] = useState(0.1);
  const [brickVapor, setBrickVapor] = useState(1);
  const [buildingAim, setBuildingAim] = useState(1);
  const [buildingType, setBuildingType] = useState(1);

  const [cityProp, setCityProp] = useState({
    c: 'Агата',
    t: -53,
    tm: -34.7,
    z8: 291,
    t8: -16.6,
    z10: 306,
    t10: -15.3,
    w: 75,
    vm: 2.9,
    v: 1.6,
    s: '',
  });
  const [cityValue, setCityValue] = useState(1);
  const [concreteArea, setConcreteArea] = useState(1);
  const [concreteDensity, setConcreteDensity] = useState(1);
  const [concreteHeat, setConcreteHeat] = useState(2.04);
  const [concreteSpHeat, setConcreteSpHeat] = useState(2.04);
  const [concreteThickness, setConcreteThickness] = useState(0.1);
  const [concreteVapor, setConcreteVapor] = useState(1);
  const [concreteAir, setConcreteAir] = useState(1);
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
  const [ventIn, setVentIn] = useState(20);
  const [ventMed, setVentMed] = useState(20);
  const [ventOut, setVentOut] = useState(20);
  const [windMembraneR, setWindMembraneR] = useState(0.1);
  const [windowLength, setWindowLength] = useState(1);
  const [windowHeatLoss, setWindowHeatLoss] = useState(1);
  console.log(bracketResult);
  function handleAddSecondLayer() {
    setSecondLayer(true);
  }
  function handleBracket(e) {
    setBracket(e.target.options[e.target.selectedIndex].text);
  }
  function handleBracketPcs(value) {
    setBracketPcs(value);
  }
  function handleBracketResult({ index, value }) {
    setBracketResult((prevBracketResult) => prevBracketResult.map((item, i) => (i === index ? value : item)));
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
    <FormDataProvider>
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
                onConcreteSpHeat={handleConcreteSpHeat}
                onCityValue={handleCityValue}
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
                onWindowLength={handleWindowLength}
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
              />
            }
          ></Route>
          <Route
            path="/bracketdata"
            element={
              <BracketData
                isBracket={bracket}
                isBuildingType={buildingType}
                isBrickHeat={brickHeat}
                isConcreteHeat={concreteHeat}
                isInsHeat={insHeat}
                isInsThickness={insThickness}
                isSecondLayer={secondLayer}
                isSecondInsThickness={secondInsThickness}
                isSecondInsHeat={secondInsHeat}
                onBracket={handleBracket}
                onBracketPcs={handleBracketPcs}
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
                isBracket={bracket}
                isBracketPcs={bracketPcs}
                isBracketResult={bracketResult}
                isBrickArea={brickArea}
                isBrickThickness={brickThickness}
                isBrickDensity={brickDensity}
                isBrickHeat={brickHeat}
                isBrickVapor={brickVapor}
                isBrickAir={brickAir}
                isBuildingAim={buildingAim}
                isHumidity={humidity}
                isInnerTemp={innerTemp}
                isConcreteAir={concreteAir}
                isConcreteArea={concreteArea}
                isConcreteDensity={concreteDensity}
                isConcreteHeat={concreteHeat}
                isConcreteThickness={concreteThickness}
                isConcreteSpHeat={concreteSpHeat}
                isConcreteVapor={concreteVapor}
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
                onEgap={handleEgap}
                onGobl={handleGobl}
                onGu={handleGu}
              />
            }
          ></Route>
        </Routes>
      </div>
    </FormDataProvider>
  );
}
