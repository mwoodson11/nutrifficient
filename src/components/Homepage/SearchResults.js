import React, { Component } from "react";
import PropTypes from "prop-types";

class SearchResults extends Component {
  passSelectedFood = () => this.props.trackFood(this.selectedFood.value);
  render() {
    return (
      <select
        className="select-food"
        ref={opVal => (this.selectedFood = opVal)}
        onChange={this.passSelectedFood}
      >
        <option value="" />
        {this.props.optionList.map(foodEl => (
          <option key={foodEl.ndbno} value={foodEl.ndbno}>
            {foodEl.name}
          </option>
        ))}
      </select>
    );
  }
}

SearchResults.propTypes = {
  trackFood: PropTypes.func.isRequired
};

export default SearchResults;
