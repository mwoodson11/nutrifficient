import React, { Component } from "react";
import { SEARCH_ENDPOINT } from "../../usdaAPI";
import { formatedFoodQuery, kCalSum } from "./Utils";
// import SearchResults from "./SearchResults";


class SearchBar extends Component {
  //The state in which we store the query, searchlist,
  state = {
    foodQuery: "",
    apiSearchList: [],
    apiSearchListIsLoaded: false,
    fetchApiSearchListErr: undefined,
    value: '',
    selectedFoods: [],
    kcalValues: []
  };

  //AJAX request for submitting search and returning list of search results(an array)
  handleSubmit = e => {
    e.preventDefault();
    fetch(SEARCH_ENDPOINT(this.state.foodQuery))
      .then(res => res.json())
      .then(listObj => {
        console.log(listObj);
        this.setState({
          apiSearchList: listObj.foods,
          apiSearchListIsLoaded: true
        })

      })
      .catch(err =>
        this.setState({
          fetchApiSearchListErr: err.message
        })
      );
    // console.log(this.foodInput.value);
    this.foodInput.value = "";
  };

  //Setting query to state and formatting
  handleFoodQuery = e =>
    this.setState({
      foodQuery: formatedFoodQuery(e.target.value)
    });

  //setting selected foods to array  of selected foods
  handleSelectedFood = foodId => {
    if (foodId) {
      this.setState({
          value: foodId,
        selectedFoods: [
          ...this.state.selectedFoods,
          ...this.state.apiSearchList.filter(item => item.fdcId === foodId)
        ]
      });
      console.log(foodId);
      console.log(this.props);
      console.log(this.state.selectedFoods);
    //   this.props.description = foodId;
    }
  };

  //Handling energy(kcal) or ndbno number
  handleKcalValue = (kcal, ndbno) => {
    this.setState({
      kcalValues: [
        ...this.state.kcalValues,
        { ndbno: ndbno || "", kcal: kcal || 0 }
      ]
    });
  };

  render() {
    const {
      foodQuery,
      apiSearchList,
      apiSearchListIsLoaded,
      selectedFoods,
      kcalValues
    } = this.state;
    return (
      <div className="app">
        <form className="search-food-form" onSubmit={this.handleSubmit}>
          <label htmlFor="foodInput">
            <input
              id="foodInput"
              className="food-input"
              type="text"
              ref={el => (this.foodInput = el)}
              onChange={e => this.handleFoodQuery(e)}
              autoFocus
            />
          </label>
          <button
            className="search-food-btn"
            type="submit"
            disabled={foodQuery === ""}
          >
            Search for food
          </button>
        </form>

        {apiSearchListIsLoaded ? (
        //   <SearchResults
        //     optionList={apiSearchList}
        //     trackFood={this.handleSelectedFood}
        //   />
        // ) 
        // (
            <div>
            <select
                className="select-food"
                ref={opVal => (this.selectedFood = opVal)}
                onChange={(e) => this.props.onChangeValue(e)}
            >
                <option value="" />
                {apiSearchList.map(foodEl => (
                <option key={foodEl.fdcId} value={[foodEl.fdcId, foodEl.description]}>
                    {foodEl.description}
                </option>
                ))}
            </select>
            </div>
        ) : (
          <div></div>
        )}

      </div>
    );
  }
}

export default SearchBar;
