import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { Pie } from "react-chartjs-2";
import { colorScale } from "../../constants/colors";
import IngredientLabel from "../../components/IngredientLabel";
import { getIngredientsList, getPieChartData, isPieChartDataEmpty } from "../../utils/units";
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

interface IDrink {
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
}

interface DrinkProps {
  drink: IDrink;
}

const Drink: React.FC<DrinkProps> = ({ drink }) => {
  const renderIngredientLabels = (ingredients: any) => {
    return ingredients?.map(({ ingredient, measure }, index) => {
      return (
        <React.Fragment key={index}>
          {ingredient && measure && (
            <IngredientLabel
              label={`${ingredient} (${measure})`}
              color={colorScale[index]}
            />
          )}
        </React.Fragment>
      );
    });
  };
  

  const ingredientsList = getIngredientsList(drink);

  const pieChartData = getPieChartData(ingredientsList);
  const data = {
    labels: [],
    datasets: [
      {
        data: getPieChartData(ingredientsList),
        backgroundColor: colorScale,
        hoverBackgroundColor: colorScale,
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{drink?.strDrink}</title>
      </Head>
      <Link href="/" passHref>
        <div className="bg-gray-200 p-4 cursor-pointer relative flex justify-center items-center">
            <h3 className="absolute left-2 text-blue-600">{"< Thirsty"}</h3>
            <h2 className="text-xl font-bold">{drink?.strDrink}</h2>
        </div>
      </Link>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col w-full p-4 sm:p-8 max-w-sm mx-auto sm:max-w-xl text-center">
          <img 
            className="object-cover rounded-full mx-auto mt-8"
            src={`${drink?.strDrinkThumb}/preview`}
            width={250}
            height={250}
            alt=""
          />
          <div className="text-xl font-bold mt-5 text-center">{drink?.strDrink}</div>
        </div>

        <div className="flex flex-col w-full p-4 sm:p-8 max-w-sm mx-auto sm:max-w-xl text-left">
          <div className="font-semibold text-base ml-5 mt-8 mb-5">Ingredients</div>
          <div className="flex flex-row justify-between items-start mt-8 mb-5">
            <div className="w-1/2 mr-2">
              {renderIngredientLabels(ingredientsList)}
            </div>
            <div className="w-1/2 ml-2 mt-5">
              {isPieChartDataEmpty(pieChartData) ? (
                <div className="text-red-500">
                  Cannot display graph for this drink
                </div>
              ) : (
                <div className="w-28 h-28">
                  <Pie 
                    data={data} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      layout: {
                        padding: {
                          left: 0,
                          right: 0,
                          top: 0,
                          bottom: 0
                        }
                      },
                      aspectRatio: 1,
                      plugins: {
                        legend: {
                          display: false
                        }
                      }
                    }} 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full p-4 sm:p-8 max-w-sm mx-auto sm:max-w-xl mb-5 text-left text-lg overflow-auto">
          <p>{drink?.strInstructions}</p>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const req = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${params?.id}`
  );

  if (req.ok) {
    const data = await req.json();

    const { drinks } = data;

    const drink: IDrink = drinks?.[0];
    return {
      props: { drink },
    };
  }
  
  // Return an empty object as props if the request fails.
  return { props: {} };
}

export default Drink;
