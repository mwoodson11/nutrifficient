import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import SearchBar from './SearchBar';
import axios from 'axios';

const Food = props => (
    <tr>
      <td>{props.food.username}</td>
      <td>{props.food.description}</td>
      <td>{props.food.servings}</td>
      <td>{props.food.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.food._id}>edit</Link> | <a href="/create" onClick={() => { props.deleteFood(props.food._id) }}>delete</a>
      </td>
    </tr>
)

export default class FoodsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeServings = this.onChangeServings.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteFood = this.deleteFood.bind(this);
        this.state = {
          username: props.username,
          description: '',
          nbbdno: 0,
          servings: 0,
          date: new Date(),
          // users: [],
          foods: []
        };
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/foods/'+this.props.username)
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
        var ndbnum = str.substr(0,str.indexOf(','));
        var desc = str.substr(str.indexOf(',')+1);
        console.log(ndbnum);
        console.log(desc);
        this.setState({
          description: desc,
          ndbno: ndbnum
        });
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
          .then(res => {
            console.log(res.data);
            this.props.history.push('/foodslist')
          });
      }

  render() {
    return (
      <div>
        <h3>Logged Food</h3>
        <table className="table">
            <thead className="thead-light">
            <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Servings</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            { this.foodList() }
            </tbody>
        </table>


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