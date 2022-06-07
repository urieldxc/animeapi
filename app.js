//HE HECHO ESTO: 
/* Mi siguiente objetivo (porque soy un rayao): crear un buscador Y que te aparezca
el anime justo debajo, o en su defecto que aparezca algún mensaje como que no está (bucle, vaya)*/

/* (Sergio) 07/06/22 -> He puesto la imagen del anime. Ten cuidado por que has modificado el App.js pero el html no,
entonces a mi no me funcionaba ya que tenia selectores y movidas que yo no tenía obvio jajajaja.
Me he tomado el lujo de renombrar las variables, así son mas descriptivas, para cuando lo vuelvas a leer
será mas fácil. Te ha salido tio, muy bien!! (｡◕‿◕｡)*/

//EDIT: Para hacerlo mas modular, he separado el options del fetch para meterlo en otro js.
/* EDIT2: He creado para aprovechar el código anterior otro archivo que tiene una la función de traer, según
el ID del anime, los episodios del mismo, también hay un botón para mostrarlos o no

FALTA FACTORIZAR BIEN!!!*/

import { options } from './helpers/optionsFetch.js';
import { fetchEpisodes } from './fetchEpisodes.js';

let inputValue = "";
const container = document.querySelector(".container");
const animeTitle = document.querySelector(".animeTitle");
const episodesDiv = document.querySelector(".episodesDiv");
const inputSearch = document.querySelector(".inputSearch");

const animeFetch = async(inputValue) => {
    const response = await fetch(`https://jikan1.p.rapidapi.com/search/anime?q=${inputValue}`, options);
    const animeJSON = await response.json();
    const { results } = animeJSON;
    console.log(results)
    const { title, episodes, synopsis, image_url, mal_id} = results[3];
    
    const animeDesc = document.createElement("p");
    const animeImg = document.createElement("img")
    const container2 = document.createElement("div");
    container2.classList.add("numEpisodes");
    
    animeImg.src = image_url
    
    container.appendChild(animeImg)
    container.appendChild(animeDesc);
    container.appendChild(container2);
    
    animeTitle.innerHTML = title;
    animeDesc.innerHTML = synopsis;
    container2.innerHTML = `Episodes: ${episodes}`;
    container2.style.fontWeight = "bold";

    
    
    fetchEpisodes(mal_id, options); /* sacado de fetchEpisodes.js, como parámetros le paso el id del anime que hemos
    buscado y las opciones del fetch*/
    
}



const buttonEpisodes = document.querySelector(".episodesButton")
buttonEpisodes.addEventListener('click', () => {
    episodesDiv.classList.toggle("episodeHidden");
})

inputSearch.addEventListener('keypress', (e)=>{
    if(e.key == "Enter"){ 
    inputValue=inputSearch.value
    animeFetch(inputValue)
}
})