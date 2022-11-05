const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(res => res.json())
)

const generateHTML = pokemons => {
    console.log(pokemons)

    return pokemons.reduce((acc, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name);

        acc += `
            <li class="card ${types[0]}">
            <img class="card-image" alt="${pokemon.name}"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle">${types.join(' | ')}</p>
            </li>`
        return acc;
    }, '')
}

const insertIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons;
}


    
const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertIntoPage)


