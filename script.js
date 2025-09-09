let containerPokemons = document.getElementById("container-pokemons");
let barraPesquisa = document.getElementById("pesquisa");

let listaCompletaPokemons = [];

const criarCards = (listaDePokemons) => {
    containerPokemons.innerHTML = '';

    for (let pokemon of listaDePokemons) {
        let cardPokemon = document.createElement('div');
        cardPokemon.classList.add('card');

        const numeroFormatado = `#${pokemon.id.toString().padStart(3, '0')}`;
        let numeroPokemon = document.createElement('p');
        numeroPokemon.innerText = numeroFormatado;
        cardPokemon.appendChild(numeroPokemon);

        let imagemPokemon = document.createElement('img');
        imagemPokemon.src = pokemon.sprites.front_default;
        cardPokemon.appendChild(imagemPokemon);

        let nomePokemon = document.createElement('p');
        nomePokemon.innerText = pokemon.name;
        cardPokemon.appendChild(nomePokemon);

        containerPokemons.appendChild(cardPokemon);
        cardPokemon.addEventListener('click', () => {
            const modal = document.getElementById('modal-pokemon');
            const nome = document.getElementById('pokemon-nome');
            const imagem = document.getElementById('pokemon-imagem');
            const stats = document.getElementById('pokemon-stats');

            nome.innerText = pokemon.name;
            imagem.src = pokemon.sprites.front_default;

            stats.innerHTML = '';
            pokemon.stats.forEach(stat => {
                const statElement = document.createElement('p');
                statElement.classList.add(`stat-${stat.stat.name}`);

             
                const statName = document.createElement('span');
                statName.innerText = stat.stat.name;

                
                const statValue = document.createElement('span');
                statValue.innerText = stat.base_stat;

                statElement.appendChild(statName);
                statElement.appendChild(statValue);

                stats.appendChild(statElement);
            });

            modal.style.display = 'flex';
        });
    }
}

fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(resposta => resposta.json())
    .then(dados => {
        const promises = dados.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));

        Promise.all(promises)
            .then(resultados => {
                listaCompletaPokemons = resultados;
                listaCompletaPokemons.sort((a, b) => a.id - b.id);
                criarCards(listaCompletaPokemons);
            });
    });

barraPesquisa.addEventListener('keyup', () => {
    const textoPesquisa = barraPesquisa.value.toLowerCase();

    const listaFiltrada = listaCompletaPokemons.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(textoPesquisa);
    });

    criarCards(listaFiltrada);
});

const fecharModal = document.querySelector('.fechar-modal');
const modal = document.getElementById('modal-pokemon');

fecharModal.addEventListener('click', () => {
    modal.style.display = 'none';
});