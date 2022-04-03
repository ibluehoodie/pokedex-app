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

      });
    }

  //after clicking on pokemon button, loads the data from pokemon api
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
        showModal(pokemon);
      });
    };

  //Loadlist function with JSON to fetch pokemon inventory from api
    function loadList() {
      //showLoadingMessage();
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: capitalizeFirstLetter(item.name),
            detailsUrl: item.url
          };
          add(pokemon);
          //hideLoadingMessage();
          // console.log(pokemon);
        });
      }).catch(function (e) {
          //hideLoadingMessage();
        console.error(e);
      })
    };

  //loadDetails function to give detailed info for a given pokemon
    function loadDetails(item) {
      //showLoadingMessage();
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.imageUrlb =details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types.map((objects) => objects.type.name);
        item.abilities = details.abilities.map((objects) => objects.ability.name);
      //hideLoadingMessage();
      }).catch(function (e) {
      //hideLoadingMessage();
        console.error(e);
      });
    };

  //function to capitalize first letter of e.g. pokemon name
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

//New Modal with Bootstrap_______________________________________
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $("modal-title");
    // let $modalContainer = $("#modal-container");
    //clear existing content of the modal_img
    // modalHeader.empty();

    modalTitle.innerHTML = "";
    modalBody.innerHTML = "";

    modalTitle.empty();
    modalBody.empty();

    // creating element for name in modal content
    let nameElement = $("<h1>" + capitalizeFirstLetter(item.name) + "</h1>");
    // creating img in modal content
    let imageElementFront = $("<img class='modal-img' style='width:50%'>");
    imageElementFront.attr("src", item.imageUrl);
    let imageElementBack = $("<img class='modal-img' style='width:50%'>");
    imageElementBack.attr("src", item.imageUrlb);
    // creating element for height in modal content
    let heightElement = $("<p>" + "height: " + item.height*10 + " cm" + "</p>");
    // creating element for weight in modal content
    let weightElement = $("<p>" + "weight: " + item.weight/10 + " kg" + "</p>");
    // creating element for type in modal content
    let typesElement = $("<p>" + "types: " + item.types + "</p>");
    // creating element for abilites in modal content
    let abilitiesElement = $("<p>" + "abilities: " + item.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  };

//creates an objective with same names for keys and values
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function() {
  //Now the data is loaded
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
