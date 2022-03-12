let pokemonList = [
]

for (let i = 0; i < pokemonList.length; i++) {
  //document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})` + '<br />');
  if (pokemonList[i].types.length > 1){
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})` + ' - That\'s a multi-talented Pokemon!' + '<br />');
  } else {
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})` + '<br />');
  }
};
