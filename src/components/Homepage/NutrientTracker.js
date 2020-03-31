import React, { Component } from 'react';
import axios from 'axios';
//import PieChart from 'react-minimal-pie-chart';
//import PieChart from 'react-simple-pie-chart';
import {IgrPieChartModule, IgrPieChart} from 'igniteui-react-charts';
import './NutrientTracker.css';
IgrPieChartModule.register();


export default class NutrientTracker extends Component {
    constructor(props) {
        super(props);


        this.state = {
            username: props.username,
            proteindata: [
                {MarketShare: 10, Company: "vit"},
                {MarketShare: 90, Company: "missing"}
            ],
            carbsdata: [
                {MarketShare: 20, Company: "vit"},
                {MarketShare: 80, Company: "missing"}
            ],
            fatsdata: [
                {MarketShare: 30, Company: "vit"},
                {MarketShare: 70, Company: "missing"}
            ],
            sodiumdata: [
                {MarketShare: 40, Company: "vit"},
                {MarketShare: 60, Company: "missing"}
            ],
            calciumdata: [
                {MarketShare: 50, Company: "vit"},
                {MarketShare: 50, Company: "missing"}
            ],
            irondata: [
                {MarketShare: 60, Company: "vit"},
                {MarketShare: 40, Company: "missing"}
            ]

        }
    }
    

    render() {
        return(
            <div>
            <h3>Nutrient Tracker</h3>
            <div className = 'rowC'>
                <div className = 'vit'>
                    <h3>Protein</h3>
                    <IgrPieChart
                         dataSource = {this.state.proteindata}
                        valueMemberPath = "MarketShare"
                        //labelMemberPath = "Company"
                        width = "100px"
                        height = "100px"
                        brushes = {["#3377ff", "#C0C0C0"]}
                        outlines = {["#3377ff", "#C0C0C0"]} />
                </div>
                <div className = 'vit'>
                    <h3>Carbs</h3>
                    <IgrPieChart
                        dataSource = {this.state.carbsdata}
                        valueMemberPath = "MarketShare"
                        //labelMemberPath = "Company"
                        width = "100px"
                        height = "100px"
                        brushes = {["#3377ff", "#C0C0C0"]}
                        outlines = {["#3377ff", "#C0C0C0"]} />
                </div>
                <div className = 'vit'>
                    <h3>Fats</h3>
                    <IgrPieChart
                        dataSource = {this.state.fatsdata}
                        valueMemberPath = "MarketShare"
                        //labelMemberPath = "Company"
                        width = "100px"
                        height = "100px"
                        brushes = {["#3377ff", "#C0C0C0"]}
                        outlines = {["#3377ff", "#C0C0C0"]} />
                </div>
                <div className = 'vit'>
                    <h3>Sodium</h3>
                    <IgrPieChart
                        dataSource = {this.state.sodiumdata}
                        valueMemberPath = "MarketShare"
                        //labelMemberPath = "Company"
                        width = "100px"
                        height = "100px"
                        brushes = {["#3377ff", "#C0C0C0"]}
                        outlines = {["#3377ff", "#C0C0C0"]}/>
                </div>
                <div className = 'vit'>
                    <h3>Calcium</h3>
                    <IgrPieChart
                        dataSource = {this.state.calciumdata}
                        valueMemberPath = "MarketShare"
                        //labelMemberPath = "Company"
                        width = "100px"
                        height = "100px"
                        brushes = {["#3377ff", "#C0C0C0"]}
                        outlines = {["#3377ff", "#C0C0C0"]} />
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
                        brushes = {["#3377ff", "#C0C0C0"]}
                        outlines = {["#3377ff", "#C0C0C0"]} />
                </div>
            </div>
        </div>

        )
    }
}