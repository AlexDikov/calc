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
import { cities } from './cities';
import LinearLossCalc from './LinearLossCalc';
import DkCalc from './DkCalc';
import { DefaultContext } from '../contexts/DefaultContext';
import { materials } from './materials';

export const covers = {
  Алюминий: { r: 0.001, c: 0.05, l: 221 },
  'Гранит, гнейс, базальт': { r: 0.008, c: 5.3, l: 3.49 },
  Известняк: { r: 0.06, c: 5.3, l: 1.28 },
  Клинкер: { r: 0.11, c: 5.3, l: 0.81 },
  Медь: { r: 0.001, c: 0.05, l: 407 },
  Мрамор: { r: 0.008, c: 5.3, l: 2.91 },
  Стекло: { r: 0.001, c: 5.3, l: 0.76 },
  Фиброцемент: { r: 0.03, c: 5.3, l: 0.52 },
};

export default function App(props) {
  const [addBracket, setAddBracket] = useState([]);
  const [bracketResult, setBracketResult] = useState({});
  const [brickAir, setBrickAir] = useState(1);
  const [brickArea, setBrickArea] = useState('');
  const [brickData, setBrickData] = useState('');
  const [brickDensity, setBrickDensity] = useState('');
  const [brickMaterial, setBrickMaterial] = useState('');
  const [brickLambda, setBrickLambda] = useState(0.81);
  const [brickThickness, setBrickThickness] = useState('');
  const [brickVapor, setBrickVapor] = useState(0.155);
  const [buildingAim, setBuildingAim] = useState('');
  const [buildingType, setBuildingType] = useState('');
  const [cityProp, setCityProp] = useState({});
  const [cityValue, setCityValue] = useState('');
  const [concreteAir, setConcreteAir] = useState(1);
  const [concreteArea, setConcreteArea] = useState('');
  const [concreteDensity, setConcreteDensity] = useState(1);
  const [concreteLambda, setConcreteLambda] = useState(2.04);
  const [concreteSpLambda, setConcreteSpLambda] = useState(2.04);
  const [concreteThickness, setConcreteThickness] = useState('');
  const [concreteVapor, setConcreteVapor] = useState(0.03);
  const [concreteWall, setConcreteWall] = useState(false);
  const [coverLambda, setCoverLambda] = useState('');
  const [cover, setCover] = useState({});
  const [coverName, setCoverName] = useState('');
  const [coverThickness, setCoverThickness] = useState('');
  const [coverVapor, setCoverVapor] = useState('');
  const [d, setD] = useState(0.1);
  const [dk, setDk] = useState(0.1);
  const [finalValues, setFinalValues] = useState({});
  const [grib, setGrib] = useState('');
  const [gribDepth, setGribDepth] = useState(0.006);
  const [gribPcs, setGribPcs] = useState('');
  const [height, setHeight] = useState('');
  const [humidity, setHumidity] = useState(50);
  const [innerTemp, setInnerTemp] = useState(20);
  const [insAir, setInsAir] = useState('');
  const [insData, setInsData] = useState('');
  const [insDensity, setInsDensity] = useState('');
  const [insMaterial, setInsMaterial] = useState('');
  const [insLambda, setInsLambda] = useState(0.05);
  const [insThickness, setInsThickness] = useState('');
  const [insVapor, setInsVapor] = useState(0.5);
  const [k, setK] = useState(0.1);
  const [metalCover, setMetallCover] = useState(false);
  const [mr, setMr] = useState(0.63);
  const [objName, setObjName] = useState('');
  const [objAddress, setObjAddress] = useState('');
  const [ownCover, setOwnCover] = useState(false);
  const [plaster, setPlaster] = useState(true);
  const [secondIns, setSecondIns] = useState(false);
  const [secondInsAir, setSecondInsAir] = useState(0.5);
  const [secondInsData, setSecondInsData] = useState(0.5);
  const [secondInsDensity, setSecondInsDensity] = useState('');
  const [secondInsMaterial, setSecondInsMaterial] = useState('');
  const [secondInsLambda, setSecondInsLambda] = useState(0.05);
  const [secondInsThickness, setSecondInsThickness] = useState('');
  const [secondInsVapor, setSecondInsVapor] = useState(1);
  const [brickSp, setBrickSp] = useState(false);
  const [concreteSp, setConcreteSp] = useState(false);
  const [insSp, setInsSp] = useState(false);
  const [secondInsSp, setSecondInsSp] = useState(false);
  const [vaporMembraneR, setVaporMembraneR] = useState(0.1);
  const [ventHeight, setVentHeight] = useState('');
  const [ventIn, setVentIn] = useState('');
  const [ventMed, setVentMed] = useState('');
  const [ventOut, setVentOut] = useState('');
  const [vaporMembrane, setVaporMembrane] = useState(false);
  const [windMembrane, setWindMembrane] = useState(false);
  const [windMembraneR, setWindMembraneR] = useState('');
  const [windowLength, setWindowLength] = useState('');
  const [windowHeight, setWindowHeight] = useState('1');
  const [windowDepth, setWindowDepth] = useState('1');
  const [windowLoss, setWindowLoss] = useState('');
  const [uKey, setUKey] = useState(1);

  function handleAddSecondIns() {
    setSecondIns(true);
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
  function handleBrickDensity(event) {
    setBrickDensity(event.target.value);
    const selectedDensity = event.target.value;
    const selectedMaterial = materials['brick'].find((item) => item.d[selectedDensity]);
    if (selectedMaterial) {
      setBrickData(selectedMaterial.d[selectedDensity]);
    }
  }
  function handleBrickLambda(changeEvent) {
    setBrickLambda(changeEvent.target.value);
  }
  function handleBrickMaterial(changeEvent) {
    setBrickMaterial(changeEvent.target.value);
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
    const cityValue = cities.find((city, i) => (i == changeEvent.target.value ? city : null));
    setCityProp(cityValue);
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
  function handleCoverName(e) {
    setCoverName(e.target.options[e.target.selectedIndex].text);

    setCover(covers[e.target.options[e.target.selectedIndex].text]);
  }
  function handleCoverLambda(changeEvent) {
    setCoverLambda(changeEvent.target.value);
  }

  function handleCoverThickness(changeEvent) {
    setCoverThickness(changeEvent.target.value);
  }
  function handleCoverVapor(changeEvent) {
    setCoverVapor(changeEvent.target.value);
  }
  function handleD() {
    setD();
  }
  function handleDk() {
    setDk();
  }
  function handleDeleteSecondIns() {
    setSecondIns(false);
  }

  function handleFinalValues(value) {
    setFinalValues(value);
  }
  function handleGrib(e) {
    setGrib(e.target.options[e.target.selectedIndex].text);
    setGribDepth(e.target.value);
  }
  function handleGribPcs(changeEvent) {
    setGribPcs(changeEvent.target.value);
  }
  function handleHeight(changeEvent) {
    setHeight(changeEvent.target.value);
  }
  function handleHumidity(changeEvent) {
    setHumidity(changeEvent.target.value);
  }
  function handleInsAir(changeEvent) {
    setInsAir(changeEvent.target.value);
  }

  function handleInsDensity(event) {
    setInsDensity(event.target.value);
    const selectedDensity = event.target.value;
    const selectedMaterial = materials['ins'].find((item) => item.d[selectedDensity]);
    if (selectedMaterial) {
      setInsData(selectedMaterial.d[selectedDensity]);
    }
  }
  function handleInsLambda(changeEvent) {
    setInsLambda(changeEvent.target.value);
  }
  function handleInsMaterial(changeEvent) {
    setInsMaterial(changeEvent.target.value);
  }
  function handleInsThickness(changeEvent) {
    setInsThickness(changeEvent.target.value * 0.001);
  }
  function handleInsVapor(changeEvent) {
    setInsVapor(changeEvent.target.value);
  }
  function handleK() {
    setK();
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
  function handleSecondInsDensity(event) {
    setSecondInsDensity(event.target.value);
    const selectedDensity = event.target.value;
    const selectedMaterial = materials['ins'].find((item) => item.d[selectedDensity]);
    if (selectedMaterial) {
      setSecondInsData(selectedMaterial.d[selectedDensity]);
    }
  }
  function handleSecondInsLambda(changeEvent) {
    setSecondInsLambda(changeEvent.target.value);
  }
  function handleSecondInsMaterial(changeEvent) {
    setSecondInsMaterial(changeEvent.target.value);
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
    setVentHeight(changeEvent.target.value);
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

  function handleWindowLoss(value) {
    setWindowLoss(value);
  }

  function toggleOwnCover() {
    setOwnCover((value) => !value);
  }

  function toggleMetallCover() {
    setMetallCover((value) => !value);
  }

  function toggleConcreteWall() {
    setConcreteWall(!concreteWall);
  }

  function toggleConcreteSp() {
    setConcreteSp(!concreteSp);
  }
  function toggleBrickSp() {
    setBrickSp(!brickSp);
  }
  function toggleInsSp() {
    setInsSp(!insSp);
  }
  function togglePlaster() {
    setPlaster(!plaster);
  }
  function toggleSecondInsSp() {
    setSecondInsSp(!secondInsSp);
  }

  function handleVaporMembrane() {
    setVaporMembrane(!vaporMembrane);
  }

  function handleWindMembrane() {
    setWindMembrane(!windMembrane);
  }

  return (
    <div className="page">
      <DefaultContext.Provider
        value={{
          addBracket,
          bracketResult,
          brickAir,
          brickArea,
          brickData,
          brickDensity,
          brickMaterial,
          brickLambda,
          brickThickness,
          brickVapor,
          buildingAim,
          buildingType,
          cityProp,
          cityValue,
          concreteAir,
          concreteArea,
          concreteDensity,
          concreteLambda,
          concreteSpLambda,
          concreteThickness,
          concreteVapor,
          concreteWall,
          coverLambda,
          cover,
          coverName,
          coverThickness,
          coverVapor,
          d,
          dk,
          finalValues,
          grib,
          gribDepth,
          gribPcs,
          height,
          humidity,
          innerTemp,
          insAir,
          insData,
          insDensity,
          insMaterial,
          insLambda,
          insThickness,
          insVapor,
          k,
          metalCover,
          mr,
          objName,
          objAddress,
          ownCover,
          plaster,
          secondIns,
          secondInsAir,
          secondInsData,
          secondInsDensity,
          secondInsMaterial,
          secondInsLambda,
          secondInsThickness,
          secondInsVapor,
          setAddBracket,
          setUKey,
          brickSp,
          concreteSp,
          insSp,
          secondInsSp,
          vaporMembrane,
          vaporMembraneR,
          ventHeight,
          ventIn,
          ventMed,
          ventOut,
          windMembrane,
          windMembraneR,
          windowLength,
          windowHeight,
          windowDepth,
          windowLoss,
          handleAddSecondIns,
          handleBracketResult,
          handleBrickAir,
          handleBrickArea,
          handleBrickDensity,
          handleBrickLambda,
          handleBrickThickness,
          handleBrickVapor,
          handleBuildingAim,
          handleBuildingType,
          handleCityValue,
          handleConcreteAir,
          handleConcreteArea,
          handleConcreteDensity,
          handleConcreteLambda,
          handleConcreteSpLambda,
          handleConcreteThickness,
          handleConcreteVapor,
          handleCoverName,
          handleCoverLambda,
          handleCoverThickness,
          handleCoverVapor,
          handleD,
          handleDk,
          handleDeleteSecondIns,
          handleFinalValues,
          handleGrib,
          handleGribPcs,
          handleHeight,
          handleHumidity,
          handleInsAir,
          handleInsDensity,
          handleInsLambda,
          handleInsThickness,
          handleInsVapor,
          handleK,
          handleMr,
          handleInnerTemp,
          handleSecondInsAir,
          handleSecondInsThickness,
          handleSecondInsDensity,
          handleSecondInsLambda,
          handleSecondInsVapor,
          handleObjAddress,
          handleObjName,
          handleVentHeight,
          handleVentIn,
          handleVentMed,
          handleVentOut,
          handleWindowLength,
          handleWindowHeight,
          handleWindowDepth,
          handleWindMembraneR,
          handleVaporMembraneR,
          handleWindowLoss,
          toggleOwnCover,
          toggleMetallCover,
          toggleConcreteWall,
          toggleConcreteSp,
          toggleBrickSp,
          toggleInsSp,
          togglePlaster,
          toggleSecondInsSp,
          handleBrickMaterial,
          handleInsMaterial,
          handleSecondInsMaterial,
          handleVaporMembrane,
          handleWindMembrane,
          uKey,
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<ObjData />}></Route>
          <Route path="/walldata" element={<WallData />}></Route>
          <Route path="/systdata" element={<SystData />}></Route>
          <Route path="/bracketdata" element={<BracketData />}></Route>
          <Route path="/coverdata" element={<CoverData />}></Route>
          <Route path="/final" element={<Final />}></Route>

          <Route path="/pz" element={<Calculator />}></Route>
        </Routes>
      </DefaultContext.Provider>
    </div>
  );
}
