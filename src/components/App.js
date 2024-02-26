import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import ObjData from './ObjData';
import SystData from './SystData';
import WallData from './WallData';
import React, { useState } from 'react';
import BracketData from './BracketData';
import Calculator from './Calculator';
import CoverData from './CoverData';
import { cities } from './cities';
import { DefaultContext } from '../contexts/DefaultContext';
import { materials } from './materials';
import { covers } from './covers';

export default function App(props) {
  const [addBracket, setAddBracket] = useState([]);
  const [bracketResult, setBracketResult] = useState({});
  const [brickAir, setBrickAir] = useState('');
  const [brickArea, setBrickArea] = useState('');
  const [brickData, setBrickData] = useState('');
  const [brickDensity, setBrickDensity] = useState('');
  const [brickMaterial, setBrickMaterial] = useState('');
  const [brickName, setBrickName] = useState('');
  const [brickLambda, setBrickLambda] = useState('');
  const [brickThickness, setBrickThickness] = useState('');
  const [brickVapor, setBrickVapor] = useState('');
  const [buildingAim, setBuildingAim] = useState('');
  const [buildingType, setBuildingType] = useState('');
  const [cityProp, setCityProp] = useState({});
  const [cityValue, setCityValue] = useState('');
  const [concreteAir, setConcreteAir] = useState('');
  const [concreteArea, setConcreteArea] = useState('');
  const [concreteDensity, setConcreteDensity] = useState('');
  const [concreteLambda, setConcreteLambda] = useState('');
  const [concreteSpLambda, setConcreteSpLambda] = useState('');
  const [concreteThickness, setConcreteThickness] = useState('');
  const [concreteVapor, setConcreteVapor] = useState('');
  const [concreteWall, setConcreteWall] = useState(false);
  const [coverLambda, setCoverLambda] = useState('');
  const [cover, setCover] = useState({});
  const [coverName, setCoverName] = useState('');
  const [coverThickness, setCoverThickness] = useState('');
  const [coverVapor, setCoverVapor] = useState('');
  const [d, setD] = useState(0.1);
  const [dk, setDk] = useState('');
  const [finalValues, setFinalValues] = useState({});
  const [grib, setGrib] = useState('');
  const [gribDepth, setGribDepth] = useState(0.006);
  const [gribConcretePcs, setGribConcretePcs] = useState('');
  const [gribPcs, setGribPcs] = useState('');
  const [height, setHeight] = useState('');
  const [humidity, setHumidity] = useState(50);
  const [innerTemp, setInnerTemp] = useState(20);
  const [insAir, setInsAir] = useState('');
  const [insData, setInsData] = useState('');
  const [insDensity, setInsDensity] = useState('');
  const [insMaterial, setInsMaterial] = useState('');
  const [insName, setInsName] = useState('');
  const [insLambda, setInsLambda] = useState('');
  const [insThickness, setInsThickness] = useState('');
  const [insVapor, setInsVapor] = useState('');
  const [k, setK] = useState(0.1);
  const [metalCover, setMetallCover] = useState(false);
  const [mr, setMr] = useState(0.63);
  const [objName, setObjName] = useState('');
  const [objAddress, setObjAddress] = useState('');
  const [ownCover, setOwnCover] = useState(false);
  const [plaster, setPlaster] = useState(false);
  const [plasterValue, setPlasterValue] = useState(false);
  const [secondIns, setSecondIns] = useState(false);
  const [secondInsAir, setSecondInsAir] = useState('');
  const [secondInsData, setSecondInsData] = useState('');
  const [secondInsDensity, setSecondInsDensity] = useState('');
  const [secondInsMaterial, setSecondInsMaterial] = useState('');
  const [secondInsName, setSecondInsName] = useState('');
  const [secondInsLambda, setSecondInsLambda] = useState('');
  const [secondInsThickness, setSecondInsThickness] = useState('');
  const [secondInsVapor, setSecondInsVapor] = useState('');
  const [brickSp, setBrickSp] = useState(false);
  const [concreteSp, setConcreteSp] = useState(false);
  const [insSp, setInsSp] = useState(false);
  const [secondInsSp, setSecondInsSp] = useState(false);
  const [vaporMembraneR, setVaporMembraneR] = useState('');
  const [ventHeight, setVentHeight] = useState('');
  const [ventIn, setVentIn] = useState('');
  const [ventMed, setVentMed] = useState('');
  const [ventOut, setVentOut] = useState('');
  const [vaporMembrane, setVaporMembrane] = useState(false);
  const [vaporMembraneAir, setVaporMembraneAir] = useState('');
  const [windMembrane, setWindMembrane] = useState(false);
  const [windMembraneR, setWindMembraneR] = useState('');
  const [windowBrickLength, setWindowBrickLength] = useState('');
  const [windowConcreteLength, setWindowConcreteLength] = useState('');
  const [windowHeight, setWindowHeight] = useState('1');
  const [windowDepth, setWindowDepth] = useState('1');
  const [windowLoss, setWindowLoss] = useState('');
  const [windowLossConcrete, setWindowLossConcrete] = useState('');
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
  function handleBrickAir(e) {
    setBrickAir(e.target.value);
  }
  function handleBrickArea(e) {
    setBrickArea(parseFloat(e.target.value));
  }
  function handleBrickDensity(event) {
    setBrickDensity(event.target.value);
    const selectedDensity = event.target.value;
    const selectedMaterial = materials['brick'].find((item) => item.d[selectedDensity]);
    if (selectedMaterial) {
      setBrickData(selectedMaterial.d[selectedDensity]);
      setBrickLambda(
        cityProp.s === 'А' ? selectedMaterial.d[selectedDensity].la : selectedMaterial.d[selectedDensity].lb
      );
      setBrickVapor(selectedMaterial.d[selectedDensity].v);
    }
  }
  function handleBrickLambda(e) {
    setBrickLambda(e.target.value);
  }
  function handleBrickMaterial(e) {
    setBrickMaterial(e.target.value);
    setBrickName(e.target.options[e.target.selectedIndex].text);
  }
  function handleBrickName(e) {
    setBrickName(e.target.value);
  }
  function handleBrickThickness(e) {
    setBrickThickness(e.target.value * 0.001);
  }
  function handleBrickVapor(e) {
    setBrickVapor(e.target.value);
  }
  function handleBuildingAim(e) {
    setBuildingAim(e.target.value);
  }
  function handleBuildingType(e) {
    setBuildingType(e.target.value);
  }
  function handleCityValue(e) {
    setCityValue(e.target.value);
    const cityValue = cities.find((city, i) => (i == e.target.value ? city : null));
    setCityProp(cityValue);
  }
  function handleConcreteAir(e) {
    setConcreteAir(e.target.value);
  }
  function handleConcreteArea(e) {
    setConcreteArea(parseFloat(e.target.value));
  }
  function handleConcreteDensity(e) {
    setConcreteDensity(e.target.value);
  }
  function handleConcreteLambda(e) {
    setConcreteLambda(e.target.value);
  }

  function handleConcreteSpLambda() {
    setConcreteLambda(cityProp.s === 'А' ? 1.72 : 2.04);
  }
  function handleConcreteThickness(e) {
    setConcreteThickness(e.target.value * 0.001);
  }
  function handleConcreteVapor(e) {
    setConcreteVapor(e.target.value);
  }
  function handleCoverName(e) {
    setCoverName(e.target.options[e.target.selectedIndex].text);

    setCover(covers[e.target.options[e.target.selectedIndex].text]);
  }

  function handleCoverThickness(e) {
    setCoverThickness(e.target.value);
  }

  function handleD() {
    setD();
  }
  function handleDk(value) {
    setDk(value);
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
  function handleGribPcs(e) {
    setGribPcs(e.target.value);
  }
  function handleGribConcretePcs(e) {
    setGribConcretePcs(e.target.value);
  }
  function handleHeight(e) {
    setHeight(e.target.value);
  }
  function handleHumidity(e) {
    setHumidity(e.target.value);
  }
  function handleInsAir(e) {
    setInsAir(e.target.value);
  }

  function handleInsDensity(event) {
    setInsDensity(event.target.value);
    const selectedDensity = event.target.value;
    const selectedMaterial = materials['ins'].find((item) => item.d[selectedDensity]);
    if (selectedMaterial) {
      setInsData(selectedMaterial.d[selectedDensity]);
      setInsLambda(
        cityProp.s === 'А' ? selectedMaterial.d[selectedDensity].la : selectedMaterial.d[selectedDensity].lb
      );
      setInsVapor(selectedMaterial.d[selectedDensity].v);
    }
  }
  function handleInsLambda(event) {
    setInsLambda(event.target.value);
  }
  function handleInsMaterial(e) {
    setInsMaterial(e.target.value);
    setInsName(e.target.options[e.target.selectedIndex].text);
  }
  function handleInsName(e) {
    setInsName(e.target.value);
  }
  function handleInsThickness(e) {
    setInsThickness(e.target.value * 0.001);
  }
  function handleInsVapor(e) {
    setInsVapor(e.target.value);
  }
  function handleK() {
    setK();
  }
  function handleMr(e) {
    setMr(e.target.value);
  }
  function handleInnerTemp(e) {
    setInnerTemp(e.target.value);
  }

  function handleSecondInsAir(e) {
    setSecondInsAir(e.target.value);
  }
  function handleSecondInsThickness(e) {
    setSecondInsThickness(e.target.value * 0.001);
  }
  function handleSecondInsDensity(event) {
    setSecondInsDensity(event.target.value);
    const selectedDensity = event.target.value;
    const selectedMaterial = materials['ins'].find((item) => item.d[selectedDensity]);
    if (selectedMaterial) {
      setSecondInsData(selectedMaterial.d[selectedDensity]);
      setSecondInsLambda(
        cityProp.s === 'А' ? selectedMaterial.d[selectedDensity].la : selectedMaterial.d[selectedDensity].lb
      );
      setSecondInsVapor(selectedMaterial.d[selectedDensity].v);
    }
  }
  function handleSecondInsLambda(e) {
    setSecondInsLambda(e.target.value);
  }
  function handleSecondInsMaterial(e) {
    setSecondInsMaterial(e.target.value);
    setSecondInsName(e.target.options[e.target.selectedIndex].text);
  }
  function handleSecondInsName(e) {
    setSecondInsName(e.target.value);
  }
  function handleSecondInsVapor(e) {
    setSecondInsVapor(e.target.value);
  }
  function handleObjAddress(e) {
    setObjAddress(e.target.value);
  }
  function handleObjName(e) {
    setObjName(e.target.value);
  }
  function handlePlasterValue(e) {
    setPlasterValue(e.target.value);
  }
  function handleVaporMembraneAir(e) {
    setVaporMembraneAir(e.target.value);
  }
  function handleVentHeight(e) {
    setVentHeight(e.target.value * 1);
  }
  function handleVentIn(e) {
    setVentIn(e.target.value * 0.001);
  }
  function handleVentMed(e) {
    setVentMed(e.target.value * 0.001);
  }
  function handleVentOut(e) {
    setVentOut(e.target.value * 0.001);
  }
  function handleWindowBrickLength(e) {
    setWindowBrickLength(e.target.value);
  }
  function handleWindowConcreteLength(e) {
    setWindowConcreteLength(e.target.value);
  }
  function handleWindowHeight(e) {
    setWindowHeight(e.target.value);
  }
  function handleWindowDepth(e) {
    setWindowDepth(e.target.value);
  }
  function handleWindMembraneR(e) {
    setWindMembraneR(e.target.value);
  }
  function handleVaporMembraneR(e) {
    setVaporMembraneR(e.target.value);
  }

  function handleWindowLoss(value) {
    setWindowLoss(value);
  }

  function handleWindowLossConcrete(value) {
    setWindowLossConcrete(value);
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
    setConcreteLambda(concreteSp ? '' : cityProp.s === 'А' ? 1.92 : 2.04);
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
          brickName,
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
          gribConcretePcs,
          gribPcs,
          height,
          humidity,
          innerTemp,
          insAir,
          insData,
          insDensity,
          insMaterial,
          insLambda,
          insName,
          insThickness,
          insVapor,
          k,
          metalCover,
          mr,
          objName,
          objAddress,
          ownCover,
          plaster,
          plasterValue,
          secondIns,
          secondInsAir,
          secondInsData,
          secondInsDensity,
          secondInsMaterial,
          secondInsName,
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
          vaporMembraneAir,
          windMembraneR,
          windowBrickLength,
          windowConcreteLength,
          windowHeight,
          windowDepth,
          windowLoss,
          windowLossConcrete,
          handleAddSecondIns,
          handleBracketResult,
          handleBrickAir,
          handleBrickArea,
          handleBrickDensity,
          handleBrickLambda,
          handleBrickName,
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
          handleCoverThickness,
          handleD,
          handleDk,

          handleDeleteSecondIns,
          handleFinalValues,
          handleGrib,
          handleGribConcretePcs,
          handleGribPcs,
          handleHeight,
          handleHumidity,
          handleInsAir,
          handleInsDensity,
          handleInsLambda,
          handleInsName,
          handleInsThickness,
          handleInsVapor,
          handleK,
          handleMr,
          handleInnerTemp,
          handleSecondInsAir,
          handleSecondInsThickness,
          handleSecondInsDensity,
          handleSecondInsLambda,
          handleSecondInsName,
          handleSecondInsVapor,
          handleObjAddress,
          handleObjName,
          handlePlasterValue,
          handleVaporMembraneAir,
          handleVentHeight,
          handleVentIn,
          handleVentMed,
          handleVentOut,
          handleWindowBrickLength,
          handleWindowConcreteLength,
          handleWindowHeight,
          handleWindowDepth,
          handleWindMembraneR,
          handleVaporMembraneR,
          handleWindowLoss,
          handleWindowLossConcrete,
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
          <Route path="/pz" element={<Calculator />}></Route>
        </Routes>
      </DefaultContext.Provider>
    </div>
  );
}
