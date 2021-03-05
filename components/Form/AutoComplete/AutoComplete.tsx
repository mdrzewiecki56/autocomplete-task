import React, { useState, useEffect, useRef } from "react";

interface Props {
  onOptionSelect: React.Dispatch<React.SetStateAction<string | null>>;
  optionsGetter: (query: any) => Promise<any>;
  value: string;
}

const AutoComplete: React.FC<Props> = ({
  onOptionSelect,
  optionsGetter,
  value,
}) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState(null);
  const [loading, toggleLoading] = useState(true);
  const [isInputFocused, toggleIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  const handleOptionClick = (optionValue: string) => {
    inputRef.current.value = optionValue;
    onOptionSelect(optionValue);
  };

  const getOptionListVariant = () => {
    if (loading) {
      return <li className={"text-gray-400 cursor-wait"}>Loading...</li>;
    } else if (options.length) {
      return options.map((o, idx) => (
        <li
          key={idx}
          className={"py-3 px-2 cursor-pointer hover:bg-gray-100"}
          onClick={() => handleOptionClick(o)}
        >
          {o}
        </li>
      ));
    }
    return <li className={"py-3 px-2 text-gray-400"}>No streets matched</li>;
  };

  useEffect(() => {
    optionsGetter(query).then((res) => setOptions(res));
  }, [query]);

  useEffect(() => {
    if (options) {
      toggleLoading(false);
    }
  }, [options]);

  useEffect(() => {
    inputRef.current.value = value;
    setQuery("");
  }, [value]);

  return (
    <div className="AutoComplete">
      <input
        type="text"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder={"Aleje Jerozolimskie"}
        onChange={({ target }) => setQuery(target.value)}
        onFocus={() => toggleIsInputFocused(true)}
        onBlur={() => setTimeout(() => toggleIsInputFocused(false), 100)}
        ref={inputRef}
      />
      <ul
        className={`AutoComplete__OptionList block w-full rounded-bl-md rounded-br-md border-gray-900 shadow-md py-3 divide-y divide-gray-200 ${
          isInputFocused ? "" : "hidden"
        }`}
      >
        {getOptionListVariant()}
      </ul>
    </div>
  );
};

export default AutoComplete;
