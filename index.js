async function fetchPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=999") 
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

    document.getElementById('search__button').addEventListener('click', function() {
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
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('pokemonName').innerText = 'Pokémon Not Found!';
        document.getElementById('pokemonId').innerText = '';
        document.getElementById('pokemonImage').src ="./assets/ImageNotFound.png"
    });
});
        
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function firstSixElements() {
    return str.slice(0, 6);
}

let hasOverlayShown = false;
function togglePokemonCard() {
    if (!hasOverlayShown){
        const overlay = document.getElementById('overlay');
        overlay.classList.toggle('show__pokemon--card')
        hasOverlayShown = true;
    }
}
