import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import SearchBar from './SearchBar';
import axios from 'axios';
import { NUTRIENT_ENDPOINT } from "../../usdaAPI";
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { formatDate } from './Utils';


// const Food = props => (
//     <tr>
//       {/* <td>{props.food.username}</td> */}
//       <td>{props.food.description}</td>
//       <td>{props.food.servings}</td>
//       <td>{props.food.protein}</td>
//       <td>{props.food.carbs}</td>
//       <td>{props.food.fats}</td>
//       <td>{props.food.sodium}</td>
//       <td>{props.food.calcium}</td>
//       <td>{props.food.vitaminC}</td>
//       <td>{props.food.iron}</td>
//       <td>{props.food.date.substring(0,10)}</td>
//       <td>
//         <Link to={"/edit/"+props.food._id}>edit</Link> | <a href="/create" onClick={() => { props.deleteFood(props.food._id) }}>delete</a>
//       </td>
//     </tr>
// )

export default class FoodsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeServings = this.onChangeServings.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
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
          pantry: false,
          // users: [],
          foods: []
        };
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/foods/log/'+this.props.username)
         .then(response => {
           this.setState({ foods: response.data });
         })
         .catch((error) => {
            console.log(error);
         })
      }

      handleChangeValue = e => {
        console.log(e.target.value);
        var str = e.target.value;
        var fdc = str.substr(0,str.indexOf(','));
        var desc = str.substr(str.indexOf(',')+1);
        console.log(fdc);
        console.log(desc);
        this.setState({
          description: desc,
          fdcId: fdc
        });
      }

    handleDelete(id) {
      axios.delete('http://localhost:5000/foods/'+id)
          .then(res => console.log(res.data));
      this.setState({
          foods: this.state.foods.filter(el => el._id !== id)
  })
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
      onChangeDate(date) {
        this.setState({
          date: date
        });
      }

      onSubmit(e) {
        e.preventDefault();
        fetch(NUTRIENT_ENDPOINT(this.state.fdcId))
          .then(res => res.json())
          .then(listObj => {
            console.log(listObj);
            // var nutList = [];
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
            var forDate = formatDate(this.state.date);
            
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
                // var temp = this.state.foods;
                // temp.push(food);
                axios.get('http://localhost:5000/foods/log/'+this.state.username)
                  .then(response => {
                    this.setState({ foods: response.data });
                    console.log(this.state.foods);
                  })
              })
          })
          
          .catch((error) => {
            console.log(error);
        });
      }

  render() {
    const datas = this.state.foods;
    // console.log(datas);
    // datas.forEach((ele) => {
    //   if (ele.servings != 1) {
    //     console.log(ele)
    //     ele.protein *= ele.servings;
    //     ele.carbs *= ele.servings;
    //     ele.fats *= ele.servings;
    //     ele.sodium *= ele.servings;
    //     ele.calcium *= ele.servings;
    //     ele.vitaminC *= ele.servings;
    //     ele.iron *= ele.servings;
    //   }
    // })
    // console.log(datas);
    return (
      <div>
        <h3>Logged Food</h3>
        <ReactTable
          data = {datas}
          columns = {[
            {
              Header: "Description",
              accessor: "description",
              width: 300
            },
            {
              Header: "Servings",
              accessor: "servings",
              width: 75
            },
            {
              Header:"Protein",
              accessor: "protein",
              width: 75,
              Cell: row => (
                <div>
                    {row.original.protein * row.original.servings} g
                </div>
              )
            }, 
            {
              Header:"Carbs",
              accessor:"carbs",
              width: 75,
              Cell: row => (
                <div>
                    {row.original.carbs * row.original.servings} g
                </div>
              )
            },
            {
              Header: "Fats",
              accessor: "fats",
              width: 75,
              Cell: row => (
                <div>
                    {row.original.fats * row.original.servings} g
                </div>
              )
            },
            {
              Header: "Sodium",
              accessor: "sodium",
              width: 75,
              Cell: row => (
                <div>
                    {row.original.sodium * row.original.servings} mg
                </div>
              )
            },
            {
              Header: "Calcium",
              accessor: "calcium",
              width: 75,
              Cell: row => (
                <div>
                    {row.original.calcium * row.original.servings} mg
                </div>
              )
            },
            {
              Header: "Vitamin C",
              accessor: "vitaminC",
              width: 75,
              Cell: row => (
                <div>
                    {row.original.vitaminC * row.original.servings} mg
                </div>
              )
            },
            {
              Header: "Iron",
              accessor: "iron",
              width: 75,
              Cell: row => (
                <div>
                    {row.original.iron * row.original.servings} mg
                </div>
              )
            },
            {
              Header: "Vitamin A",
              accessor: "vitaminA",
              width: 75,
              Cell: row => (
                <div>
                    {row.original.vitaminA * row.original.servings} mg
                </div>
              )
            },
            {
              Header: "Vitamin E",
              accessor: "vitaminE",
              width: 75,
              Cell: row => (
                <div>
                    {row.original.vitaminE * row.original.servings} mg
                </div>
              )
            },
            {
              Header: "Potassium",
              accessor: "potassium",
              width: 75,
              Cell: row => (
                <div>
                    {row.original.potassium * row.original.servings} mg
                </div>
              )
            },
            {
              Header: "Magnesium",
              accessor: "magnesium",
              width: 75,
              Cell: row => (
                <div>
                    {row.original.magnesium * row.original.servings} mg
                </div>
              )
            },
            {
              Header: "Fiber",
              accessor: "fiber",
              width: 75,
              Cell: row => (
                <div>
                    {row.original.fiber * row.original.servings} mg
                </div>
              )
            },
            {
              Header: "Date",
              accessor: "date",
              width: 100,
              Cell: row => (
                <div>
                  {row.original.date}
                </div>
              )
            },
            {
              Header: "",
              width: 100,
              Cell: row => (
                <div>
                    <button onClick={() => this.handleDelete(row.original._id)}>Delete</button>
                </div>
              )
            }

          ]}
          defaultPageSize = {20}
          style = {{
            height: "400px"
          }}
          className = '-striped -highlight'
          />



        <h3>Create New Food Log</h3>

        <SearchBar value={this.state.description} onChangeValue={this.handleChangeValue}/>
        <form onSubmit={this.onSubmit}>
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
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Food Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}