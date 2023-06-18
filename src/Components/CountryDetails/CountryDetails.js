import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CountryDetails.css";

const CountryDetails = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    // Fetch data from REST Countries API
    axios
      // .get("https://restcountries.com/v3.1/all")
      .get("https://restcountries.com/v3.1/name/{name}")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <h1>Country Data</h1>
      <section className="grid">
        {countries.map((country) => (
          <div key={country.name.common}>
            <p>
              <img className="flagImage" src={country.flags.svg} alt="Flag" />
            </p>
            <div className="details">
              <h2>{country.name.common}</h2>
              <p>Capital: {country.capital}</p>
              <p>Population: {country.population}</p>
              <p>Region: {country.region}</p>
              <p>Subregion: {country.subregion}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CountryDetails;
