async function SelectPoke(pokeId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/` ,{method:'get'})
    const data = await response.json()
    console.log(data.types[0].type.name);
}
async function ShowPokemons() {
    const cards = document.getElementById("cards")
    await fetch('https://pokeapi.co/api/v2/pokemon?limit=90&offset=0', {method:'get'})
    .then(response => response.json())
    .then(data => data.results.map(async (pokemon, index)=>{
        await fetch(pokemon.url).then(response => response.json()).then(data => {
            cards.innerHTML += `<li class='card ${data.types[0].type.name}'onClick='alert("${pokemon.name}")'>
            <div class='containerTypes'>
            ${data.types.map( typeName => `<span class='type'>${typeName.type.name}</span>`)}
            </div>
            <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg' class='cardImg' loading='lazy'/>
            <h1 class='pokeName'>${pokemon.name}</h1>
            </li>`
        } )
        
    }))
}