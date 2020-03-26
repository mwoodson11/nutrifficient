import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditFood extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeServings = this.onChangeServings.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      ndbno: 0,
      servings: 0,
      date: new Date(),
      // users: [],
      pantry: false
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/foods/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          ndbno: response.data.ndbno,
          servings: response.data.servings,
          date: new Date(response.data.date),
          pantry: response.data.pantry
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    // axios.get('http://localhost:5000/users/')
    //   .then(response => {
    //     this.setState({ users: response.data.map(user => user.username) });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
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
      ndbno: this.state.ndbno,
      servings: this.state.servings,
      date: this.state.date,
      pantry: this.state.pantry
    };

    console.log(food);

    axios.post('http://localhost:5000/foods/update/'+this.props.match.params.id, food)
      .then(res => console.log(res.data));
    
    // window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit Food Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            {/* <select ref="userInput"
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
            </select> */}
            <div>{this.state.username}</div>
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
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Food Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}