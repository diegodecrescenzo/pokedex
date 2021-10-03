(function(){
    //Volume Audio
const volumeaudio = document.querySelector('[data-audio]');
volumeaudio.volume = 0.5;

// Selecionando no DOM o elemento aonde será inseridos os dados dinamicamente.
const pokedex = document.querySelector('[data-list]');

// Função responsavel por se conectar a API e buscar todos os dados dos pokemons.
const fetchPokemon = () => {

    //Array Vazio
    const promises = [];

    //Laço de repetição, para busca de cada Pokemon pelo ID.
    for (i = 1; i <= 251; i++) {

        // Url de conexão com a API - POKEAPI
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

        // Inclusão de cada resposta no Array criado.
        promises.push(fetch(url).then(response => response.json()));
    }

    // Pegando todos as respostas atraves do Objeto Promise.
    // Onde Results será todos os Pokemons encontrado.
    // e Data será apenas um Pokemon, onde poderemos acessar todos seus atributos.
    Promise.all(promises).then((results) => {
        // Constante onde será armazenada os dados de cada um dos pokemons
        const pokemon = results.map((data) => ({
            id: data.id,
            nome: data.name,
            habilidades: data.abilities.map((ability) => ability.ability.name).join(','),
            imagem: data.sprites.other.dream_world.front_default,
            tipo: data.types.map((type) => type.type.name).join(',')
        }))

        pokemonList(pokemon)
    })
}

fetchPokemon();


const pokemonList = (pokemon) => {
    const pokecard = pokemon.map((poke) =>
        `<li class="card-pokemon data-card">
            <div class="card-pokemon--imagem">
                <img src="${poke.imagem}" />
            </div>
            <h2 class="card-pokemon--titulo">${poke.id} - ${poke.nome}<h2>
            <h4 class="card-pokemon--tipo">Tipo: ${poke.tipo}</h4>
            <p class="card-pokemon--habilidades">Habilidades: ${poke.habilidades}</p> 
            <div class="card-pokemon--favorito" data-icon>
                <span class="far fa-heart"></span>
            </div>
        </li>`
    ).join('')

    pokedex.innerHTML = pokecard
    
    
    // Adicionando Evento de Click no Icone
    const icons = document.querySelectorAll('[data-icon]');

    icons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();

            const pokemonAdicionado = document.createElement('div');
            pokemonAdicionado.className = "card-pokemon--aviso";
            pokemonAdicionado.innerHTML = "Pokemon Adicionado!"
            
            icon.innerHTML = "";
            icon.innerHTML = '<span class="fas fa-heart"></span>';
            icon.appendChild(pokemonAdicionado);
            ocultarElemento(pokemonAdicionado);                         
        })
    })
}

const ocultarElemento = (elemento) => {
    elemento.classList.add('hide');
}








})()