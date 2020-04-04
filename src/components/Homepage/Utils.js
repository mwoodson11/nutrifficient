import React from "react";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: "firstName",
    lastName: "lastName2",
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33 ? "complicated" : "single"
  };
};

export function makeData(len = 5553) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}

const calCalc = (gender, weight, height, age) => {
  if (gender == 1) {
    return 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age);
  } else {
    return 655 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
  }
}

const calcRatio = (loggedCals, totalCals) => {
  var val = loggedCals/totalCals;
  if (val > 1) {
    return 100;
  } else {
    return Math.round(val * 100);
  }
}

const formatedFoodQuery = query => encodeURI(query.trim().toLowerCase());

const kCalSum = arr => arr.reduce((acc, curVal) => acc + +curVal.kcal, 0);

const handleMissingValue = field => {
  if (field.toString().indexOf("--") <= -1) {
    return field;
  } else {
    return "";
  }
};

export { formatedFoodQuery, kCalSum, handleMissingValue, calCalc, calcRatio };