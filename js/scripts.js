

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

  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll () {
    return pokemonList;
  };

//filter with typeof to accept only pokemon objects
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

//replaces document.write() from the forEach loop
  function addListItem(pokemon) {
    let pokemonListUL = document.querySelector(".pokemon-list");
    let listPoke = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-list_button");
    listPoke.appendChild(button);
    pokemonListUL.appendChild(listPoke);
    addListener(button, pokemon);
  };

//*use showDetails on user click to execute loadDetails()
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  };

  function addListener (button, pokemon) {
    button.addEventListener ("click", function () {
      showDetails(pokemon);
    })
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
    //Now add details to the item...
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
    console.error(e);
  });
};

//creates an objective with same names for keys and values
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
    //showDetails: showDetails
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
*/
