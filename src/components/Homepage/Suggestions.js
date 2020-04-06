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
            sodiumlist:[],
            vitAlist: [],
            vitElist: [],
            potassiumlist: [],
            magnesiumlist: [],
            fiberlist : [],
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
            var vitAAList = [];
            var vitEEList = [];
            var potList = [];
            var magList = [];
            var fibList = [];

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
                if (food.vitaminA > 0) {
                    vitAAList.push({description: food.description, value: food.vitaminA});
                }
                if (food.vitaminE > 0) {
                    vitEEList.push({description: food.description, value: food.vitaminE});
                }
                if (food.potassium > 0) {
                    potList.push({description: food.description, value: food.potassium});
                }
                if (food.magnesium > 0) {
                    magList.push({description: food.description, value: food.magnesium});
                }
                if (food.fiber > 0) {
                    fibList.push({description: food.description, value: food.fiber});
                }
            });

            proList.sort(valSort);
            carList.sort(valSort);
            fatList.sort(valSort);
            vitList.sort(valSort);
            calList.sort(valSort);
            iroList.sort(valSort);
            sodList.sort(valSort);
            vitAAList.sort(valSort);
            vitEEList.sort(valSort);
            potList.sort(valSort);
            magList.sort(valSort);
            fibList.sort(valSort);
            // proList.sort(valSort);

            this.setState({ 
                foods: response.data,
                proteinlist: proList,
                carbslist: carList,
                fatslist: fatList,
                vitClist: vitList,
                calciumlist: calList,
                ironlist: iroList,
                sodiumlist: sodList,
                vitAlist: vitAAList,
                vitElist: vitEEList,
                potassiumlist: potList,
                magnesiumlist: magList,
                fiberlist: fibList


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
                    data = {this.state.sodiumlist}
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
                                {row.original.value} mg {/*is this grams or mg? */}
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
                <h3>Vitamin A</h3>
                <ReactTable 
                    data = {this.state.vitAlist}
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
                <h3>Vitamin E</h3>
                <ReactTable 
                    data = {this.state.vitElist}
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
                <h3>Potassium</h3>
                <ReactTable 
                    data = {this.state.potassiumlist}
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
                <h3>Magnesium</h3>
                <ReactTable 
                    data = {this.state.magnesiumlist}
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
                <h3>Fiber</h3>
                <ReactTable 
                    data = {this.state.fiberlist}
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
        </div>
        )
    }
}