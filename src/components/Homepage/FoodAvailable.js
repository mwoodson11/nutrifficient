import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import {makeData} from "./Utils";
import {Link, withRouter} from 'react-router-dom';
import { NUTRIENT_ENDPOINT } from "../../usdaAPI";
import Popup from './Popup';


const Food = props => (
  <tr>
    <td>{props.food.username}</td>
    <td>{props.food.description}</td>
    <td>{props.food.servings}</td>
    <td>{props.food.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.food._id}>edit</Link> | <a href="#" onClick={() => { props.deleteFood(props.food._id) }}>delete</a>
    </td>
  </tr>
)


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
        this.deleteFood = this.deleteFood.bind(this);

        this.state = {
          id: '',
          username: props.username,
          description: 'food name',
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
        // axios.get('http://localhost:5000/users/')
        //     .then(response => {
        //         if (response.data.length > 0) {
        //         this.setState({ 
        //             users: response.data.map(user => user.username),
        //             username: response.data[0].username
        //         });
        //         }
        // })
        //     .catch((error) => {
        //         console.log(error);
        //     })

        axios.get('http://localhost:5000/foods/pantry/'+this.props.username)
        .then(response => {
          this.setState({ foods: response.data });
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
        // console.log(e)
        // this.setState({
        //   popupInput: e.target.value
        // });
        {/*Still need to query and edit the value */}
        console.log("value");
        
        console.log(e.target);
        console.log(this.state.popupInput)
        const food = {
          servings: this.state.popupInput
        }
        axios.post('http://localhost:5000/foods/updateServ/'+this.state.id, food)
            .then(res => {
              console.log(res.data);
              axios.get('http://localhost:5000/foods/log/'+this.state.username)
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

      handleEdit(id){
        console.log(id);

      }

      deleteFood(id) {
        axios.delete('http://localhost:5000/foods/'+id)
            .then(res => console.log(res.data));
        this.setState({
            exercises: this.state.foods.filter(el => el._id !== id)
        })
      }

      foodList() {
        return this.state.foods.map(currentfood => {
          return <Food food={currentfood} deleteFood={this.deleteFood} key={currentfood._id}/>;
        })
      }

      // onChangeUsername(e) {
      //   this.setState({
      //     username: e.target.value
      //   });
      // }
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
        if (errors.length != 0) {
          this.setState({errors});
          return;
        }

        fetch(NUTRIENT_ENDPOINT(this.state.fdcId))
          .then(res => res.json())
          .then(listObj => {
            console.log(listObj);
            var nutList = [];
            listObj.foodNutrients.forEach(nutr => {
              // console.log(nutr.nutrient);
              if (nutr.nutrient.id == 1003) {
                this.setState({protein: nutr.amount});
              } else if (nutr.nutrient.id == 1005) {
                this.setState({carbs: nutr.amount});
              } else if (nutr.nutrient.id == 1004) {
                this.setState({fats: nutr.amount});
              } else if (nutr.nutrient.id == 1093) {
                this.setState({sodium: nutr.amount});
              } else if (nutr.nutrient.id == 1087) {
                this.setState({calcium: nutr.amount});
              } else if (nutr.nutrient.id == 1162) {
                this.setState({vitaminC: nutr.amount});
              } else if (nutr.nutrient.id == 1089) {
                this.setState({iron: nutr.amount});
              }
            })
            // this.setState({
            //   apiSearchList: listObj.foods
            // })
          })
          .then( () => {
            const food = {
              username: this.state.username,
              description: this.state.description,
              fdcId: this.state.fdcId,
              servings: this.state.servings,
              date: this.state.date,
              protein: this.state.protein,
              carbs: this.state.carbs,
              fats: this.state.fats,
              sodium: this.state.sodium,
              calcium: this.state.calcium,
              vitaminC: this.state.vitaminC,
              iron: this.state.iron,
              pantry: this.state.pantry
            };
    
          console.log(food);
          axios.post('http://localhost:5000/foods/add', food)
            .then(res => {
              console.log(res.data);
              axios.get('http://localhost:5000/foods/log/'+this.state.username)
                .then(response => {
                  this.setState({ foods: response.data });
                  console.log("Updated food.");
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
              width:100,
              accessor: "_id",
              Cell: row => (
                <div>
                    <button onClick={e => this.popupOpen(e, row.original)}>Edit</button>
                    {/* <button onClick={() => this.handleEdit(row.original)}>Edit</button> */}
                    <button onClick={() => this.handleDelete(row.original._id)}>Delete</button>
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
            <input type="submit" value="Create Food Log" className="btn btn-primary" />
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

