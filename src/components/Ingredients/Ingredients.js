import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
const Ingredients = (props) => {
  const [ingredientsState, setIngredientsState] = useState([]);
  const addIngredientHandler = (ingredient) => {
    setIngredientsState((prevIngredientsState) => [
      ...prevIngredientsState,
      { id: Math.random().toString(), ...ingredient },
    ]);
  };
  const removeIntgredientHandler = (ingredientId) => {
    setIngredientsState((prevIngredientsState) =>
      prevIngredientsState.filter(
        (ingredientsState) => ingredientsState.id !== ingredientId
      )
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList
          ingredients={ingredientsState}
          onRemoveItem={removeIntgredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
