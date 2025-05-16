import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, updateFilteredData] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const toCamelCase = (str) => {
    return str.toLowerCase().replace(/(?:(^.)|(\s+.))/g, function (match) {
      return match.charAt(match.length - 1).toUpperCase();
    });
  };

  const filterCountries = (countries, search) => {
    let filteredCountries = countries.filter((country) =>
      country.common.includes(search)
    );
    // console.log(filteredCountries);
    if (filteredCountries.length) {
      updateFilteredData(filteredCountries);
    } else {
      updateFilteredData([]);
    }
  };

  useEffect(() => {
    if (search.length) {
      let camcelCaseSearch = toCamelCase(search);
      // console.log(camcelCaseSearch);
      filterCountries(countries, camcelCaseSearch);
    }
  }, [search]);

  useEffect(() => {
    fetch(
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setCountries(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="input_wrapper">
        <input
          type="text"
          value={search}
          placeholder="Search for countries..."
          onChange={handleChange}
        />
      </div>

      <div className="country_box">
        {search.length
          ? filteredData.map((country, index) => {
              return (
                <div className="countryCard" key={`${country.common}_${index}`}>
                  <img
                    src={country.png}
                    alt={country.common}
                    width="100px"
                    height="100px"
                  />
                  <p>{country.common}</p>
                </div>
              );
            })
          : countries.map((country, index) => {
              return (
                <div className="countryCard" key={`${country.common}_${index}`}>
                  <img
                    src={country.png}
                    alt={country.common}
                    width="100px"
                    height="100px"
                  />
                  <p>{country.common}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default App;
