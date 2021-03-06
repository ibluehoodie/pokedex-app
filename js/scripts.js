//IIFE wrapper
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=152";
  // let modalContainer = document.querySelector(".modal-container");

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
  }

  function filter(name) {
      return pokemonList.filter(pokemonList => pokemonList.name === name);
    }

    function findPokemon(searchName) {
    //jquery syntax
    // Clear all the buttons on the page when user types in search box
    $(".pokemon-list").empty();

    // Add pokemon buttons for which the name includes the search string
    pokemonList.forEach(pokemon => {
      if (
        capitalizeFirstLetter(pokemon.name).indexOf(
          capitalizeFirstLetter(searchName)
        ) > -1
      ) {
        addListItem(pokemon);
      }
    });
  }

  //return all pokemon from list
  function getAll() {
    return pokemonList;
  }

  //creates button for pokemon by name
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let pokemonListItem = document.createElement("li");
    pokemonListItem.classList.add("group-list-item"); //add bootstrap class
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-pokemon", "btn"); //add class name to button
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");
    pokemonRepository.handleButtonClick(button, pokemon); //Invoke the function to add event listener
    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);
  }

  function handleButtonClick(button, pokemon) {
    //add event listener to the pokemon button
    button.addEventListener("click", function () {
      //invoke the showDetails function when the button is clicked
      showDetails(pokemon);
    });
  }

  //after clicking on pokemon button, loads the data from pokemon api
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
    });
  }

  //Loadlist function with JSON to fetch pokemon inventory from api
  function loadList() {
    //showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: capitalizeFirstLetter(item.name),
            detailsUrl: item.url,
          };
          add(pokemon);
          //hideLoadingMessage();
          // console.log(pokemon);
        });
      })
      .catch(function (e) {
        //hideLoadingMessage();
        console.error(e);
      });
  }

  //loadDetails function to give detailed info for a given pokemon
  function loadDetails(item) {
    //showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.imageUrlb = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types.map((objects) => objects.type.name);
        item.abilities = details.abilities.map(
          (objects) => objects.ability.name
        );
        //hideLoadingMessage();
      })
      .catch(function (e) {
        //hideLoadingMessage();
        console.error(e);
      });
  }

  //function to capitalize first letter of e.g. pokemon name
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //New Modal with Bootstrap_______________________________________
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
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
    let heightElement = $(
      "<p>" + "height: " + item.height * 10 + " cm" + "</p>"
    );
    // creating element for weight in modal content
    let weightElement = $(
      "<p>" + "weight: " + item.weight / 10 + " kg" + "</p>"
    );
    // creating element for type in modal content
    let typesElement = $("<p>" + "types: " + item.types.join(", ") + "</p>");
    // creating element for abilites in modal content
    let abilitiesElement = $(
      "<p>" + "abilities: " + item.abilities.join(", ") + "</p>"
    );

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  //creates an objective with same names for keys and values
  return {
    add: add,
    filter: filter,
    findPokemon: findPokemon,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    handleButtonClick: handleButtonClick,
  };

  //end IIFE
})();

pokemonRepository.loadList().then(function () {
  //Now the data is loaded
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
