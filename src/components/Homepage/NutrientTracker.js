import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
//import PieChart from 'react-minimal-pie-chart';
//import PieChart from 'react-simple-pie-chart';
import {IgrPieChartModule, IgrPieChart} from 'igniteui-react-charts';
import './NutrientTracker.css';
import { calCalc, calcRatio } from './Utils';
IgrPieChartModule.register();

var PercentCarbs = 0.4;
var PercentFats = 0.3;
var PercentPro = 0.3;
var FatPerGram = 9;
var CarbProPerGram = 4;

var RecommendedVitaminC = 90;
var RecommendedIron = 18;
var RecommendedCalcium = 1300;
var RecommendedSodium = 2300;


export default class NutrientTracker extends Component {
    constructor(props) {
        super(props);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.state = {
            id: '',
            username: '',
            email: '',
            password: '',
            height: 0,
            weight: 0,
            age: 0,
            gender: 0,
            activity: 0,
            foods: [],
            date: new Date(),
            dateList: [],
            proteindata: [
                {MarketShare: 0, Company: "vit"},
                {MarketShare: 100, Company: "missing"}
            ],
            carbsdata: [
                {MarketShare: 0, Company: "vit"},
                {MarketShare: 100, Company: "missing"}
            ],
            fatsdata: [
                {MarketShare: 0, Company: "vit"},
                {MarketShare: 100, Company: "missing"}
            ],
            sodiumdata: [
                {MarketShare: 0, Company: "vit"},
                {MarketShare: 100, Company: "missing"}
            ],
            calciumdata: [
                {MarketShare: 0, Company: "vit"},
                {MarketShare: 100, Company: "missing"}
            ],
            irondata: [
                {MarketShare: 0, Company: "vit"},
                {MarketShare: 100, Company: "missing"}
            ],
            vitCdata: [
                {MarketShare: 0, Company: "vit"},
                {MarketShare: 100, Company: "missing"}
            ]

        }
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
          axios.get('http://localhost:5000/foods/log/'+this.state.username)
            .then(response => {
                console.log(response);
                this.setState({foods: response.data});
            })
            .then (() => {

                //Calculations for how much this person should eat
                var fatCal = 0;
                var carbCal = 0;
                var proCal = 0;
                var totCal = 0;

                totCal = calCalc(this.state.gender, this.state.weight, this.state.height, this.state.age);
                totCal *= this.state.activity;

                fatCal = totCal * PercentFats / FatPerGram;
                proCal = totCal * PercentPro / CarbProPerGram;
                carbCal = totCal * PercentCarbs / CarbProPerGram;


                //Calculations for how much this person has eaten
                var countFat = 0;
                var countPro = 0;
                var countCarb = 0;
                var countVitC = 0;
                var countIron = 0;
                var countCalcium = 0;
                var countSodium = 0;

                console.log(countPro);
                this.state.foods.forEach(food => {
                    // console.log((this.state.date).toISOString().substring(0,10))
                    console.log(food.date.substring(0,10))
                    // var d = new Date();
                    // d.setDate( d.getDate() - 1 );
                    if (this.state.date.toISOString().substring(0,10) == food.date.substring(0,10)) {
                        countPro += food.protein;
                        countFat += food.fats;
                        countCarb += food.carbs;
                        countVitC += food.vitaminC;
                        countIron += food.iron;
                        countCalcium += food.calcium;
                        countSodium += food.sodium;
                    }
                });
                console.log(countPro);
                console.log(proCal);

                var proRatio = calcRatio(countPro, proCal);
                var fatRatio = calcRatio(countFat, fatCal);
                var carbRatio = calcRatio(countCarb, carbCal);
                var vitCRatio = calcRatio(countVitC, RecommendedVitaminC);
                var ironRatio = calcRatio(countIron, RecommendedIron);
                var calciumRatio = calcRatio(countCalcium, RecommendedCalcium);
                var sodiumRatio = calcRatio(countSodium, RecommendedSodium);



                this.setState({
                    proteindata: [
                        {MarketShare: 100 - proRatio, Company: "vit"},
                        {MarketShare: proRatio, Company: "missing"}
                    ],
                    carbsdata: [
                        {MarketShare: 100 - carbRatio, Company: "vit"},
                        {MarketShare: carbRatio, Company: "missing"}
                    ],
                    fatsdata: [
                        {MarketShare: 100 - fatRatio, Company: "vit"},
                        {MarketShare: fatRatio, Company: "missing"}
                    ],
                    sodiumdata: [
                        {MarketShare: 100 - sodiumRatio, Company: "vit"},
                        {MarketShare: sodiumRatio, Company: "missing"}
                    ],
                    calciumdata: [
                        {MarketShare: 100 - calciumRatio, Company: "vit"},
                        {MarketShare: calciumRatio, Company: "missing"}
                    ],
                    irondata: [
                        {MarketShare: 100 - ironRatio, Company: "vit"},
                        {MarketShare: ironRatio, Company: "missing"}
                    ],
                    vitCdata: [
                        {MarketShare: 100 - vitCRatio, Company: "vit"},
                        {MarketShare: vitCRatio, Company: "missing"}
                    ]

                })
            })

            

        })
        .catch((error) => {
          console.log(error);
        })
      }

      onChangeDate(date) {
        console.log(date.toISOString().substring(0,10))
        // date.setDate( date.getDate() - 1 );
        console.log(date.toISOString().substring(0,10))
        //Calculations for how much this person should eat
        var fatCal = 0;
        var carbCal = 0;
        var proCal = 0;
        var totCal = 0;

        totCal = calCalc(this.state.gender, this.state.weight, this.state.height, this.state.age);
        totCal *= this.state.activity;

        fatCal = totCal * PercentFats / FatPerGram;
        proCal = totCal * PercentPro / CarbProPerGram;
        carbCal = totCal * PercentCarbs / CarbProPerGram;


        //Calculations for how much this person has eaten
        var countFat = 0;
        var countPro = 0;
        var countCarb = 0;
        var countVitC = 0;
        var countIron = 0;
        var countCalcium = 0;
        var countSodium = 0;

        console.log(countPro);
        this.state.foods.forEach(food => {
            // console.log((this.state.date).toISOString().substring(0,10))
            // console.log(food.date.substring(0,10))

            if (date.toISOString().substring(0,10) == food.date.substring(0,10)) {
                countPro += food.protein;
                countFat += food.fats;
                countCarb += food.carbs;
                countVitC += food.vitaminC;
                countIron += food.iron;
                countCalcium += food.calcium;
                countSodium += food.sodium;
            }
        });
        // console.log(countPro);
        // console.log(proCal);

        var proRatio = calcRatio(countPro, proCal);
        console.log(proRatio);
        var fatRatio = calcRatio(countFat, fatCal);
        var carbRatio = calcRatio(countCarb, carbCal);
        var vitCRatio = calcRatio(countVitC, RecommendedVitaminC);
        var ironRatio = calcRatio(countIron, RecommendedIron);
        var calciumRatio = calcRatio(countCalcium, RecommendedCalcium);
        var sodiumRatio = calcRatio(countSodium, RecommendedSodium);

        // date.setDate( date.getDate() + 1 );
        this.setState({
            date: date,
            proteindata: [
                {MarketShare: 100 - proRatio},
                {MarketShare: proRatio}
            ],
            carbsdata: [
                {MarketShare: 100 - carbRatio, Company: "vit"},
                {MarketShare: carbRatio, Company: "missing"}
            ],
            fatsdata: [
                {MarketShare: 100 - fatRatio, Company: "vit"},
                {MarketShare: fatRatio, Company: "missing"}
            ],
            sodiumdata: [
                {MarketShare: 100 - sodiumRatio, Company: "vit"},
                {MarketShare: sodiumRatio, Company: "missing"}
            ],
            calciumdata: [
                {MarketShare: 100 - calciumRatio, Company: "vit"},
                {MarketShare: calciumRatio, Company: "missing"}
            ],
            irondata: [
                {MarketShare: 100 - ironRatio, Company: "vit"},
                {MarketShare: ironRatio, Company: "missing"}
            ],
            vitCdata: [
                {MarketShare: 100 - vitCRatio, Company: "vit"},
                {MarketShare: vitCRatio, Company: "missing"}
            ]

        })
        console.log(this.state.proteindata)
      }
    

    render() {
        return(
            <div>
            <h3>Nutrient Tracker</h3>
            <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
            <div className = 'rowC'>
                <div className = 'vit'>
                    <h3>Protein</h3>
                    <IgrPieChart
                         dataSource = {this.state.proteindata}
                        valueMemberPath = "MarketShare"
                        //labelMemberPath = "Company"
                        width = "100px"
                        height = "100px"
                        brushes = {["#C0C0C0", "#3377ff"]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>
                <div className = 'vit'>
                    <h3>Carbs</h3>
                    <IgrPieChart
                        dataSource = {this.state.carbsdata}
                        valueMemberPath = "MarketShare"
                        //labelMemberPath = "Company"
                        width = "100px"
                        height = "100px"
                        brushes = {["#C0C0C0", "#3377ff"]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>
                <div className = 'vit'>
                    <h3>Fats</h3>
                    <IgrPieChart
                        dataSource = {this.state.fatsdata}
                        valueMemberPath = "MarketShare"
                        //labelMemberPath = "Company"
                        width = "100px"
                        height = "100px"
                        brushes = {["#C0C0C0", "#3377ff"]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>
                <div className = 'vit'>
                    <h3>Sodium</h3>
                    <IgrPieChart
                        dataSource = {this.state.sodiumdata}
                        valueMemberPath = "MarketShare"
                        //labelMemberPath = "Company"
                        width = "100px"
                        height = "100px"
                        brushes = {["#C0C0C0", "#3377ff"]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>
                <div className = 'vit'>
                    <h3>Calcium</h3>
                    <IgrPieChart
                        dataSource = {this.state.calciumdata}
                        valueMemberPath = "MarketShare"
                        //labelMemberPath = "Company"
                        width = "100px"
                        height = "100px"
                        brushes = {["#C0C0C0", "#3377ff"]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>
            </div>
            <div className = 'rowC'>
                <div className = 'vit'>
                    <h3>Iron</h3>
                    <IgrPieChart
                        dataSource = {this.state.irondata}
                        valueMemberPath = "MarketShare"
                        //labelMemberPath = "Company"
                        width = "100px"
                        height = "100px"
                        brushes = {["#C0C0C0", "#3377ff"]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>
                <div className = 'vit'>
                    <h3>Vitamin C</h3>
                    <IgrPieChart
                        dataSource = {this.state.vitCdata}
                        valueMemberPath = "MarketShare"
                        //labelMemberPath = "Company"
                        width = "100px"
                        height = "100px"
                        brushes = {["#C0C0C0", "#3377ff"]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>
                
            </div>
        </div>

        )
    }
}