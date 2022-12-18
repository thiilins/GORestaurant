import React, { createContext, useContext, useCallback } from "react";
import _ from "lodash";
import usePersistedState from "../hooks/usePersistedState";
import foodsDB from "../data/foods";
import { ThemeProvider as DefaultTheme } from "styled-components";
import { FoodType } from "../types";
interface IFoodData {
  data: FoodType;
}
interface IFoodDataArray {
  data: FoodType[];
}
interface IFoodContext {
  getFoods: (food_id?: number) => IFoodDataArray;
  toggleAvailable: (food_id: number) => boolean;
  updateFood: (food_id: number, food: FoodType) => IFoodData;
  addFood: (food: FoodType) => IFoodData;
  deleteFood: (food_id: number) => void;
}

const FoodContext = createContext<IFoodContext>({} as IFoodContext);
interface IFoodProvider {
  children: React.ReactNode;
}
const FoodProvider: React.FC<IFoodProvider> = ({ children }) => {
  const [foods, setFoods] = usePersistedState<FoodType[]>("foods", foodsDB);
  const toggleAvailable = useCallback((food_id: number) => {
    const nFoods = _.clone(foods);
    const selectedFood = nFoods.find((food) => food.id === +food_id)!;
    const newStatus = !selectedFood.available;
    selectedFood.available = newStatus;
    setFoods(nFoods);
    return newStatus;
  }, []);
  const addFood = useCallback((food: FoodType) => {
    const id = foods.length + 1;
    setFoods([...foods, { ...food, id }]);
    return { data: food };
  }, []);

  const updateFood = useCallback((food_id: number, food: FoodType) => {
    const nFoods = _.clone(foods);
    nFoods.filter((item) => item.id !== food_id).push(food);
    setFoods(nFoods);
    return { data: food };
  }, []);

  const getFoods = useCallback((food_id?: number) => {
    return {
      data: foods.filter((food) => (food_id ? food.id === food_id : food)),
    };
  }, []);

  const deleteFood = useCallback((food_id: number) => {
    const nFoods = foods.filter((food) => food.id !== +food_id)!;
    setFoods(nFoods);
  }, []);
  return (
    <FoodContext.Provider
      value={{
        toggleAvailable,
        addFood,
        deleteFood,
        updateFood,
        getFoods,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

function useFoods(): IFoodContext {
  return useContext(FoodContext);
}

export { FoodProvider, useFoods };
