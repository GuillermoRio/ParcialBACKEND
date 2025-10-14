import axios from "axios";

type AbilityInfo = {
  name: string;
  url: string;
}

type PokemonAbility = {
  ability: AbilityInfo;
  is_hidden: boolean;
  slot: number;
}

type PokemonType = {
  slot: number;
  type: { name: string; url: string };
}

type PokemonData = {
  name: string;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[]
}

type PokeRes = {
    results: [{name: string, url: string}];
}

const GetPokemons = async () => {
    try{
        const Pokemon = (await axios.get<PokeRes>("https://pokeapi.co/api/v2/pokemon?Limit=6")).data;
        
        const PokeResult = Pokemon.results;

        const details: PokemonData[] = await Promise.all(
            PokeResult.map(async (p) => {
                console.log(p.name);
                const res = await axios.get<PokemonData>(p.url);
                return res.data;
            })
        );
    }catch(error){
        console.log(error);
    }

}

GetPokemons();