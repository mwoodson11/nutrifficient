
import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        // this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeHeight = this.onChangeHeight.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeActivity = this.onChangeActivity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
          id: '',
          username: '',
          email: '',
          password: '',
          height: 0,
          weight: 0,
          age: 0,
          gender: 0,
          genderId: '',
          activity: 1.1,
          activityId: '',
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
            gender: response.data[0].gender,
            age: response.data[0].age,
            activity: response.data[0].activity

          });
          console.log(response.data[0]);
          if (this.state.gender === 1) {
            this.setState({genderId: "male"});
          } else if (this.state.gender === 2) {
            this.setState({genderId: "female"});
          } else {
            this.setState({genderId: "N/A"});
          }
          if (this.state.activity === 1.25) {
            this.setState({activityId: "Lightly Active"});
          } else if (this.state.activity === 1.35) {
            this.setState({activityId: "Moderately Active"});
          } else if (this.state.activity === 1.5) {
            this.setState({activityId: "Very Active"});
          } else if (this.state.activity === 1.7) {
            this.setState({activityId: "Extremely Active"});
          } else {
            this.setState({activityId: "Sedentary"})
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
        if (e.target.value === "male") {
          this.setState({
            genderId: "male",
            gender: 1
          });
        } else if (e.target.value === "female") {
          this.setState({
            genderId: "female",
            gender: 2
          });
        } else {
          this.setState({
            genderId: "N/A",
            gender: 0,
          });
        }
      }

      onChangeActivity(e) {
        if (e.target.value === "Sedentary") {
          this.setState({
            activityId: "Sedentary",
            activity: 1.1
          });
        } else if (e.target.value === "Lightly Active") {
          this.setState({
            activityId: "Lightly Active",
            activity: 1.25
          });
        } else if (e.target.value === "Moderately Active") {
          this.setState({
            activityId: "Moderately Active",
            activity: 1.35
          });
        } else if (e.target.value === "Very Active") {
            this.setState({
              activityId: "Very Active",
              activity: 1.5
            });
        } else {
            this.setState({
              activityId: "Extremely Active",
              activity: 1.7
            });
        }
      }

      onChangeAge(e) {
        this.setState({
          age: e.target.value
        });
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
          gender: Number(this.state.gender),
          age: Number(this.state.age),
          activity: Number(this.state.activity)
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
                <label>Age: </label>
                <input  type="number"
                    required
                    className="form-control"
                    value={this.state.age}
                    onChange={this.onChangeAge}
                    />
            </div>
            <div className="form-group">
              <label>Gender:  </label><br></br>
                <select value = {this.state.genderId} onChange = {this.onChangeGender}>
                  <option value = "N/A">N/A</option>
                  <option value = "male">Male</option>
                  <option value = "female">Female</option>
                </select>
            </div>
            <div className="form-group">
              <label>Activity Level:  </label><br></br>
                <select value = {this.state.activityId} onChange = {this.onChangeActivity}>
                  <option value = "Sedentary">Sedentary</option>
                  <option value = "Lightly Active">Lightly Active</option>
                  <option value = "Moderately Active">Moderately Active</option>
                  <option value = "Very Active">Very Active</option>
                  <option value = "Extremely Active">Extremely Active</option>
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