async function fetchPokemon() {
    const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
    const pokemonData = await pokemon.json();
    console.log(pokemonData)
    // const pokemonListEl = document.querySelector('.pokemon-list');
    // pokemonData.map(poke =>
    //  `<div class="pokemon__card">
    //     <div class="pokemon__card--container">
    //     <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokeData.id}.png" class="pokemon__img" alt="">
    //     <h2>${pokeData.name}</h2>
    //     <p>${pokeData.id}</p>
    //     <p>Data Types</p>
    //     </div>
    // </div>`
    // )
    // .join("");
}

fetchPokemon();