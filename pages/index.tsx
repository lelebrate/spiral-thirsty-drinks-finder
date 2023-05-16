"use client"

import React, { useState, useEffect, ChangeEvent } from "react";
import DrinksList from "../components/DrinksList";

interface IDrink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export default function Home() {
  const [searchResults, setSearchResults] = useState<IDrink[]>([]);
  const [inputValue, setInputValue] = useState("");

  const searchHandler = async (input: string) => {
    const req = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`
    );

    const data: { drinks: IDrink[] } = await req.json();
    setSearchResults(data.drinks);
  };

  useEffect(() => {
    searchHandler(inputValue);
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const resetInputField = () => {
    setInputValue("");
  };

  return (
    <div className="flex flex-col items-center px-4">
      <div className="relative w-full mt-4">
        <span className="absolute left-0 top-0 mt-2 ml-2 text-lg">&#128270;</span>
        <input
          className="w-full p-2 pl-9 text-xl bg-gray-200 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-200"
          placeholder="Find a drink"
          onChange={handleInputChange}
          value={inputValue}
        />
        {inputValue && <span className="absolute right-0 top-0 mt-2 mr-2 text-lg cursor-pointer" onClick={resetInputField}>&#10006;</span>}
      </div>
      <div className="w-full items-center mt-4">
        {searchResults?.map((drink) => {
          return <DrinksList drink={drink} key={drink.idDrink} />;
        })}
      </div>
    </div>
  );
}
