const urlParams = new URLSearchParams(window.location.search);
const thisPage = urlParams.get('page')

async function SelectPoke(pokeId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/` ,{method:'get'})
    const data = await response.json()
    console.log(data.types[0].type.name);
}
function ShowDetails(id) {
    window.location.href = `./pages/details.html?id=${id}`
}
async function ShowPokemons() {
    
    const cards = document.getElementById("cards")
    cards.innerHTML = ''
    await fetch(`https://pokeapi.co/api/v2/pokemon?limit=66&offset=${thisPage? thisPage * 11: 0}`, {method:'get'})
    .then(response => response.json())
    .then(data => data.results.map(async (pokemon)=>{

        await fetch(pokemon.url).then(response => response.json()).then(data => {
            cards.innerHTML += `<li class='card ${data.types[0].type.name}' onClick='ShowDetails(${data.id})'>
            <div class='containerTypes'>
            ${data.types.map( typeName => `<span class='type'>${typeName.type.name}</span>`)}
            </div>
            <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg' class='cardImg'/>
            <h1 class='pokeName'>${pokemon.name}</h1>
            </li>
            `

        } )
        
    }))
}