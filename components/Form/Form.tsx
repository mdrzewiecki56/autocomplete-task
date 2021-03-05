import React, { useState, useEffect } from "react";
import { getCities } from "../../actions/cities.actions";
import { getStreets } from "../../actions/streets.actions";
import AutoComplete from "./AutoComplete/AutoComplete";

interface Props {}

const Form: React.FC<Props> = () => {
  const [city, setCity] = useState<string | null>("Warszawa");
  const [street, setStreet] = useState<string | null>(null);
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  const getAvailableStreets = async (q) => {
    return city ? getStreets(city, q) : [];
  };

  useEffect(() => {
    getCities().then((res) => setAvailableCities(res));
  }, []);

  useEffect(() => {
    setStreet(null);
  }, [city]);

  return (
    <form className="w-9/12 max-w-md">
      <label className="block">
        <span className="text-gray-700">City</span>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Warszawa"
          onChange={({ target }) => setCity(target.value)}
        >
          {availableCities.map((aC, idx) => (
            <option key={idx} value={aC}>
              {aC}
            </option>
          ))}
        </select>
      </label>
      <label className="block mt-5">
        <span className="text-gray-700">Street</span>
        <AutoComplete
          value={street}
          onOptionSelect={setStreet}
          optionsGetter={getAvailableStreets}
        />
      </label>
    </form>
  );
};

export default Form;
