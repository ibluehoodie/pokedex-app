//IIFE wrapper
let pokemonRepository = (function () {
  let pokemonList = [
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

  function getAll () {
    return pokemonList;
  };

  function add(pokemon) {
    pokemonList.push(pokemon);
  };
//creates an objective with same names for keys and values
  return {
    getAll: getAll,
    add: add
  };
})();

let pokemonNew = {
    name: "Silly",
    height: 1.0,
    type: ["hungry", "tired"]
  };

console.log(pokemonRepository.add(pokemonNew));
console.log(pokemonRepository.getAll());

  pokemonRepository.getAll().forEach(printArrayDetails);
  function printArrayDetails(list) {
  document.write('<p>' + `${list.name}:` + '<br />' + `height: (${list.height})` + '<br />' + `type: (${list.type})` + '</p>');
  };

/*
//external forEach function. Can no longer retrieve local pokemonList bc of IIFE
pokemonList.forEach(printArrayDetails);
  function printArrayDetails(list) {
    document.write('<p>' + `${list.name}:` + '<br />' + `height: (${list.height})` + '<br />' + `type: (${list.type})` + '</p>');
  };
*/
