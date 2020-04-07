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
  if (gender === 1) {
    return 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age);
  } else {
    return 655 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
  }
}

const calcRatio = (loggedCals, totalCals) => {
  var val = loggedCals/totalCals;
  // console.log(val, loggedCals, totalCals);
  if (val >= 1) {
    return 100;
  } else {
    var temp = Math.round(val * 100);
    if (temp > 96 && temp <= 99) {
      return 96;
    } else {
      return temp;
    }
  }
}

const formatDate = date => {
      var month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;
  

  return [year, month, day].join('-');
}

const valSort = (a, b) => {
  return b.value - a.value;
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

export { formatedFoodQuery, kCalSum, handleMissingValue, calCalc, calcRatio, valSort, formatDate };