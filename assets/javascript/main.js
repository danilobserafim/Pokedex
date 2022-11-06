const urlParams = new URLSearchParams(window.location.search);
const thisPage = urlParams.get('page')

function ShowDetails(id) {
    window.location.href = `./pages/details.html?id=${id}`
}
async function ShowPokemons() {
    const cards = document.getElementById("cards")
    if (!thisPage) {
        window.location.href = './?page=1' 
    }  
     
    const menuPage = document.getElementById(`page${thisPage}`)
    menuPage.style.color = 'gray'

    for (let i = 0; i < 60; i++) {
        
        var poke = await fetch(`https://pokeapi.co/api/v2/pokemon/${(thisPage - 1) * 66 + i + 1 }/`).then(response => response.json()).then(data => data)

        cards.innerHTML += `<li class='card ${poke.types[0].type.name}' onClick='ShowDetails(${poke.id})'>
        <div class='containerTypes'>
        ${poke.types.map( typeName => `<span class='type'>${typeName.type.name}</span>`)}
        </div>
        <img src=${poke.sprites.other.dream_world.front_default ? poke.sprites.other.dream_world.front_default : "./assets/images/no_foto.png"} class='cardImg'/>
        <h1 class='pokeName'>${poke.name}</h1>
        </li>
        `
    }  
}