let containerPokemons = document.getElementById("container-pokemons");

fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(resposta => resposta.json())
    .then(dados => {
        console.log(dados);
        for (let pokemon of dados.results) {
            let cardPokemon = document.createElement('div');
            cardPokemon.innerText = pokemon.name;
            containerPokemons.appendChild(cardPokemon);
        }
    });