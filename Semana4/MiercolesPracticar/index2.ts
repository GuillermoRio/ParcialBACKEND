import axios from "axios";

type AbilityInfo = {
  name: string;
  url: string;
};

type PokemonAbility = {
  ability: AbilityInfo;
  is_hidden: boolean;
  slot: number;
};

type PokemonType = {
  slot: number;
  type: { name: string; url: string };
};

type PokemonData = {
  name: string;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
};

type PokeListResponse = {
  results: { name: string; url: string }[];
};

const getPokemons = async () => {
  try {
    // 👇 OJO: no pongas el / final o puede devolver redirección
    const response = await axios.get<PokeListResponse>(
      "https://pokeapi.co/api/v2/pokemon?limit=10"
    );

    const pokemons = response.data.results;

    console.log("✅ Lista obtenida. Ejemplo:", pokemons[0]);

  } catch (error) {
    console.error("❌ Error al obtener pokemons:", error);
  }
};

getPokemons();
