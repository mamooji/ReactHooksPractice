import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const [enteredSearch, setEnteredSearch] = useState("");

  const { onLoadIngredients } = props;
  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (enteredSearch === inputRef.current.value) {
        const query =
          enteredSearch.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredSearch}"`;
        fetch(
          "https://react-hooks-practice-740b5.firebaseio.com/ingredients.json" +
            query
        )
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then((responseData) => {
            const loadedIngredients = [];
            console.log(responseData);
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
            }
            //....
            onLoadIngredients(loadedIngredients);
          });
      }
    }, 500);
  }, [enteredSearch, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredSearch}
            onChange={(event) => setEnteredSearch(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
