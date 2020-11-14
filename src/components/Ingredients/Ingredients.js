import React, { useState, useReducer, useEffect, useCallback } from "react";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

// const ingredientReducer = (currentIngredients, action) => {
//   switch (action.type) {
//     case "SET":
//       return action.ingredients;
//     case "ADD":
//       return [...currentIngredients, action.ingredient];
//     case "DELETE":
//       return currentIngredients.filter((ing) => ing.id !== action.id);
//     default:
//       throw new Error("Should not get there");
//   }
// };

const Ingredients = (props) => {
  // const [ingredientsState, [dispatch]] = useReducer(ingredientReducer, []);
  const [ingredientsState, setIngredientsState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", ingredientsState);
  }, [ingredientsState]);

  const searchIngredientsHandler = useCallback((searchResult) => {
    // dispatch({ type: "SET", ingredients: searchResult });
    setIngredientsState(searchResult);
  }, []);

  const addIngredientHandler = (ingredient) => {
    //browser function
    //will send a http request
    //by default will be a GET request
    setIsLoading(true);
    fetch(
      "https://react-hooks-practice-740b5.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        console.log("this is the Response", response);
        setIsLoading(false);
        return response.json();
      })
      .then((responseData) => {
        console.log("this is the Response", responseData);
        setIngredientsState((prevIngredientsState) => [
          ...prevIngredientsState,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };

  const removeIntgredientHandler = (ingredientId) => {
    setIsLoading(true);
    fetch(
      `https://react-hooks-practice-740b5.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        setIsLoading(false);
        setIngredientsState((prevIngredientsState) =>
          prevIngredientsState.filter(
            (ingredientsState) => ingredientsState.id !== ingredientId
          )
        );
      })
      .catch((error) => {
        setError("Something went wrong :(");
        setIsLoading(false);
      });
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="App">
      {error ? <ErrorModal onClose={clearError}>{error}</ErrorModal> : null}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />
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
