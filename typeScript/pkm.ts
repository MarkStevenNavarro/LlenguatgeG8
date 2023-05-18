const urlPokemons:URL | RequestInfo = "https://pokeapi.co/api/v2/pokemon/";
const urlTipus:URL | RequestInfo = "https://pokeapi.co/api/v2/type/"
const firstPokemon:number = 1;
let numPokemon:number
fetch(urlPokemons)
.then(response => response.json())
.then(data=>{
    numPokemon = data.count;
})
let contenidor = document.querySelector(".contenidor");
let select:any | null = document.getElementById("tipus");
let nomPk:any|null = document.getElementById("nomPK")

nomPk.addEventListener("change", fetchPokemon)





function inserirSelector(){
    for(let i = 0; i<20; i++){
        fetch(urlTipus)
        .then(response => response.json())
        .then(data=>{
            let tipus = data.results[i].name;
            if(select!=null){
                if(tipus=='unknown'){
                    select.innerHTML+='<option value=unknown>all</option>'
                }else{
                    select.innerHTML+='<option value='+tipus+'>'+tipus+'</option>'
                }
                
            }
        
        })
        }
        if(select!=null){
        select.addEventListener("change",fetchPokemon)
    
        }
}
function showPokemon(pokemon:any,div:Element){
    let img = document.createElement('img');
    if(pokemon.sprites.front_default!=null){
    img.src = pokemon.sprites.front_default;
    }else{
        img.src = "imatges/unknown.png"
        img.style.height="96px"
        img.style.width="96px"
    }
    img.id=pokemon.id
    div.classList.add('image');
    div.appendChild(img);
   
   

    
  

    

    
    
}

async function fetchPokemon(){
    if(contenidor!=null && select!=null){
        contenidor.innerHTML=""
    for (let i = firstPokemon; i < numPokemon; i++) {
        let pokeEndpoint = `${urlPokemons}${i}`;
        let response = await fetch(pokeEndpoint);
        let pokemon = await response.json();
        if ((pokemon.types[0].type.name==select.value || (pokemon.types[1]!=undefined && pokemon.types[1].type.name==select.value))||select.value=="unknown"){
            if(nomPk.value=="" || pokemon.name.includes(nomPk.value)){
                showPokemon(pokemon, contenidor);
                let imatge:any|null=document.getElementById(pokemon.id)
                imatge.addEventListener("click",function(){
                  mostrarStats(pokemon.id)
                })
            }
        }
        
    }
    
}


}

function mostrarStats(id:number){
  
const caracteristiques:any|null = document.getElementById("caracteristiques");

fetch("https://pokeapi.co/api/v2/pokemon/"+id)
  .then(response => response.json())
  .then((pokemon: any) => {
    
    let hp = pokemon.stats[0].base_stat;
    let atac = pokemon.stats[1].base_stat;
    let def = pokemon.stats[2].base_stat;
    let atacSp = pokemon.stats[3].base_stat;
    let defSp = pokemon.stats[4].base_stat;
    let vel = pokemon.stats[5].base_stat;
    
   

    let hpBar = document.getElementById('hp-bar')!;
    let HP = document.getElementById("hp")!;
    let  atacBar = document.getElementById('atac-bar')!;
    let  ATAC = document.getElementById("atac")!;
    let  defBar = document.getElementById('def-bar')!;
    let DEF = document.getElementById("def")!;
    let atacSpBar = document.getElementById('atacSp-bar')!;
    let ATACSP = document.getElementById("atacSp")!;
    let defSpBar = document.getElementById('defSp-bar')!;
    let DEFSP = document.getElementById("defSp")!;
    let velBar = document.getElementById('vel-bar')!;
    let VEL = document.getElementById("vel")!;

    let labels=document.querySelectorAll("label")


    
    
    labels[0].innerHTML=hp
    hpBar.style.width = hp + 'px';
    hpBar.style.backgroundColor = getStatColor(hp);
    labels[1].innerHTML=atac
    atacBar.style.width = atac + 'px';
    atacBar.style.backgroundColor = getStatColor(atac);
    labels[2].innerHTML=def
    defBar.style.width = def + 'px';
    defBar.style.backgroundColor = getStatColor(def);
    labels[3].innerHTML=atacSp
    atacSpBar.style.width = atacSp + 'px';
    atacSpBar.style.backgroundColor = getStatColor(atacSp);
    labels[4].innerHTML=defSp
    defSpBar.style.width = defSp + 'px';
    defSpBar.style.backgroundColor = getStatColor(defSp);
    labels[5].innerHTML=vel
    velBar.style.width = vel + 'px';
    velBar.style.backgroundColor = getStatColor(vel);

    caracteristiques.innerHTML = "Name: " + pokemon.name + "<br>" + "Height: " + pokemon.height / 10
      + " m.<br>" + "Weight: " + pokemon.weight / 10 + " Kg. <br>";
    let img = document.createElement("img");
    img.src = pokemon.sprites.front_default;
    let imgsy = document.createElement("img");
    imgsy.src = pokemon.sprites.front_shiny;
    caracteristiques.appendChild(img);
    caracteristiques.appendChild(imgsy);
  })
  .catch((error) => {
    console.error("Error fetching pokemon:", error);
  });

}
inserirSelector()
fetchPokemon()










function getStatColor(statValue: number): string {
  if (statValue >= 120) {
    return '#00ff00';
  } else if (statValue >= 70) {
    return '#ffcc00';
  } else {
    return '#ff0000';
  }
}


