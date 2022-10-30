const title = document.getElementById("title")
const pageDetails = document.getElementById("details")
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id')

async function DetailsPokemon(id) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(response => response.json()).then((data, index) => {
        title.innerText = `Detalhes: ${data.name}`
        pageDetails.innerHTML += `
        <div id='containerImage' class='${data.types[0].type.name}'>
            <img src='${data.sprites.other.dream_world.front_default}' />
            <h1>${data.name}</h1>
            <div id='types'>${data.types.map( typeName => `<span class='type'>${typeName.type.name}</span>`)}</div>
        </div>
        <div id='cards'>
            <div id='abilities' class='card'>
                <h2>Habilidades</h2>
                ${data.abilities.map(ability=>{
                    return `<span>${ability.ability.name}</span>`
                })}            
            </div>
            <div id='stats' class='card'>
                <h2>Status</h2>
                ${data.stats.map(stat =>{
                    return `<span>${stat.stat.name}: ${stat.base_stat}</span>`
                })}
            </div>
        </div>
        `
    }
        )
}
function Back() {
    window.history.back()
}
pageDetails.onload = DetailsPokemon(id)