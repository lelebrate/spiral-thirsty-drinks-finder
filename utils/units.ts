import { unitToOunceConverter } from "../constants/units";

interface IIngredient {
    ingredient: string | null;
    measure: string | null;
}

interface IDrink {
    strDrink: string;
    strDrinkThumb: string;
    strIngredient1: string | null;
    strIngredient2: string | null;
    strIngredient3: string | null;
    strIngredient4: string | null;
    strIngredient5: string | null;
    strIngredient6: string | null;
    strIngredient7: string | null;
    strIngredient8: string | null;
    strIngredient9: string | null;
    strIngredient10: string | null;
    strIngredient11: string | null;
    strIngredient12: string | null;
    strIngredient13: string | null;
    strIngredient14: string | null;
    strIngredient15: string | null;
    strMeasure1: string | null;
    strMeasure2: string | null;
    strMeasure3: string | null;
    strMeasure4: string | null;
    strMeasure5: string | null;
    strMeasure6: string | null;
    strMeasure7: string | null;
    strMeasure8: string | null;
    strMeasure9: string | null;
    strMeasure10: string | null;
    strMeasure11: string | null;
    strMeasure12: string | null;
    strMeasure13: string | null;
    strMeasure14: string | null;
    strMeasure15: string | null;
  }

export const getNumericalOunceAmountFromMeasure = (measure: string): number | null => {
  let amount = 0;
  const measureArray = measure.split(" ");
  // Chek if first value of measure string is number. If not, never keep on going
  if (measureArray[0] && isNaN(parseFloat(measureArray[0]))) {
    return null;
  }
  amount = eval(measureArray[0]);
  // Check if second value of measure string is number.
  // If yes, a fraction and need to be evaluated,
  // if not, determine if it is a convertable unit
  if (measureArray[1] && isNaN(parseFloat(measureArray[1]))) {
    // is not number should be checked as convertible to ounces
    const conversionCoefficient =
      unitToOunceConverter[measureArray[1]?.toLowerCase()];
    if (conversionCoefficient) {
      // is a convertable unit so should convert to ounces
      return amount * conversionCoefficient;
    }
    // is not a convertible unit so no need to capture as number data
    return null;
  } else {
    amount += eval(measureArray[1]);
    const conversionCoefficient =
      unitToOunceConverter[measureArray[2]?.toLowerCase()];
    if (conversionCoefficient) {
      // convertable unit so should convert to ounces
      return amount * conversionCoefficient;
    }
    // not a convertible unit so don't need to capture as number data
    return null;
  }
};

export const getPieChartData = (ingredients: IIngredient[]): (number | null)[] => {
  return ingredients.map(({ measure }) => {
    if (measure) {
      return getNumericalOunceAmountFromMeasure(measure);
    }
    return null;
  });
};

export const isPieChartDataEmpty = (data: (number | null)[]): boolean => {
  let isEmpty = true;
  data?.forEach((entry) => {
    if (entry) {
      isEmpty = false;
    }
  });
  return isEmpty;
};

export const getIngredientsList = (drink: IDrink): IIngredient[] => {
  const ingredientsList = [
    {
      ingredient: drink?.strIngredient1?.trim(),
      measure: drink?.strMeasure1?.trim(),
    },
    {
      ingredient: drink?.strIngredient2?.trim(),
      measure: drink?.strMeasure2?.trim(),
    },
    {
      ingredient: drink?.strIngredient3?.trim(),
      measure: drink?.strMeasure3?.trim(),
    },
    {
      ingredient: drink?.strIngredient4?.trim(),
      measure: drink?.strMeasure4?.trim(),
    },
    {
      ingredient: drink?.strIngredient5?.trim(),
      measure: drink?.strMeasure5?.trim(),
    },
    {
      ingredient: drink?.strIngredient6?.trim(),
      measure: drink?.strMeasure6?.trim(),
    },
    {
      ingredient: drink?.strIngredient7?.trim(),
      measure: drink?.strMeasure7?.trim(),
    },
    {
      ingredient: drink?.strIngredient8?.trim(),
      measure: drink?.strMeasure8?.trim(),
    },
    {
      ingredient: drink?.strIngredient9?.trim(),
      measure: drink?.strMeasure9?.trim(),
    },
    {
      ingredient: drink?.strIngredient10?.trim(),
      measure: drink?.strMeasure10?.trim(),
    },
    {
      ingredient: drink?.strIngredient11?.trim(),
      measure: drink?.strMeasure11?.trim(),
    },
    {
      ingredient: drink?.strIngredient12?.trim(),
      measure: drink?.strMeasure12?.trim(),
    },
    {
      ingredient: drink?.strIngredient13?.trim(),
      measure: drink?.strMeasure13?.trim(),
    },
    {
      ingredient: drink?.strIngredient14?.trim(),
      measure: drink?.strMeasure14?.trim(),
    },
    {
      ingredient: drink?.strIngredient15?.trim(),
      measure: drink?.strMeasure15?.trim(),
    },
  ];

  return ingredientsList;
};
