import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import {makeData} from "./Utils";
import {Link} from 'react-router-dom';

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


        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeServings = this.onChangeServings.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteFood = this.deleteFood.bind(this);

        this.state = {
          username: '',
          description: '',
          servings: 0,
          date: new Date(),
          users: [],
          data: makeData(),
          foods: []
        }
      }

      componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                this.setState({ 
                    users: response.data.map(user => user.username),
                    username: response.data[0].username
                });
                }
        })
            .catch((error) => {
                console.log(error);
            })

        axios.get('http://localhost:5000/foods/')
        .then(response => {
          this.setState({ foods: response.data });
        })
        .catch((error) => {
            console.log(error);
        })
      }

      handleDelete(id){
        
      }

      handleEdit(id){

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

      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
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
        const food = {
          username: this.state.username,
          description: this.state.description,
          servings: this.state.servings,
          date: this.state.date,
        };

      console.log(food);
      axios.post('http://localhost:5000/foods/add', food)
        .then(res => console.log(res.data));
      window.location = '/';
      }

  render() {
    const {data} = this.state.foods;
    return (
      <div>
        <h3>Food Items Available</h3>
        <ReactTable 
          data = {data}
          columns = {[
            {
              Header: "Food",
              //Cell:
              accessor:"food"//this.state.foods.map(currentfood => {
                //return this.props.food.description
              //})

            },
            {
              Header: "Amount",
              id: "lastName",
              accessor: d => d.lastName
            },
            {
              Header: "",
              Cell: row => (
                <div>
                    <button onClick={() => this.handleEdit(row.original)}>Edit</button>
                    <button onClick={() => this.handleDelete(row.original)}>Delete</button>
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








        <h3>Create New Food Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
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


