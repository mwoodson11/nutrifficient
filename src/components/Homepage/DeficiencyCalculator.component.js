import React, { useState, useEffect } from 'react';
import axios from 'axios';

const proteinSymptoms = ["Edema", "Mood Changes", "Weakness/Fatigue", "Fatty Liver", "Flaky, Splitting, or Red skin", "Hair Issues(thinning, faded color, hair loss)", "Brittle Nails", "Loss of Muscle Mass", "Weakened Bones", "Stunted Growth", "Weakened Immune System", "Increased Appetite"];
const proteinList = proteinSymptoms.map((proteinSymptoms, index) =>
    <li key={index}>{proteinSymptoms}</li>
);

const carbSymptoms = ["Lack of Energy", "Constipation", "Nausea", "Dizziness", "Headaches", "Bad Breath", "Sugar Cravings", "Loss of Appetite"];
const carbsList = carbSymptoms.map((carbSymptoms, index) =>
    <li key={index}>{carbSymptoms}</li>
);

const fatsSymptoms = ["Dry, Scaly skin", "Dry Eyes", "Poor Body Temperature Regulation", "Dry Hair", "Hair Loss", "Hormonal Problems", "Increased Hunger", "Mental Fatigue", "Fatigue"];
const fatsList = fatsSymptoms.map((fatsSymptoms, index) =>
    <li key={index}>{fatsSymptoms}</li>
);

const sodiumSymptoms = ["Nausea", "Vomiting", "Confusion", "Drowsiness", "Irritability or Restlessness", "Muscle Weakness, Spasms, or Cramps", "Seizures", "Coma"];
const sodiumList = sodiumSymptoms.map((sodiumSymptoms, index) =>
    <li key={index}>{sodiumSymptoms}</li>
);

const calciumSymptoms = ["Muscle Problems", "Fatigue", "Dry, Itchy Skin", "Dry, Brittle Nails", "Osteoporosis", "Osteopenia", "Depression", "Tooth Decay"];
const calciumList = calciumSymptoms.map((calciumSymptoms, index) =>
    <li key={index}>{calciumSymptoms}</li>
);

const ironSymptoms = ["Tiredness", "Paleness", "Shortness of Breath", "Headaches", "Dizziness", "Dry or Damaged Hair and Skin", "Heart Palpitations", "Swelling or Soreness of Tongue and Mouth", "Restless Legs", "Brittle Nails", "Strange Cravings (ice, clay, dirt, chalk, paper)", "Anxiety", "Cold Hands and Feet", "Frequent Infections"];
const ironList = ironSymptoms.map((ironSymptoms, index) =>
    <li key={index}>{ironSymptoms}</li>
);

const vitCSymptoms = ["Dry Skin", "Splitting Hair", "Swelling and Discoloration of Gums", "Sudden and Unexpected Bleeding from Gums", "Nosebleeds", "Poor Wound Healing", "Tooth Loss"];
const vitCList = vitCSymptoms.map((vitCSymptoms, index) =>
    <li key={index}>{vitCSymptoms}</li>
);

const vitASymptoms = ["Dry Skin", "Dry Eyes", "Night Blindness", "Infertility", "Delayed Growth", "Throat or Chest Infections", "Poor Wound Healing", "Acne or Breakouts"];
const vitAList = vitASymptoms.map((vitASymptoms, index) =>
    <li key={index}>{vitASymptoms}</li>
);

const vitESymptoms = ["Muscle Weakness", "Bad Coordination", "Numbness", "Vision Deterioration", "Weak Immune System"];
const vitEList = vitESymptoms.map((vitESymptoms, index) =>
    <li key={index}>{vitESymptoms}</li>
);

const potassiumSymptoms = ["Weakness", "Fatigue", "Muscle Cramps or Spasms", "Digestive Problems", "Heart Palpitations", "Muscle Aches or Stiffness", "Tingling or Numbness", "Breathing Difficulties", "Mood Changes"];
const potassiumList = potassiumSymptoms.map((potassiumSymptoms, index) =>
    <li key={index}>{potassiumSymptoms}</li>
);

const magnesiumSymptoms = ["Nausea", "Vomiting", "Loss of Appetite", "Muscle Twitches or Cramps", "Mental Disorders", "Osteoporosis", "Fatigue", "Muscle Weakness", "High Blood Pressure", "Asthma", "Irregular Heartbeat"];
const magnesiumList = magnesiumSymptoms.map((magnesiumSymptoms, index) =>
    <li key={index}>{magnesiumSymptoms}</li>
);

const fiberSymptoms = ["Stomach Issues", "Constipation", "Weight Gain", "Blood Sugar Fluctuations", "Hunger after Eating", "High Cholesterol", "High Blood Pressure", "Inflammation", "Low Energy", "Nausea"];
const fiberList = fiberSymptoms.map((fiberSymptoms, index) =>
    <li key={index}>{fiberSymptoms}</li>
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
                    <h3>Carbohydrates Deficiency Symptoms</h3>
                    <ul>{carbsList}</ul>
                </div>
                }  
            </div>
            <div className="defContainer">
                { foods.protein / user.protein < 0.5 &&
                <div>
                    <h3>Protein Deficiency Symptoms</h3>
                    <ul>{proteinList}</ul>
                </div>
                }  
            </div>
            <div className="defContainer">
                { foods.fats / user.fats < 0.5 &&
                <div>
                    <h3>Fats Deficiency Symptoms</h3>
                    <ul>{fatsList}</ul>
                </div>
                }  
            </div>
            <div className="defContainer">
                { foods.iron / user.iron < 0.5 &&
                <div>
                    <h3>Iron Deficiency Symptoms</h3>
                    <ul>{ironList}</ul>
                </div>
                }  
            </div>
            <div className="defContainer">
                { foods.calcium / user.calcium < 0.5 &&
                <div>
                    <h3>Calcium Deficiency Symptoms</h3>
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
                    <h3>Vitamin C Deficiency Symptoms</h3>
                    <ul>{vitCList}</ul>
                </div>
                }  
            </div>
            <div className="defContainer">
                { foods.vitaminA / user.vitaminA < 0.5 &&
                <div>
                    <h3>Vitamin A Deficiency Symptoms</h3>
                    <ul>{vitAList}</ul>
                </div>
                }  
            </div>
            <div className="defContainer">
                { foods.vitaminE / user.vitaminE < 0.5 &&
                <div>
                    <h3>Vitamin E Deficiency Symptoms</h3>
                    <ul>{vitEList}</ul>
                </div>
                }  
            </div>
            <div className="defContainer">
                { foods.potassium / user.potassium < 0.5 &&
                <div>
                    <h3>Potassium Deficiency Symptoms</h3>
                    <ul>{potassiumList}</ul>
                </div>
                }  
            </div>
            <div className="defContainer">
                { foods.magnesium / user.magnesium < 0.5 &&
                <div>
                    <h3>Magnesium Deficiency Symptoms</h3>
                    <ul>{magnesiumList}</ul>
                </div>
                }  
            </div>
            <div className="defContainer">
                { foods.fiber / user.fiber < 0.5 &&
                <div>
                    <h3>Fiber Deficiency Symptoms</h3>
                    <ul>{fiberList}</ul>
                </div>
                }  
            </div>
        </div>
    );
}

export default DeficiencyCalculator;