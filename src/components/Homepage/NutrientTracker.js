import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
//import PieChart from 'react-minimal-pie-chart';
//import PieChart from 'react-simple-pie-chart';
import {IgrPieChartModule, IgrPieChart} from 'igniteui-react-charts';
import './NutrientTracker.css';
import { calCalc, calcRatio, formatDate } from './Utils';
IgrPieChartModule.register();

var PercentCarbs = 0.4;
var PercentFats = 0.3;
var PercentPro = 0.3;
var FatPerGram = 9;
var CarbProPerGram = 4;

var countFat = 0;
var countPro = 0;
var countCarb = 0;
var countVitC = 0;
var countIron = 0;
var countCalcium = 0;
var countSodium = 0;
var countVitA = 0;
var countVitE = 0;
var countMag = 0;
var countPot = 0;
var countFib = 0;

var totCal = 0;
var fatCal = 0;
var carbCal = 0;
var proCal = 0;
var RecommendedVitaminC = 90;
var RecommendedIron = 18;
var RecommendedCalcium = 1300;
var RecommendedSodium = 2300;
var RecommendedVitaminA = 900;
var RecommendedVitaminE = 15;
var RecommendedPotassium = 3000;
var RecommendedMagnesium = 350;
var RecommendedFiber = 15;


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
            proteindata: [[
                {Ratio: 0, Category: "Remaining"},
                {Ratio: 100, Category: "Eaten"}
            ], ["#C0C0C0", "#3377ff"]],
            carbsdata: [[
                {Ratio: 0, Category: "Remaining"},
                {Ratio: 100, Category: "Eaten"}
            ], ["#C0C0C0", "#3377ff"]],
            fatsdata: [[
                {Ratio: 0, Category: "Remaining"},
                {Ratio: 100, Category: "Eaten"}
            ], ["#C0C0C0", "#3377ff"]],
            sodiumdata: [[
                {Ratio: 0, Category: "Remaining"},
                {Ratio: 100, Category: "Eaten"}
            ], ["#C0C0C0", "#3377ff"]],
            calciumdata: [[
                {Ratio: 0, Category: "Remaining"},
                {Ratio: 100, Category: "Eaten"}
            ], ["#C0C0C0", "#3377ff"]],
            irondata: [[
                {Ratio: 0, Category: "Remaining"},
                {Ratio: 100, Category: "Eaten"}
            ], ["#C0C0C0", "#3377ff"]],
            vitCdata: [[
                {Ratio: 0, Category: "Remaining"},
                {Ratio: 100, Category: "Eaten"}
            ], ["#C0C0C0", "#3377ff"]],
            vitAdata: [[
                {Ratio: 0, Category: "Remaining"},
                {Ratio: 100, Category: "Eaten"}
            ], ["#C0C0C0", "#3377ff"]],
            vitEdata: [[
                {Ratio: 0, Category: "Remaining"},
                {Ratio: 100, Category: "Eaten"}
            ], ["#C0C0C0", "#3377ff"]],
            magdata: [[
                {Ratio: 0, Category: "Remaining"},
                {Ratio: 100, Category: "Eaten"}
            ], ["#C0C0C0", "#3377ff"]],
            potdata: [[
                {Ratio: 0, Category: "Remaining"},
                {Ratio: 100, Category: "Eaten"}
            ], ["#C0C0C0", "#3377ff"]],
            fibdata: [[
                {Ratio: 0, Category: "Remaining"},
                {Ratio: 100, Category: "Eaten"}
            ], ["#C0C0C0", "#3377ff"]]

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
                fatCal = 0;
                carbCal = 0;
                proCal = 0;
                totCal = 0;

                totCal = calCalc(this.state.gender, this.state.weight, this.state.height, this.state.age);
                totCal *= this.state.activity;

                fatCal = Math.round(totCal * PercentFats / FatPerGram);
                proCal = Math.round(totCal * PercentPro / CarbProPerGram);
                carbCal = Math.round(totCal * PercentCarbs / CarbProPerGram);


                //Calculations for how much this person has Remaining
                countFat = 0;
                countPro = 0;
                countCarb = 0;
                countVitC = 0;
                countIron = 0;
                countCalcium = 0;
                countSodium = 0;
                countVitA = 0;
                countVitE = 0;
                countMag = 0;
                countPot = 0;
                countFib = 0;

                console.log(this.state.date);
                var date = formatDate(this.state.date);
                console.log(date);

                // console.log(countPro);
                this.state.foods.forEach(food => {
                    // console.log((this.state.date).toISOString().substring(0,10))
                    // console.log(food.date.substring(0,10))
                    // var d = new Date();
                    // d.setDate( d.getDate() - 1 );
                    if (date == food.date) {
                        countPro += food.protein * food.servings;
                        countFat += food.fats * food.servings;
                        countCarb += food.carbs * food.servings;
                        countVitC += food.vitaminC * food.servings;
                        countIron += food.iron * food.servings;
                        countCalcium += food.calcium * food.servings;
                        countSodium += food.sodium * food.servings;
                        countVitA += food.vitaminA * food.servings;
                        countVitE += food.vitaminE * food.servings;
                        countMag += food.magnesium * food.servings;
                        countPot += food.potassium * food.servings;
                        countFib += food.fiber * food.servings;

                    }
                });

                var proRatio = calcRatio(countPro, proCal);
                var proBrushes = (proRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
                var fatRatio = calcRatio(countFat, fatCal);
                var fatBrushes = (fatRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
                var carbRatio = calcRatio(countCarb, carbCal);
                var carbBrushes = (carbRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
                var vitCRatio = calcRatio(countVitC, RecommendedVitaminC);
                var vitCBrushes = (vitCRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
                var ironRatio = calcRatio(countIron, RecommendedIron);
                var ironBrushes = (ironRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
                var calciumRatio = calcRatio(countCalcium, RecommendedCalcium);
                var calciumBrushes = (calciumRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
                var sodiumRatio = calcRatio(countSodium, RecommendedSodium);
                var sodiumBrushes = (sodiumRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
                var vitARatio = calcRatio(countVitA, RecommendedVitaminA);
                var vitABrushes = (vitARatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
                var vitERatio = calcRatio(countVitE, RecommendedVitaminE);
                var vitEBrushes = (vitERatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
                var magRatio = calcRatio(countMag, RecommendedMagnesium);
                var magBrushes = (magRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
                var potRatio = calcRatio(countPot, RecommendedPotassium);
                var potBrushes = (potRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
                var fibRatio = calcRatio(countFib, RecommendedFiber);
                var fibBrushes = (fibRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];



                this.setState({
                    proteindata: [[
                        {Ratio: 100 - proRatio, Category: "Remaining"},
                        {Ratio: proRatio, Category: "Eaten"}
                    ], proBrushes],
                    carbsdata: [[
                        {Ratio: 100 - carbRatio, Category: "Remaining"},
                        {Ratio: carbRatio, Category: "Eaten"}
                    ], carbBrushes],
                    fatsdata: [[
                        {Ratio: 100 - fatRatio, Category: "Remaining"},
                        {Ratio: fatRatio, Category: "Eaten"}
                    ], fatBrushes],
                    sodiumdata: [[
                        {Ratio: 100 - sodiumRatio, Category: "Remaining"},
                        {Ratio: sodiumRatio, Category: "Eaten"}
                    ], sodiumBrushes],
                    calciumdata: [[
                        {Ratio: 100 - calciumRatio, Category: "Remaining"},
                        {Ratio: calciumRatio, Category: "Eaten"}
                    ], calciumBrushes],
                    irondata: [[
                        {Ratio: 100 - ironRatio, Category: "Remaining"},
                        {Ratio: ironRatio, Category: "Eaten"}
                    ], ironBrushes],
                    vitCdata: [[
                        {Ratio: 100 - vitCRatio, Category: "Remaining"},
                        {Ratio: vitCRatio, Category: "Eaten"}
                    ], vitCBrushes],
                    vitAdata: [[
                        {Ratio: 100 - vitARatio, Category: "Remaining"},
                        {Ratio: vitARatio, Category: "Eaten"}
                    ], vitABrushes],
                    vitEdata: [[
                        {Ratio: 100 - vitERatio, Category: "Remaining"},
                        {Ratio: vitERatio, Category: "Eaten"}
                    ], vitEBrushes],
                    magdata: [[
                        {Ratio: 100 - magRatio, Category: "Remaining"},
                        {Ratio: magRatio, Category: "Eaten"}
                    ], magBrushes],
                    potdata: [[
                        {Ratio: 100 - potRatio, Category: "Remaining"},
                        {Ratio: potRatio, Category: "Eaten"}
                    ], potBrushes],
                    fibdata: [[
                        {Ratio: 100 - fibRatio, Category: "Remaining"},
                        {Ratio: fibRatio, Category: "Eaten"}
                    ], fibBrushes]

                })
            })

            

        })
        .catch((error) => {
          console.log(error);
        })
      }

      onChangeDate(dates) {
        // console.log(date.toISOString().substring(0,10));
        console.log(formatDate(dates));
        var date = formatDate(dates);
        // date.setDate( date.getDate() - 1 );
        // console.log(date.toISOString().substring(0,10))
        //Calculations for how much this person should eat
        fatCal = 0;
        carbCal = 0;
        proCal = 0;
        totCal = 0;

        totCal = calCalc(this.state.gender, this.state.weight, this.state.height, this.state.age);
        totCal *= this.state.activity;

        fatCal = Math.round(totCal * PercentFats / FatPerGram);
        proCal = Math.round(totCal * PercentPro / CarbProPerGram);
        carbCal = Math.round(totCal * PercentCarbs / CarbProPerGram);


        //Calculations for how much this person has Remaining
        countFat = 0;
        countPro = 0;
        countCarb = 0;
        countVitC = 0;
        countIron = 0;
        countCalcium = 0;
        countSodium = 0;
        countVitA = 0;
        countVitE = 0;
        countMag = 0;
        countPot = 0;
        countFib = 0;

        // console.log(countPro);
        this.state.foods.forEach(food => {
            // console.log((this.state.date).toISOString().substring(0,10))
            // console.log(food.date.substring(0,10))

            if (date == food.date) {
                countPro += food.protein * food.servings;
                countFat += food.fats * food.servings;
                countCarb += food.carbs * food.servings;
                countVitC += food.vitaminC * food.servings;
                countIron += food.iron * food.servings;
                countCalcium += food.calcium * food.servings;
                countSodium += food.sodium * food.servings;
                countVitA += food.vitaminA * food.servings;
                countVitE += food.vitaminE * food.servings;
                countMag += food.magnesium * food.servings;
                countPot += food.potassium * food.servings;
                countFib += food.fiber * food.servings;
            }
        });
        // console.log(countPro);
        // console.log(proCal);

        var proRatio = calcRatio(countPro, proCal);
        var proBrushes = (proRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
        var fatRatio = calcRatio(countFat, fatCal);
        var fatBrushes = (fatRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
        var carbRatio = calcRatio(countCarb, carbCal);
        var carbBrushes = (carbRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
        var vitCRatio = calcRatio(countVitC, RecommendedVitaminC);
        var vitCBrushes = (vitCRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
        var ironRatio = calcRatio(countIron, RecommendedIron);
        var ironBrushes = (ironRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
        var calciumRatio = calcRatio(countCalcium, RecommendedCalcium);
        var calciumBrushes = (calciumRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
        var sodiumRatio = calcRatio(countSodium, RecommendedSodium);
        var sodiumBrushes = (sodiumRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
        var vitARatio = calcRatio(countVitA, RecommendedVitaminA);
        var vitABrushes = (vitARatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
        var vitERatio = calcRatio(countVitE, RecommendedVitaminE);
        var vitEBrushes = (vitERatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
        var magRatio = calcRatio(countMag, RecommendedMagnesium);
        var magBrushes = (magRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
        var potRatio = calcRatio(countPot, RecommendedPotassium);
        var potBrushes = (potRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
        var fibRatio = calcRatio(countFib, RecommendedFiber);
        var fibBrushes = (fibRatio == 100) ? ["#3377ff"] : ["#C0C0C0", "#3377ff"];
        console.log(proRatio);
        console.log(magRatio);

        // date.setDate( date.getDate() + 1 );
        this.setState({
            date: dates,
            proteindata: [[
                {Ratio: 100 - proRatio, Category: "Remaining"},
                {Ratio: proRatio, Category: "Eaten"}
            ], proBrushes],
            carbsdata: [[
                {Ratio: 100 - carbRatio, Category: "Remaining"},
                {Ratio: carbRatio, Category: "Eaten"}
            ], carbBrushes],
            fatsdata: [[
                {Ratio: 100 - fatRatio, Category: "Remaining"},
                {Ratio: fatRatio, Category: "Eaten"}
            ], fatBrushes],
            sodiumdata: [[
                {Ratio: 100 - sodiumRatio, Category: "Remaining"},
                {Ratio: sodiumRatio, Category: "Eaten"}
            ], sodiumBrushes],
            calciumdata: [[
                {Ratio: 100 - calciumRatio, Category: "Remaining"},
                {Ratio: calciumRatio, Category: "Eaten"}
            ], calciumBrushes],
            irondata: [[
                {Ratio: 100 - ironRatio, Category: "Remaining"},
                {Ratio: ironRatio, Category: "Eaten"}
            ], ironBrushes],
            vitCdata: [[
                {Ratio: 100 - vitCRatio, Category: "Remaining"},
                {Ratio: vitCRatio, Category: "Eaten"}
            ], vitCBrushes],
            vitAdata: [[
                {Ratio: 100 - vitARatio, Category: "Remaining"},
                {Ratio: vitARatio, Category: "Eaten"}
            ], vitABrushes],
            vitEdata: [[
                {Ratio: 100 - vitERatio, Category: "Remaining"},
                {Ratio: vitERatio, Category: "Eaten"}
            ], vitEBrushes],
            magdata: [[
                {Ratio: 100 - magRatio, Category: "Remaining"},
                {Ratio: magRatio, Category: "Eaten"}
            ], magBrushes],
            potdata: [[
                {Ratio: 100 - potRatio, Category: "Remaining"},
                {Ratio: potRatio, Category: "Eaten"}
            ], potBrushes],
            fibdata: [[
                {Ratio: 100 - fibRatio, Category: "Remaining"},
                {Ratio: fibRatio, Category: "Eaten"}
            ], fibBrushes]

        })
        // console.log(this.state.proteindata)
      }
    

    render() {
        return(
            <div>
                {console.log(this.state)}
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
                    <p>Recommended Amount : {proCal} g</p>
                    <p>Consumed Today: {countPro} g</p>
                    <IgrPieChart
                         dataSource = {this.state.proteindata[0]}
                        valueMemberPath = "Ratio"
                        // labelMemberPath = "Category"
                        width = "100px"
                        height = "100px"
                        brushes = {this.state.proteindata[1]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>
                <div className = 'vit'>
                    <h3>Carbs</h3>
                    <p>Recommended Amount : {carbCal} g</p>
                    <p>Consumed Today: {countCarb} g</p>
                    <div className = "piechart">
                    <IgrPieChart
                        dataSource = {this.state.carbsdata[0]}
                        valueMemberPath = "Ratio"
                        //labelMemberPath = "Category"
                        width = "100px"
                        height = "100px"
                        brushes = {this.state.carbsdata[1]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                    </div>
                </div>
                <div className = 'vit'>
                    <h3>Fats</h3>
                    <p>Recommended Amount : {fatCal} g</p>
                    <p>Consumed Today: {countFat} g</p>
                    <IgrPieChart
                        dataSource = {this.state.fatsdata[0]}
                        valueMemberPath = "Ratio"
                        //labelMemberPath = "Category"
                        width = "100px"
                        height = "100px"
                        brushes = {this.state.fatsdata[1]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>
                <div className = 'vit'>
                    <h3>Sodium</h3>
                    <p>Recommended Amount : {RecommendedSodium} mg</p>
                    <p>Consumed Today: {countSodium} mg</p>
                    <IgrPieChart
                        dataSource = {this.state.sodiumdata[0]}
                        valueMemberPath = "Ratio"
                        //labelMemberPath = "Category"
                        width = "100px"
                        height = "100px"
                        brushes = {this.state.sodiumdata[1]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>
            </div>
            <div className = 'rowC'>
                <div className = 'vit'>
                    <h3>Calcium</h3>
                    <p>Recommended Amount : {RecommendedCalcium} mg</p>
                    <p>Consumed Today: {countCalcium} mg</p>
                    <IgrPieChart
                        dataSource = {this.state.calciumdata[0]}
                        valueMemberPath = "Ratio"
                        //labelMemberPath = "Category"
                        width = "100px"
                        height = "100px"
                        brushes = {this.state.calciumdata[1]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>
                <div className = 'vit'>
                    <h3>Iron</h3>
                    <p>Recommended Amount : {RecommendedIron} mg</p>
                    <p>Consumed Today: {countIron} mg</p>
                    <IgrPieChart
                        dataSource = {this.state.irondata[0]}
                        valueMemberPath = "Ratio"
                        //labelMemberPath = "Category"
                        width = "100px"
                        height = "100px"
                        brushes = {this.state.irondata[1]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>
                <div className = 'vit'>
                    <h3>Vitamin C</h3>
                    <p>Recommended Amount : {RecommendedVitaminC} mg</p>
                    <p>Consumed Today: {countVitC} mg</p>
                    <IgrPieChart
                        dataSource = {this.state.vitCdata[0]}
                        valueMemberPath = "Ratio"
                        //labelMemberPath = "Category"
                        width = "100px"
                        height = "100px"
                        brushes = {this.state.vitCdata[1]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>
                <div className = 'vit'>
                    <h3>Vitamin A</h3>
                    <p>Recommended Amount : {RecommendedVitaminA} mcg</p>
                    <p>Consumed Today: {countVitA} mcg</p>
                    <IgrPieChart
                        dataSource = {this.state.vitAdata[0]} //change this
                        valueMemberPath = "Ratio"
                        //labelMemberPath = "Category"
                        width = "100px"
                        height = "100px"
                        brushes = {this.state.vitAdata[1]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>   
            </div>
            <div className = 'rowC'>
                <div className = 'vit'>
                    <h3>Vitamin E</h3>
                    <p>Recommended Amount : {RecommendedVitaminE} mg</p>
                    <p>Consumed Today: {countVitE} mg</p>
                    <IgrPieChart
                        dataSource = {this.state.vitEdata[0]} //change this
                        valueMemberPath = "Ratio"
                        //labelMemberPath = "Category"
                        width = "100px"
                        height = "100px"
                        brushes = {this.state.vitEdata[1]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>
                <div className = 'vit'>
                    <h3>Magnesium</h3>
                    <p>Recommended Amount : {RecommendedMagnesium} mg</p>
                    <p>Consumed Today: {countMag} mg</p>
                    <IgrPieChart
                        dataSource = {this.state.magdata[0]} //change this
                        valueMemberPath = "Ratio"
                        //labelMemberPath = "Category"
                        width = "100px"
                        height = "100px"
                        brushes = {this.state.magdata[1]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>
                <div className = 'vit'>
                    <h3>Potassium</h3>
                    <p>Recommended Amount : {RecommendedPotassium} mg</p>
                    <p>Consumed Today: {countPot} mg</p>
                    <IgrPieChart
                        dataSource = {this.state.potdata[0]} //change this
                        valueMemberPath = "Ratio"
                        //labelMemberPath = "Category"
                        width = "100px"
                        height = "100px"
                        brushes = {this.state.potdata[1]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>
                <div className = 'vit'>
                    <h3>Fiber</h3>
                    <p>Recommended Amount : {RecommendedFiber} g</p>
                    <p>Consumed Today: {countFib} g</p>
                    <IgrPieChart
                        dataSource = {this.state.fibdata[0]} //change this 
                        valueMemberPath = "Ratio"
                        //labelMemberPath = "Category"
                        width = "100px"
                        height = "100px"
                        brushes = {this.state.fibdata[1]}
                        outlines = {["#C0C0C0", "#3377ff"]} />
                </div>   
            </div>
        </div>

        )
    }
}