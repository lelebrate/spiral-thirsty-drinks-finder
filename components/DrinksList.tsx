import React from "react";
import Link from "next/link";

interface IDrink {
	idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface DrinksListProps {
  drink: IDrink;
}

const DrinksList: React.FC<DrinksListProps> = ({ drink }) => {
  return (
    <Link legacyBehavior href={`/drinks/${drink?.strDrink}`} passHref>
      <a className="flex items-center w-full bg-white border-t-2 border-gray-300 h-15">
        <img 
          src={drink.strDrinkThumb} 
          alt={drink.strDrink} 
          className="w-10 h-10 m-2.5 rounded-full"
        />
        <h2 className="text-base font-semibold self-center mx-2.5">{drink.strDrink}</h2>
        <span className="ml-auto mr-4 text-lg text-gray-500">&gt;</span>
      </a>
    </Link>

  );
};

export default DrinksList;


