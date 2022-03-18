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
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "type" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      //replace document.write
      document.write("may not be a pokemon");
    }
  };

  function addListItem(pokemon) {
    let pokemonListUL = document.querySelector(".pokemon-list");
    let listPoke = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-list_button");
    listPoke.appendChild(button);
    pokemonListUL.appendChild(listPoke);
  };
//creates an objective with same names for keys and values
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };
})();

//adding pokemon with embedded object
pokemonRepository.add({ name: "Pikachu", height: 0.3, type: ["electric"] });
console.log(pokemonRepository.getAll());

//adding pokemon with passed object
let pokemonNew = {
    name: "Silly",
    height: 1.0,
    type: ["hungry", "tired"]
  };
console.log(pokemonRepository.add(pokemonNew));

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
  //document.write(pokemonRepository.getAll());
});

//external forEach function. Can no longer retrieve local pokemonList bc of IIFE
/*  pokemonRepository.getAll().forEach(printArrayDetails);
  function printArrayDetails(list) {
  document.write('<p>' + `${list.name}:` + '<br />' + `height: (${list.height})` + '<br />' + `type: (${list.type})` + '</p>');
}; */
