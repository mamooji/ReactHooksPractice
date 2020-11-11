import React, { useState, useEffect, useCallback } from "react";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

const Ingredients = (props) => {
  const [ingredientsState, setIngredientsState] = useState([]);

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", ingredientsState);
  }, [ingredientsState]);

  const searchIngredientsHandler = useCallback((searchResult) => {
    setIngredientsState(searchResult);
  }, []);

  const addIngredientHandler = (ingredient) => {
    //browser function
    //will send a http request
    //by default will be a GET request
    fetch(
      "https://react-hooks-practice-740b5.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setIngredientsState((prevIngredientsState) => [
          ...prevIngredientsState,
          { id: responseData.name, ...ingredient },
        ]);
      });
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
        <Search onLoadIngredients={searchIngredientsHandler} />
        <IngredientList
          ingredients={ingredientsState}
          onRemoveItem={removeIntgredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
