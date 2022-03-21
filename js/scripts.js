//IIFE wrapper
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=10";

//filter with typeof to accept only pokemon objects
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      //replace document.write
      document.write("may not be a pokemon");
    }
  };

  function getAll() {
    return pokemonList;
  };

//replaces document.write() from the forEach loop
  function addListItem(pokemon) {
    let pokemonListUL = document.querySelector(".pokemon-list");
    let listPoke = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-list_button");
    listPoke.appendChild(button);
    pokemonListUL.appendChild(listPoke);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  };

//Loadlist function with JSON to fetch pokemon inventory from api
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  };

//loadDetails function to give detailed info for a given pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  };

//*use showDetails on user click to execute loadDetails()
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  };

  function addListener (button, pokemon) {
    button.addEventListener ("click", function () {
      showDetails(pokemon);
    })
  };

//creates an objective with same names for keys and values
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  //Now the data is loaded
  pokemonRepository.getall().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//external forEach function. Can no longer retrieve local pokemonList bc of IIFE
/*  pokemonRepository.getAll().forEach(printArrayDetails);
  function printArrayDetails(list) {
  document.write('<p>' + `${list.name}:` + '<br />' + `height: (${list.height})` + '<br />' + `type: (${list.type})` + '</p>');
};

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
  //document.write(pokemonRepository.getAll());
});

Original Pokemon Array
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
*/
