let person = [
  {name: "person1", age: 16},
  {name: "person2", age: 10},
  {name: "person3", age: 25}
  ];

for (let i=0; i < person.length; i++){
  if (person[i].age <19 && person[i].age >13){
    console.log(person[i].name + " is a teenager");
  }else if (person[i].age <13){
    console.log(person[i].name + " is a child");
  }else {
    console.log(person[i].name + " is an adult");
  }
}

let text = "";
let j = 0;

do {
  text = text + " "+ j;
  j++;
}
  while (j < 10);
  console.log(text);

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
