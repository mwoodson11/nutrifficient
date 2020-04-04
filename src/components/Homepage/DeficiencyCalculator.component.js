import React, { useState, useEffect } from 'react';
import axios from 'axios';

const proteinSymptoms = ["Edema", "Mood Changes", "Weakness/Fatigue", "Fatty Liver", "Flaky, splitting, or red skin", "Hair Issues(thinning, faded color, hair loss)", "Brittle Nails", "Loss of muscle mass", "Weakened bones", "Stunted growth", "Weakened immune system", "Increased appetite"];
const proteinList = proteinSymptoms.map((proteinSymptoms) =>
    <li>{proteinSymptoms}</li>
);

const carbSymptoms = ["Lack of energy", "Constipation", "Nausea", "Dizziness", "Headaches", "Bad Breath", "Sugar Cravings", "Loss of appetite"];
const carbsList = carbSymptoms.map((carbSymptoms) =>
    <li>{carbSymptoms}</li>
);

const fatsSymptoms = ["Dry/Scaly skin", "Dry Eyes", "Poor Body Temperature Regulation", "Dry Hair", "Hair Loss", "Hormonal Problems", "Increased Hunger", "Mental Fatigue", "Fatigue"];
const fatsList = fatsSymptoms.map((fatsSymptoms) =>
    <li>{fatsSymptoms}</li>
);

const sodiumSymptoms = ["Nausea", "Vomiting", "Confusion", "Drowsiness", "Irritability/Restlessness", "Muscle weakness, spasms, or cramps", "Seizures", "Coma"];
const sodiumList = sodiumSymptoms.map((sodiumSymptoms) =>
    <li>{sodiumSymptoms}</li>
);

const calciumSymptoms = ["Muscle problems", "Fatigue", "Dry, Itchy Skin", "Dry, Brittle Nails", "Osteoporosis", "Osteopenia", "Depression", "Tooth Decay"];
const calciumList = calciumSymptoms.map((calciumSymptoms) =>
    <li>{calciumSymptoms}</li>
);

const ironSymptoms = ["Tiredness", "Paleness", "Shortness of Breath", "Headaches", "Dizziness", "Dry or Damaged Hair and Skin", "Heart Palpitations", "Swelling/Soreness of Tongue and Mouth", "Restless Legs", "Brittle Nails", "Strange Cravings (ice, clay, dirt, chalk, paper)", "Anxiety", "Cold hands and feet", "Frequent Infections"];
const ironList = ironSymptoms.map((ironSymptoms) =>
    <li>{ironSymptoms}</li>
);

const vitCSymptoms = ["Dry skin", "Splitting Hair", "Swelling and discoloration of gums", "Sudden and unexpected bleeding from gums", "Nosebleeds", "Poor healing of wounds", "Slow healing of wounds", "Tooth loss"];
const vitCList = vitCSymptoms.map((vitCSymptoms) =>
    <li>{vitCSymptoms}</li>
);


const DeficiencyCalculator = (property) => {
    const [foods, setFoods] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/foods/deficiency/'+property.username)
        .then(response => {
          setFoods(response.data);
          console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        axios.get('http://localhost:5000/users/deficiency/'+property.username)
        .then(response => {
          setUser(response.data);
          console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        
        

    }, []);
    return (
        <div className="appContainer">

            <div className="defContainer">
                { foods.carbs / user.carbs < 0.5 &&
                <div>
                    <h3>Carbohydrates Deficiencies</h3>
                    <ul>{carbsList}</ul>
                </div>
                }  
            </div>
            <div className="defContainer">
                { foods.protein / user.protein < 0.5 &&
                <div>
                    <h3>Protein Deficiencies</h3>
                    <ul>{proteinList}</ul>
                </div>
                }  
            </div>
            <div className="defContainer">
                { foods.fats / user.fats < 0.5 &&
                <div>
                    <h3>Fats Deficiencies</h3>
                    <ul>{fatsList}</ul>
                </div>
                }  
            </div>
            <div className="defContainer">
                { foods.iron / user.iron < 0.5 &&
                <div>
                    <h3>Iron Deficiencies</h3>
                    <ul>{ironList}</ul>
                </div>
                }  
            </div>
            <div className="defContainer">
                { foods.calcium / user.calcium < 0.5 &&
                <div>
                    <h3>Calcium Deficiencies</h3>
                    <ul>{calciumList}</ul>
                </div>
                }  
            </div>
            <div className="defContainer">
                { foods.sodium / user.sodium < 0.5 &&
                <div>
                    <h3>Sodium Deficiencies</h3>
                    <ul>{sodiumList}</ul>
                </div>
                }  
            </div>
            <div className="defContainer">
                { foods.vitaminC / user.vitaminC < 0.5 &&
                <div>
                    <h3>Vitamin C Deficiencies</h3>
                    <ul>{vitCList}</ul>
                </div>
                }  
            </div>
        </div>
    );
}

export default DeficiencyCalculator;