import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table-6';
import "./NutrientTracker.css"
import { valSort } from './Utils';

export default class Suggestions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: props.username,
            proteinlist: [],
            carbslist: [],
            fatslist: [],
            vitClist: [],
            calciumlist: [],
            ironlist: [],
            sodiumList:[],
            foods: []
        };

    }

    componentDidMount() {
        axios.get('http://localhost:5000/foods/pantry/'+this.props.username)
         .then(response => {
            var proList = [];
            var carList = [];
            var fatList = [];
            var vitList = [];
            var calList = [];
            var iroList = [];
            var sodList = [];

            response.data.forEach(food => {
                if (food.protein > 0) {
                    proList.push({description: food.description, value: food.protein});
                }
                if (food.carbs > 0) {
                    carList.push({description: food.description, value: food.carbs});
                }
                if (food.fats > 0) {
                    fatList.push({description: food.description, value: food.fats});
                }
                if (food.vitaminC > 0) {
                    vitList.push({description: food.description, value: food.vitaminC});
                }
                if (food.calcium > 0) {
                    calList.push({description: food.description, value: food.calcium});
                }
                if (food.iron > 0) {
                    iroList.push({description: food.description, value: food.iron});
                }
                if (food.sodium > 0) {
                    sodList.push({description: food.description, value: food.sodium});
                }
            });

            proList.sort(valSort);
            carList.sort(valSort);
            fatList.sort(valSort);
            vitList.sort(valSort);
            calList.sort(valSort);
            iroList.sort(valSort);
            sodList.sort(valSort);
            // proList.sort(valSort);

            this.setState({ 
                foods: response.data,
                proteinlist: proList,
                carbslist: carList,
                fatslist: fatList,
                vitClist: vitList,
                calciumlist: calList,
                ironlist: iroList,
                sodiumList: sodList


            });
         })
         .catch((error) => {
            console.log(error);
         })
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
                        Header: "Name",
                        accessor: "description"
                    },
                    { 
                        Header: "Amount",
                        accessor: "value",
                        Cell: row => (
                            <div>
                                {row.original.value} g
                            </div>
                          )
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
                    data = {this.state.carbslist}
                    columns = {[
                        {
                            Header: "Name",
                            accessor: "description"
                        },
                        { 
                            Header: "Amount",
                            accessor: "value",
                            Cell: row => (
                                <div>
                                    {row.original.value} g
                                </div>
                              )
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
                    data = {this.state.fatslist}
                    columns = {[
                        {
                            Header: "Name",
                            accessor: "description"
                        },
                        { 
                            Header: "Amount",
                            accessor: "value",
                            Cell: row => (
                                <div>
                                    {row.original.value} g
                                </div>
                              )
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
                <h3>Vitamin C</h3>
                <ReactTable 
                    data = {this.state.vitClist}
                    columns = {[
                        {
                            Header: "Name",
                            accessor: "description"
                        },
                        { 
                            Header: "Amount",
                            accessor: "value",
                            Cell: row => (
                                <div>
                                    {row.original.value} mg
                                </div>
                              )
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
                    data = {this.state.calciumlist}
                    columns = {[
                        {
                            Header: "Name",
                            accessor: "description"
                        },
                        { 
                            Header: "Amount",
                            accessor: "value",
                            Cell: row => (
                                <div>
                                    {row.original.value} mg
                                </div>
                              )
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
                    data = {this.state.ironlist}
                    columns = {[
                        {
                            Header: "Name",
                            accessor: "description"
                        },
                        { 
                            Header: "Amount",
                            accessor: "value",
                            Cell: row => (
                                <div>
                                    {row.original.value} mg
                                </div>
                              )
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
                    data = {this.state.sodiumList}
                    columns = {[
                    {
                        Header: "Name",
                        accessor: "description"
                    },
                    { 
                        Header: "Amount",
                        accessor: "value",
                        Cell: row => (
                            <div>
                                {row.original.value} mg? {/*is this grams or mg? */}
                            </div>
                          )
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
                <h3>Vitamin 8</h3>
                <ReactTable 
                    data = {this.state.carbslist}
                    columns = {[
                        {
                            Header: "Name",
                            accessor: "description"
                        },
                        { 
                            Header: "Amount",
                            accessor: "value",
                            Cell: row => (
                                <div>
                                    {row.original.value} g
                                </div>
                              )
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
                <h3>Vitamin 9</h3>
                <ReactTable 
                    data = {this.state.fatslist}
                    columns = {[
                        {
                            Header: "Name",
                            accessor: "description"
                        },
                        { 
                            Header: "Amount",
                            accessor: "value",
                            Cell: row => (
                                <div>
                                    {row.original.value} g
                                </div>
                              )
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
                <h3>Vitamin 10</h3>
                <ReactTable 
                    data = {proteindata}
                    columns = {[
                    {
                        Header: "Name",
                        accessor: "description"
                    },
                    { 
                        Header: "Amount",
                        accessor: "value",
                        Cell: row => (
                            <div>
                                {row.original.value} g
                            </div>
                          )
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
                <h3>Vitamin 11</h3>
                <ReactTable 
                    data = {this.state.carbslist}
                    columns = {[
                        {
                            Header: "Name",
                            accessor: "description"
                        },
                        { 
                            Header: "Amount",
                            accessor: "value",
                            Cell: row => (
                                <div>
                                    {row.original.value} g
                                </div>
                              )
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
                <h3>Vitamin 12</h3>
                <ReactTable 
                    data = {this.state.fatslist}
                    columns = {[
                        {
                            Header: "Name",
                            accessor: "description"
                        },
                        { 
                            Header: "Amount",
                            accessor: "value",
                            Cell: row => (
                                <div>
                                    {row.original.value} g
                                </div>
                              )
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