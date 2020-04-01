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
            <div>
            <p>Testing</p>
            <p>{foods[0] !== null && foods[0] !== undefined && console.log(foods[0].description)}</p>
            <p>{foods[0] !== null && foods[0] !== undefined && foods[0].description}</p>
            </div>
            <div>
                <h3>Protein Deficiencies</h3> {/* Alter title depending on the list*/}
                <ul>{proteinList}</ul>
            </div>
        </div>
    );
}

export default DeficiencyCalculator;