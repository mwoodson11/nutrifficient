
import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        // this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeHeight = this.onChangeHeight.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
          id: '',
          username: '',
          email: '',
          password: '',
          height: 0,
          weight: 0,
          gender: 0,
          genderId: ''
        };
      }

      componentDidMount() {
        axios.get('http://localhost:5000/users/' + this.props.username)
        .then(response => {
          this.setState({
            id: response.data[0]._id,
            username: response.data[0].username,
            email: response.data[0].email,
            password: response.data[0].password,
            height: response.data[0].height,
            weight: response.data[0].weight,
            gender: response.data[0].gender

          });
          console.log(response.data[0]);
          if (this.state.gender == 1) {
            this.setState({genderId: "male"});
          } else if (this.state.gender == 2) {
            this.setState({genderId: "female"});
          }

        })
        .catch((error) => {
          console.log(error);
        })
      }

      onChangeHeight(e) {
        this.setState({
          height: e.target.value
        });
      }
      onChangeWeight(e) {
        this.setState({
          weight: e.target.value
        });
      }

      onChangeGender(e) {
        if (e.target.value == "male") {
          this.setState({
            genderId: "male",
            gender: 1
          });
        } else if (e.target.value == "female") {
          this.setState({
            genderId: "female",
            gender: 2
          });
        } else {
          this.setState({
            genderId: "",
            gender: 0,
          });
        }
      }

      
      onSubmit(e) {
        e.preventDefault();
        const userid = this.state.id;
        const user = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          height: Number(this.state.height),
          weight: Number(this.state.weight),
          gender: Number(this.state.gender)
        };
        console.log(user);
        axios.post('http://localhost:5000/users/update/'+userid, user)
        .then(res => console.log(res.data));
      
      }

  render() {
    return (
        <div>
            <h3>Edit User Profile</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
                <label>Height: </label>
                <input  type="number"
                    required
                    className="form-control"
                    value={this.state.height}
                    onChange={this.onChangeHeight}
                    />
            </div>
            <div className="form-group"> 
                <label>Weight: </label>
                <input  type="number"
                    required
                    className="form-control"
                    value={this.state.weight}
                    onChange={this.onChangeWeight}
                    />
            </div>
            <div className="form-group">
              <label>Gender:  </label><br></br>
                <select value = {this.state.genderId} onChange = {this.onChangeGender}>
                  <option value = ""></option>
                  <option value = "male">Male</option>
                  <option value = "female">Female</option>
                </select>
            </div>
            <div className="form-group">
                <input type="submit" value="Submit Changes" className="btn btn-primary" />
            </div>
            </form>
        </div>
    )
  }
}