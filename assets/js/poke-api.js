
const pokeApi = {}/*criando um objeto vazio pra receber o conteudo da API*/

function convertPokeApiDetailToPokemon(pokeDetail){
 const pokemon = new Pokemon()
 pokemon.number = pokeDetail.id
 pokemon.name = pokeDetail.name

 const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
 const [type] = types

 pokemon.types = types
 pokemon.type = type

 pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

 return pokemon
}

pokeApi.getPokemonsDetail = (pokemon) => {
 return fetch(pokemon.url)
 .then((response) => response.json())/*Lista de json de detalhes do pokemons*/
 .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
 const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

return fetch(url)
 .then((response) => response.json())/*Convertendo em json*/
 .then((jsonBody) => jsonBody.results)/*Filtrando so o resultado*/
 .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))/*mapeando os detalhes do pokemons*/
 .then((detailRequests) => Promise.all(detailRequests))/*Executando uma lista de requisição*/
 .then((pokemonsDetails) => pokemonsDetails)
 }/*Lista de promessas do detalhe do pokemon*/
/*Executando o fetch para consumir a api. Pegando o Json da api como body */