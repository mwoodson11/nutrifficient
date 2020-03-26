import React, { useState, useEffect } from 'react';
import axios from 'axios';



const DeficiencyCalculator = (property) => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/foods/log/'+property.username)
        .then(response => {
          setFoods(response.data);
          console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        

    }, []);
    return (
        <div>
            <p>Testing</p>
            <p>{foods[0] !== null && foods[0] !== undefined && console.log(foods[0].description)}</p>
            <p>{foods[0] !== null && foods[0] !== undefined && foods[0].description}</p>
        </div>
    );
}

export default DeficiencyCalculator;