async function fetchPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=999");
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

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function firstSixElements(str) {
    return str.slice(0, 6);
}

fetchPokemon();