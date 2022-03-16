const pokemonList = [
  {
    name: "Bulbasaur",
    height: 0.7,
    type: ["grass", "poison"]
  },
  {
    name: "Charmander",
    height: 0.6,
    type: ["fire"]
  },
  {
    name: "Squirtle",
    height: 0.5,
    type: ["water"]
  }
]
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

//external forEach function
pokemonList.forEach(printArrayDetails);
  function printArrayDetails(list) {
    document.write('<p>' + `${list.name}:` + '<br />' + `height: (${list.height})` + '<br />' + `type: (${list.type})` + '</p>');
  };
