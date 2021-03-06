import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import "react-datepicker/dist/react-datepicker.css";
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import {makeData, formatDate} from "./Utils";
import { NUTRIENT_ENDPOINT } from "../../usdaAPI";
import Popup from './Popup';


export default class FoodAvailable extends Component {
    constructor(props) {
        super(props);
        // this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeServings = this.onChangeServings.bind(this);
        // this.onChangeDate = this.onChangeDate.bind(this);
        this.handlePopupChange = this.handlePopupChange.bind(this);
        this.handlePopupSubmit = this.handlePopupSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          id: '',
          username: props.username,
          description: '',
          fdcId: 0,
          servings: 0,
          date: new Date(),
          protein: 0,
          carbs: 0,
          fats: 0,
          sodium: 0,
          calcium: 0,
          vitaminC: 0,
          iron: 0,
          vitaminA: 0,
          vitaminE: 0,
          potassium: 0,
          magnesium: 0,
          fiber: 0,
          // users: [],
          pantry: true,
          data: makeData(),
          foods: [],
          errors: [],
          popup: false,
          popupInput : 0, //possible to have this equal the current food serving?

        }
      }

      componentDidMount() {

        axios.get('http://localhost:5000/foods/pantry/'+this.props.username)
        .then(response => {
          this.setState({ foods: response.data });
          console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
      }

      handlePopupChange(e) {
        this.setState({
          popupInput: e.target.value
        });
      }

      handlePopupSubmit(e) {

        console.log(this.state.popupInput)
        const food = {
          servings: this.state.popupInput
        }
        axios.post('http://localhost:5000/foods/updateServ/'+this.state.id, food)
            .then(res => {
              console.log(res.data);
              axios.get('http://localhost:5000/foods/pantry/'+this.state.username)
                .then(response => {
                  this.setState({ foods: response.data });
                  console.log("Updated food.");
                })
            })
            .then(() => {
              this.popupClose();
            })
      }

      popupOpen(e, food) {
        console.log(food);
        this.setState({
          popup: true,
          description: food.description,
          id: food._id,
          popupInput: food.servings
        });
      }

      popupClose() {
        this.setState({
          popupInput: 0,
          popup: false
        })
      }

      handleChangeValue = e => {
        console.log(e.target.value);
        var str = e.target.value;
        var fdc = str.substr(0,str.indexOf(','));
        var desc = str.substr(str.indexOf(',')+1);
        this.setState({
          description: desc,
          fdcId: fdc
        });
      }

      handleDelete(id){
        axios.delete('http://localhost:5000/foods/'+id)
            .then(res => console.log(res.data));
        this.setState({
            foods: this.state.foods.filter(el => el._id !== id)
        })
      }

      handleMove(id){
        axios.post('http://localhost:5000/foods/addtolog/'+id)
            .then(res => {
              console.log(res.data);
              this.setState({
                foods: this.state.foods.filter(el => el._id !== id)
              });
            });
      }

      handleEdit(id){
        console.log(id);

      }

      onChangeDescription(e) {
        this.setState({
          description: e.target.value
        });
      }
      onChangeServings(e) {
        this.setState({
          servings: e.target.value
        });
      }

      onSubmit(e) {
        e.preventDefault();
        const errors = validateServings(this.state.servings);
        if (errors.length !== 0) {
          this.setState({errors});
          return;
        }

        fetch(NUTRIENT_ENDPOINT(this.state.fdcId))
          .then(res => res.json())
          .then(listObj => {
            console.log(listObj);
            listObj.foodNutrients.forEach(nutr => {
              // console.log(nutr.nutrient);
              if (nutr.nutrient.id === 1003) {
                this.setState({protein: nutr.amount});
              } else if (nutr.nutrient.id === 1005) {
                this.setState({carbs: nutr.amount});
              } else if (nutr.nutrient.id === 1004) {
                this.setState({fats: nutr.amount});
              } else if (nutr.nutrient.id === 1093) {
                this.setState({sodium: nutr.amount});
              } else if (nutr.nutrient.id === 1087) {
                this.setState({calcium: nutr.amount});
              } else if (nutr.nutrient.id === 1162) {
                this.setState({vitaminC: nutr.amount});
              } else if (nutr.nutrient.id === 1089) {
                this.setState({iron: nutr.amount});
              } else if (nutr.nutrient.id === 1106) {
                this.setState({vitaminA: nutr.amount});
              } else if (nutr.nutrient.id === 1109) {
                this.setState({vitaminE: nutr.amount});
              } else if (nutr.nutrient.id === 1092) {
                this.setState({potassium: nutr.amount});
              } else if (nutr.nutrient.id === 1090) {
                this.setState({magnesium: nutr.amount});
              } else if (nutr.nutrient.id === 1079) {
                this.setState({fiber: nutr.amount});
              }
            })
            // this.setState({
            //   apiSearchList: listObj.foods
            // })
          })
          .then( () => {
            const forDate = formatDate(this.state.date);
            const food = {
              username: this.state.username,
              description: this.state.description,
              fdcId: this.state.fdcId,
              servings: this.state.servings,
              date: forDate,
              protein: this.state.protein,
              carbs: this.state.carbs,
              fats: this.state.fats,
              sodium: this.state.sodium,
              calcium: this.state.calcium,
              vitaminC: this.state.vitaminC,
              iron: this.state.iron,
              vitaminA: this.state.vitaminA,
              vitaminE: this.state.vitaminE,
              potassium: this.state.potassium,
              magnesium: this.state.magnesium,
              fiber: this.state.fiber,
              pantry: this.state.pantry
            };
    
          console.log(food);
          axios.post('http://localhost:5000/foods/add', food)
            .then(res => {
              console.log(res.data);
              axios.get('http://localhost:5000/foods/pantry/'+this.state.username)
                .then(response => {
                  this.setState({ foods: response.data });
                  console.log(this.state.foods);
                })
            });
          })
          .catch(err =>
            this.setState({
              fetchApiSearchListErr: err.message
            })
          );
        
      //   const food = {
      //     username: this.state.username,
      //     description: this.state.description,
      //     fdcId: this.state.fdcId,
      //     servings: this.state.servings,
      //     date: this.state.date,
      //     pantry: this.state.pantry
      //   };

      // console.log(food);
      // axios.post('http://localhost:5000/foods/add', food)
      //   .then(res => {
      //     console.log(res.data);
      //     this.props.history.push('/create')
      //   });
      // window.location = '/create';

      //Reload current page
      

      }

  render() {
    const data = this.state.foods;
    return (
      <div>
        <h3>Food Items Available</h3>
        <ReactTable 
          data = {data}
          columns = {[
            {
              Header: "Food",
              //Cell:
              accessor:"description",//this.state.foods.map(currentfood => {
                //return this.props.food.description
              //})
              width: 600

            },
            {
              Header: "Servings",
              // id: "lastName",
              accessor: "servings",
              width: 150
            },
            {
              Header: "",
              width:200,
              accessor: "_id",
              Cell: row => (
                <div>
                    <button onClick={e => this.popupOpen(e, row.original)}>Edit</button>
                    {/* <button onClick={() => this.handleEdit(row.original)}>Edit</button> */}
                    <button onClick={() => this.handleDelete(row.original._id)}>Delete</button>
                    <button onClick={() => this.handleMove(row.original._id)}>Log Meal</button>
                </div>
              )
            }
          ]}
          defaultPageSize = {20}
          style = {{
            height: "400px"
          }}
          className='-striped -highlight'
          />
          <Popup show = {this.state.popup} handleClose = {e => this.popupClose(e)}>
            <div className = "form-group">
            <label>Edit Servings for </label><i> {this.state.description}</i>
            <input 
              type = "text"
              value = {this.state.popupInput}
              name = "popupInput"
              onChange = {this.handlePopupChange}
              className = "form-control"
            />
            </div>
            <div className = "form-group">
            <button onClick = {this.handlePopupSubmit} type = "button">
            Save
            </button>
            </div>
            </Popup>







      
        <h3>Add to Pantry</h3>

        <SearchBar value={this.state.description} onChangeValue={this.handleChangeValue}/>
        <form onSubmit={this.onSubmit}>
          {this.state.errors.map(error => (
          <p key={error}>Error: {error}</p>
          ))}
          <div className="form-group"> 
            <label>Description: </label>
            {/* <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                /> */}
            <div><b>{this.state.description}</b></div>
          </div>
          <div className="form-group">
            <label>Servings: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.servings}
                onChange={this.onChangeServings}
                />
          </div>
          {/* <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div> */}

          <div className="form-group">
            <input type="submit" value="Add Item" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}

function validateServings(servings) {
  const errors = [];
  if (servings === 0 ) {
    errors.push("Serving must be bigger than 0.");
  }
  return errors;
}

