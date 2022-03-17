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

  //external forEach function
  pokemonList.forEach(printArrayDetails);
    function printArrayDetails(list) {
      document.write('<p>' + `${list.name}:` + '<br />' + `height: (${list.height})` + '<br />' + `type: (${list.type})` + '</p>');
    };
})();
