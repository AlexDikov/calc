import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import ObjData from './ObjData';
import SystData from './SystData';
import WallData from './WallData';
import React, { useState } from 'react';
import BracketData from './BracketData';
import CoverData from './CoverData';
import { cities } from './cities';
import { DefaultContext } from '../contexts/DefaultContext';
import { materials } from './materials';
import { covers } from './covers';
import Final from './Final';

export default function App(props) {
  const [addBracket, setAddBracket] = useState([]);
  const [bracketResult, setBracketResult] = useState({});
  const [brickAir, setBrickAir] = useState('');
  const [brickArea, setBrickArea] = useState('');
  const [brickData, setBrickData] = useState(null);
  const [brickDensity, setBrickDensity] = useState(null);
  const [brickMaterial, setBrickMaterial] = useState(null);
  const [brickName, setBrickName] = useState(null);
  const [brickLambda, setBrickLambda] = useState(null);
  const [brickSp, setBrickSp] = useState(false);
  const [brickThickness, setBrickThickness] = useState(null);
  const [brickType, setBrickType] = useState(false);
  const [brickVapor, setBrickVapor] = useState('');
  const [buildingAim, setBuildingAim] = useState(null);
  const [buildingType, setBuildingType] = useState(null);
  const [cityProp, setCityProp] = useState({});
  const [cityValue, setCityValue] = useState(null);
  const [concreteAir, setConcreteAir] = useState(null);
  const [concreteArea, setConcreteArea] = useState('');
  const [concreteDensity, setConcreteDensity] = useState(null);
  const [concreteLambda, setConcreteLambda] = useState('');
  const [concreteSpLambda, setConcreteSpLambda] = useState(null);
  const [concreteSp, setConcreteSp] = useState(false);
  const [concreteThickness, setConcreteThickness] = useState(null);
  const [concreteVapor, setConcreteVapor] = useState('');
  const [concreteWall, setConcreteWall] = useState(false);
  const [coverLambda, setCoverLambda] = useState(null);
  const [cover, setCover] = useState({});
  const [coverName, setCoverName] = useState(null);
  const [coverThickness, setCoverThickness] = useState(null);
  const [coverVapor, setCoverVapor] = useState(null);
  const [d, setD] = useState(0.1);
  const [dk, setDk] = useState(null);
  const [finalValues, setFinalValues] = useState({});
  const [grib, setGrib] = useState(null);
  const [gribDepth, setGribDepth] = useState(0.006);
  const [gribConcretePcs, setGribConcretePcs] = useState(null);
  const [gribPcs, setGribPcs] = useState(null);
  const [height, setHeight] = useState(null);
  const [humidity, setHumidity] = useState(50);
  const [humidityZone, setHumidityZone] = useState(false);
  const [innerTemp, setInnerTemp] = useState(20);
  const [insAir, setInsAir] = useState(null);
  const [insData, setInsData] = useState(null);
  const [insDensity, setInsDensity] = useState(null);
  const [insMaterial, setInsMaterial] = useState(null);
  const [insName, setInsName] = useState(null);
  const [insLambda, setInsLambda] = useState(null);
  const [insSp, setInsSp] = useState(false);
  const [insThickness, setInsThickness] = useState(null);
  const [insVapor, setInsVapor] = useState(null);
  const [k, setK] = useState(0.1);
  const [metalCover, setMetallCover] = useState(false);
  const [mr, setMr] = useState(0.63);
  const [objName, setObjName] = useState(null);
  const [objAddress, setObjAddress] = useState(null);
  const [ownCover, setOwnCover] = useState(false);
  const [plaster, setPlaster] = useState(1);
  const [secondIns, setSecondIns] = useState(false);
  const [secondInsAir, setSecondInsAir] = useState(null);
  const [secondInsData, setSecondInsData] = useState(null);
  const [secondInsDensity, setSecondInsDensity] = useState(null);
  const [secondInsMaterial, setSecondInsMaterial] = useState(null);
  const [secondInsName, setSecondInsName] = useState(null);
  const [secondInsLambda, setSecondInsLambda] = useState(null);
  const [secondInsThickness, setSecondInsThickness] = useState(null);
  const [secondInsVapor, setSecondInsVapor] = useState(null);
  const [secondInsSp, setSecondInsSp] = useState(false);
  const [vaporCalc, setVaporCalc] = useState(false);
  const [vaporMembraneR, setVaporMembraneR] = useState(null);
  const [ventHeight, setVentHeight] = useState(null);
  const [ventIn, setVentIn] = useState(null);
  const [ventMed, setVentMed] = useState(null);
  const [ventOut, setVentOut] = useState(null);
  const [vaporMembrane, setVaporMembrane] = useState(false);
  const [vaporMembraneAir, setVaporMembraneAir] = useState(null);
  const [windMembrane, setWindMembrane] = useState(false);
  const [windMembraneR, setWindMembraneR] = useState(null);
  const [windowBrickLength, setWindowBrickLength] = useState(null);
  const [windowConcreteLength, setWindowConcreteLength] = useState(null);
  const [windowHeight, setWindowHeight] = useState('1');
  const [windowDepth, setWindowDepth] = useState('1');
  const [windowLoss, setWindowLoss] = useState(null);
  const [windowLossConcrete, setWindowLossConcrete] = useState(null);
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
    setBrickArea(e.target.value);
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
      setBrickAir(selectedMaterial.d[selectedDensity].a);
    }
    const selectedType = materials['brick'].find((item) => item.t);
    if (selectedType) {
      setBrickType(true);
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
    setBuildingAim(parseInt(e.target.value));
  }
  function handleBuildingType(e) {
    setBuildingType(parseInt(e.target.value));
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
    setConcreteArea(e.target.value);
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
  function handleHumidityZone(value) {
    setHumidityZone(value);
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
      setInsAir(selectedMaterial.d[selectedDensity].a);
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
  function handleObjAddress(e) {
    setObjAddress(e.target.value);
  }
  function handleObjName(e) {
    setObjName(e.target.value);
  }
  function handlePlaster(e) {
    setPlaster(parseInt(e.target.value));
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
      setSecondInsAir(selectedMaterial.d[selectedDensity].a);
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
  function handleVaporCalc(value) {
    setVaporCalc(value);
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
    setConcreteLambda(concreteSp ? null : cityProp.s === 'А' ? 1.92 : 2.04);
    setConcreteVapor(concreteSp ? null : 0.03);
    setConcreteAir(concreteSp ? null : 0.00004);
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

  const [rRed, setRRed] = useState(1);
  const [rObl, setRObl] = useState(1);
  const [eGap, setEGap] = useState(1);
  const [outE, setOutE] = useState(1);
  const [gU, setGU] = useState(1);
  const [gObl, setGObl] = useState(1);

  function handleRObl(value) {
    setRObl(value);
  }
  function handleRRed(value) {
    setRRed(value);
  }
  function handleEGap(value) {
    setEGap(value);
  }
  function handleOutE(value) {
    setOutE(value);
  }
  function handleGU(value) {
    setGU(value);
  }
  function handleGObl(value) {
    setGObl(value);
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
          brickSp,
          brickThickness,
          brickType,
          brickVapor,
          buildingAim,
          buildingType,
          cityProp,
          cityValue,
          concreteAir,
          concreteArea,
          concreteDensity,
          concreteLambda,
          concreteSp,
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
          eGap,
          finalValues,
          grib,
          gribDepth,
          gribConcretePcs,
          gribPcs,
          gObl,
          gU,
          height,
          humidity,
          humidityZone,
          innerTemp,
          insAir,
          insData,
          insDensity,
          insMaterial,
          insLambda,
          insName,
          insSp,
          insThickness,
          insVapor,
          k,
          metalCover,
          mr,
          objName,
          objAddress,
          outE,
          ownCover,
          plaster,
          rObl,
          rRed,
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
          secondInsSp,
          vaporCalc,
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
          handleEGap,
          handleFinalValues,
          handleGObl,
          handleGrib,
          handleGribConcretePcs,
          handleGribPcs,
          handleGU,
          handleHeight,
          handleHumidity,
          handleHumidityZone,
          handleInsAir,
          handleInsDensity,
          handleInsLambda,
          handleInsName,
          handleInsThickness,
          handleInsVapor,
          handleK,
          handleMr,
          handleInnerTemp,
          handleOutE,
          handlePlaster,
          handleRObl,
          handleRRed,
          handleSecondInsAir,
          handleSecondInsThickness,
          handleSecondInsDensity,
          handleSecondInsLambda,
          handleSecondInsName,
          handleSecondInsVapor,
          handleObjAddress,
          handleObjName,
          handleVaporCalc,
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
          {vaporCalc && <Route path="/coverdata" element={<CoverData />}></Route>}
          <Route path="/final" element={<Final />}></Route>
        </Routes>
      </DefaultContext.Provider>
    </div>
  );
}
