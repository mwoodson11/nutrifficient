import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table-6';
import "./NutrientTracker.css"

export default class Suggestions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: props.username,
            proteinlist: ["here", "hey"],
            carbslist: [],
            fatslist: [],
            sodiumlist: [],
            calciumlist: [],
            ironlist: []
        }
    }

    render() {
        const proteindata = this.state.proteinlist;
        return(
        <div>
        <h3>Suggestions</h3>
        <div className = "rowC">
            <div className = "vit">
                <h3>Protein</h3>
                <ReactTable 
                    data = {proteindata}
                    columns = {[
                    {
                        accessor: "foodname"
                    },
                    {
                        accessor: "foodproteinamount"
                    }
                ]}
                defaultPageSize = {20}
                style = {{
                    height : "200px"
                }}
                className = "-striped -highlight"
            />
            </div>
            <div className = "vit">
                <h3>Carbs</h3>
                <ReactTable 
                    data = {this.state.proteinlist}
                    columns = {[
                    {
                        accessor: "foodname"
                    },
                    {
                        accessor: "foodCarbAmount"
                    }
                ]}
                defaultPageSize = {20}
                style = {{
                    height : "200px"
                }}
                className = "-striped -highlight"
            />
            </div>
            <div className = "vit">
                <h3>Fats</h3>
                <ReactTable 
                    data = {this.state.proteinlist}
                    columns = {[
                    {
                        accessor: "foodname"
                    },
                    {
                        accessor: "foodFatAmount"
                    }
                ]}
                defaultPageSize = {20}
                style = {{
                    height : "200px"
                }}
                className = "-striped -highlight"
            />
            </div>
            </div>
            <div className = "rowC">
            <div className = "vit">
                <h3>Sodium</h3>
                <ReactTable 
                    data = {proteindata}
                    columns = {[
                    {
                        accessor: "foodname"
                    },
                    {
                        accessor: "foodSodiumAmount"
                    }
                ]}
                defaultPageSize = {20}
                style = {{
                    height : "200px"
                }}
                className = "-striped -highlight"
            />
            </div>
            <div className = "vit">
                <h3>Calcium</h3>
                <ReactTable 
                    data = {this.state.proteinlist}
                    columns = {[
                    {
                        accessor: "foodname"
                    },
                    {
                        accessor: "foodCalciumAmount"
                    }
                ]}
                defaultPageSize = {20}
                style = {{
                    height : "200px"
                }}
                className = "-striped -highlight"
            />
            </div>
            <div className = "vit">
                <h3>Iron</h3>
                <ReactTable 
                    data = {this.state.proteinlist}
                    columns = {[
                    {
                        accessor: "foodname"
                    },
                    {
                        accessor: "foodIronAmount"
                    }
                ]}
                defaultPageSize = {20}
                style = {{
                    height : "200px"
                }}
                className = "-striped -highlight"
            />
            </div>
            </div> 
        </div>
        )
    }
}