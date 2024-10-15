document.addEventListener("DOMContentLoaded", function() {

// Side function that calls all the pokemon from the api and displays it to the user
async function fetchPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=6") 
    const pokemonData = await response.json();
    console.log(pokemonData)

    const pokemonListEl = document.querySelector(".pokemon__list");
    pokemonListEl.innerHTML = pokemonData.results.map((poke, index) => {
        const pokemonId = index + 1;
        return `<div class="pokemon__card")}>
        <div class="pokemon__card--container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" class="pokemon__img" alt="${poke.name}">
        <h2>${capitalize(poke.name)}</h2>
        <p>Pokedex ID: #${pokemonId}</p>
        </div>
        </div>`;
    })
    .join("");
     }

     // Adds an event listener for the Enter key
     document.getElementById('search__input').addEventListener('keydown', function(event) {
         if (event.key === "Enter") {
             event.preventDefault();
             handleSearch();
            }
        })
        
    // Adds an event listener for the search button
    document.getElementById('search__button').addEventListener('click', function() {
        handleSearch();
    })

    // Function to handle search and redirection
    function handleSearch() {
        const searchInput = document.getElementById("search__input").value;
        const currentURL = window.location.pathname;
    
        // Check if the user is on the root or index page
        if (currentURL === "/" || currentURL === "/index.html") {
          // Redirect to /identifier.html with search query
          window.location.href = `/identifier.html?search=${encodeURIComponent(
            searchInput
          )}`;
        } else {
          // If not on root or index, proceed with the search
          searchPokemon(searchInput);
        }
      }

    // Main function that calls the api and portrays it to the user
    function searchPokemon() {
    const pokemonName = document.getElementById('search__input').value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`) 
    .then (response => {
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        console.log(response);
        return response.json();
    })

    .then(pokemonData => {
        document.getElementById('pokemonName').innerText = `${capitalize(pokemonData.name)}`;
        document.getElementById('pokemonId').innerText = `Pokédex: #${pokemonData.id}`;
        document.getElementById('pokemonTypes').innerText = `Type(s): ${pokemonData.types.map(typeInfo => capitalize(typeInfo.type.name))}`;
        document.getElementById('pokemonImage').src = pokemonData.sprites.front_default;
        document.getElementById('pokemonImage').style.display = 'block';
        togglePokemonCard();
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('pokemonName').innerText = 'Pokémon Not Found!';
        document.getElementById('pokemonId').innerText = '';
        document.getElementById('pokemonTypes').innerText = '';
        document.getElementById('pokemonImage').src ="./assets/ImageNotFound.png"
    });
    
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Shows the overlay once first pokemon is searched
let hasOverlayShown = false;
function togglePokemonCard() {
    if (!hasOverlayShown){
        const overlay = document.getElementById('overlay');
        overlay.classList.toggle('show__pokemon--card')
        hasOverlayShown = true;
    }
 }

  // Check if there's a search query in the URL (for identifier.html)
  function checkForSearchQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");
    if (searchQuery) {
      document.getElementById("search__input").value = searchQuery;
      searchPokemon(searchQuery);
    }
  }

  // Call this function once the page loads
  checkForSearchQuery();

  // // Uncomment the next line if you want to fetch all Pokemon on page load
//   fetchPokemon();

})