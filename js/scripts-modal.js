//IIFE wrapper
let pokemonRepository = (function () {
  let pokemonList = [];

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
      console.log("may not be a pokemon");
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
    button.addEventListener("click", function() {
      showDetails(pokemon);
    });
  };

//Loadlist function with JSON to fetch pokemon inventory from api
  function loadList() {
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=10";
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
      item.imageUrlb =details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types.map((objects) => objects.type.name);
    }).catch(function (e) {
      console.error(e);
    });
  };

//*use showDetails on user click to execute loadDetails()
  function showDetails(pokemon) {
    /*pokemonRepository.*/loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.weight, pokemon.types, pokemon.imageUrl, pokemon.imageUrlb);
      console.log("pokemon selected: " + pokemon.name + " is " + pokemon.height + "cm tall and " + pokemon.weight + "grams in weight with abilities of " + pokemon.types);
    });
  };

//Modal --------------------------------
  function showModal(name, height, weight, types, imageUrl, imageUrlb) {
    let modalContainer = document.querySelector(".modal-container");
    document.querySelector(".modal_title").innerText = name;
    let description = "Height: " + height + "cm"+ "<br>Weight: " + weight + "g" + "<br>Types: " + types;

    document.querySelector(".modal_text").innerHTML = description;
    document.querySelector(".modal_img").setAttribute("src", imageUrl);
    document.querySelector(".modal_imgb").setAttribute("src", imageUrlb);
    console.log(imageUrl);
    console.log(imageUrlb);

    let closeButton = document.querySelector(".modal-close");
//close modal by clicking 'close' button
    closeButton.addEventListener("click", hideModal);


//calls hideModal if when 'keydown' event (e) IF e.key is 'Esc' key
    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('.modal-container');
      if (e.key === 'Escape' &&
      modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

      modalContainer.classList.add('is-visible');

  };

    let modalContainer = document.querySelector('.modal-container');
  //closes the modal if user clicks directly on the overlay(window space outside the modal)
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  //hideModal removes the 'is-visible' class from the modal-container
    function hideModal() {
      let modalContainer = document.querySelector('.modal-container');
      modalContainer.classList.remove('is-visible');
    };

//creates an objective with same names for keys and values
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  };

//end IIFE
})();

pokemonRepository.loadList().then(function() {
  //Now the data is loaded
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
