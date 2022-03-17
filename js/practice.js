/*
function printArrayDetails(list) {
  for (let i = 0; i < list.length; i++) {
    //A pokemon meets the condition if it has more than one element under the "type" key.
    if (list[i].type.length > 1){
      document.write('<p>' + `${list[i].name} (height: ${list[i].height})` + ' - That\'s a multi-talented Pokemon!' + '<br />' + '</p>');
    } else {
      document.write('<p>' + `${list[i].name} (height: ${list[i].height})` + '<br />' + '</p>');
    }
  }
};
printArrayDetails(pokemonList);
*/

//For Array with number values
let person = [
  {name: "person1", age: 16},
  {name: "person2", age: 10},
  {name: "person3", age: 25}
  ];

for (let i=0; i < person.length; i++){
  if (person[i].age <19 && person[i].age >13){
    console.log(person[i].name + " is a teenager");
  } else if (person[i].age <13){
    console.log(person[i].name + " is a child");
  } else {
    console.log(person[i].name + " is an adult");
  }
}

//Do While Array with string values
let text = "";
let j = 0;

do {
  text = text + " "+ j;
  j++;
}
  while (j < 10);
  console.log(text);


//While (do) Array with strong values
let fruits = ["apple", "banana", "orange", "grape"];
let text2 = "";
let k = 0;

while (fruits[k]) {
  text2 = text2 + " "+ fruits[k];
  k++;
}
console.log(text2);

let veggies = ["tomato", "cucumber", "potato"];
let text3 = "";
let a = 0;
for (;veggies[a];){
  text3 = text3 + " " + veggies[a];
  a++;
}
console.log(text3);

//Function example - parameters and arguments
function greetingMessage(firstName, lastName) {
   console.log("Hello, My name is " + firstName + " " + lastName);
   document.write("Hello , My name is  " + firstName + " " + lastName)
}
greetingMessage("Brad", "Pitt");
greetingMessage("Nelson", "Mandela");

//Anonymous Function - fnameless unction assigned to a variable
let Message = function (){
   console.log("Hello World!");
};
Message();

let sayHello = function (firstName) {
   console.log("Hello " + firstName);
};
sayHello("Bobby");
sayHello();
//Try it yourself!

/*Using parameters and arguments of "age" to avoid side-effects (that change value of the variable "age")*/
let age = 10;

function getNewAge(age) {
age = age + 1;
  return age;
}
console.log(getNewAge(age)); // returns 11
console.log(age); // returns  10

//practice function return
let number = 10;
function divideNumber() {
  number = number / 2;
  return mumber;
};
document.write(divideNumber(number));

//"this" key word for functions
let dog = {
  type: 'pug',
  age: 3,
  name: 'Margot',
  speak: function() {
    console.log('Wooff! I am ' + this.name);
  }
};
dog.speak();

//OPERATIONS functions
//addition functions
function add(num1, num2) {
  return num1 + num2;
};
console.log(add(1, 2)); //console log 3
//or
let sum = (num1, num2) => {
  return num1 + num2;
};
console.log(sum(2, 3)); //console log 5

//subtraction functions
function subtract(num1, num2) {
  console.log(num1 - num2); //console log 6
};
let result = subtract(8, 2);
//or
let difference = (num1, num2) => {
  return num1 - num2;
};
console.log(difference(7, 5)); //console log 2

//multiplication function
function multiply(num1, num2) {
  return num1 * num2;
};
console.log(multiply(3, 4)); //console log 12

//division functions
let divide = (dividend, divisor) => {
  if (divisor === 0) {
    return "Not Allowed";
  } else {
    return dividend / divisor;
  }
};
console.log(divide(30, 3)); //console log 10
console.log(divide(30, 0)); //Not Allowed

//forEach practice
//external function
const armada = [
  {
    class: "frigate",
   	length: 2,
    systems: ["macro", "lance"]
  },
  {
    class: "destroyer",
    length: 1.5,
    systems: ["macro", "torpedo"]
  },
  {
    class: "light cruiser",
   	length: 5,
    systems: ["macro", "lance", "torpedo"]
  },
  {
    class: "cruiser",
   	length: 7,
    systems: ["plasma", "lance", "hanger"]
  }
];
armada.forEach(logToConsole);
function logToConsole(item) {
  console.log(item.class);
}; //prints each class vertically

//internal anaonymous functions
armada.forEach(function (item) {
  console.log(item.length);
});

//arrow functions
armada.forEach( (item) => {
  console.log(item.systems);
});

//Object.keys()
Object.keys(armada).forEach(function(property) {
  console.log(armada[property]);
});
