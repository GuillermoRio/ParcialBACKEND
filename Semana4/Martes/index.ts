//GetEpisodesFromCharacter

import axios from "axios"
type Character = {
  id: number; // Identificador único del personaje
  name: string; // Nombre del personaje
  status: "Alive" | "Dead" | "unknown"; // Estado actual
  species: string; // Especie (humano, alien, etc.)
  type: string; // Tipo o subespecie (puede estar vacío)
  gender: "Female" | "Male" | "Genderless" | "unknown"; // Género
  origin: {
    name: string; // Nombre del lugar de origen
    url: string; // Enlace al recurso del origen
  };
  location: {
    name: string; // Última ubicación conocida
    url: string; // Enlace al recurso de la ubicación
  };
  image: string; // URL de la imagen del personaje
  episode: string[]; // Lista de URLs de episodios en los que aparece
  url: string; // Enlace al recurso del personaje
  created: string; // Fecha de creación del recurso (ISO string)
}
type Episode = {
  id: number; // Identificador único del episodio
  name: string; // Título del episodio
  air_date: string; // Fecha de emisión
  episode: string; // Código del episodio, ej: "S01E01"
  characters: string[]; // URLs de personajes que aparecen
  url: string; // Enlace al recurso del episodio
  created: string; // Fecha de creación del recurso (ISO string)
}

const GetEpisodesFromCharacter = async (id: number) => {
    try{
        const char = await axios.get<Character>("https://rickandmortyapi.com/api/character/" + id);
        //console.log(charEpi.data.episode);
        const episodes = char.data.episode.map(async (ep) => {
            const oneEpi = await axios.get<Episode>(ep);
            //console.log(oneEpi.data.name);
            return oneEpi.data;
        })
        const result = await Promise.all(episodes);
        //console.log(result);
        return result;

    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("Axios error" + error.message);
        }else{
            console.log("Error" + error);
        }
    }
}

const myEpi = GetEpisodesFromCharacter(1);
console.log(await (myEpi));