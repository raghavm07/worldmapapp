import React, { useState } from "react";
import "./App.css";
import Search from "./Components/Filter/Filter";
import Map from "./Components/Map/Map";

function App() {
  const [selectPosition, setSelectPosition] = useState(null);
  const [countryData, setCountryData] = useState({});
  return (
    <>
      <Search
        selectPosition={selectPosition}
        setSelectPosition={setSelectPosition}
        setCountryData={setCountryData}
      />

      <Map selectPosition={selectPosition} />
    </>
  );
}

export default App;
