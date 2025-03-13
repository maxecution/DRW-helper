import { useState, useEffect } from "react";
import Stat from "./components/StatComponent";

function GeneralRules() {
  // Load from localStorage or default to 10
  const getInitialValue = (key) => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : 10;
  };

  const [StrScore, setStrScore] = useState(() => getInitialValue("StrScore"));
  const [DexScore, setDexScore] = useState(() => getInitialValue("DexScore"));
  const [ConScore, setConScore] = useState(() => getInitialValue("ConScore"));
  const [IntScore, setIntScore] = useState(() => getInitialValue("IntScore"));
  const [WisScore, setWisScore] = useState(() => getInitialValue("WisScore"));
  const [ChaScore, setChaScore] = useState(() => getInitialValue("ChaScore"));

  // Save scores to localStorage when they change
  useEffect(() => {
    localStorage.setItem("StrScore", JSON.stringify(StrScore));
    localStorage.setItem("DexScore", JSON.stringify(DexScore));
    localStorage.setItem("ConScore", JSON.stringify(ConScore));
    localStorage.setItem("IntScore", JSON.stringify(IntScore));
    localStorage.setItem("WisScore", JSON.stringify(WisScore));
    localStorage.setItem("ChaScore", JSON.stringify(ChaScore));
  }, [StrScore, DexScore, ConScore, IntScore, WisScore, ChaScore]);

  return (
    <div className='ml-4 flex flex-col items-center w-min'>
      <h1 className='text-xl font-medium text-yellow-400 text-nowrap mb-2'>Ability Scores</h1>
      <Stat ability='Strength' score={StrScore} setScore={setStrScore} />
      <Stat ability='Dexterity' score={DexScore} setScore={setDexScore} />
      <Stat ability='Constitution' score={ConScore} setScore={setConScore} />
      <Stat ability='Intelligence' score={IntScore} setScore={setIntScore} />
      <Stat ability='Wisdom' score={WisScore} setScore={setWisScore} />
      <Stat ability='Charisma' score={ChaScore} setScore={setChaScore} />
    </div>
  );
}

export default GeneralRules;
