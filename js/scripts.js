let pokemonList = [
  {
    name: "Bulbasaur",
    height: 0.7,
    types: ["grass", "poison"]
  },
  {
    name: "Charmander",
    height: 0.6,
    types: ["fire"]
  },
  {
    name: "Squirtle",
    height: 0.5,
    types: ["water"]
  }
]

for (let i = 0; i < pokemonList.length; i++) {
  //document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})` + '<br />');
  if (pokemonList[i].types.length > 1){
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})` + ' - That\'s a multi-talented Pokemon!' + '<br />');
  } else {
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})` + '<br />');
  }
};
