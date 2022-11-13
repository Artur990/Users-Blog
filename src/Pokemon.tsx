import React, { useEffect } from "react";
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
// Types
import { PokemonType } from "./App";

export const pokemonLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<PokemonType> => {
  const results = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.name}`
  );

  if (!results.ok) throw new Error("Something went wrong!");

  const pokemon = await results.json();

  return pokemon;
};
const Pokemon = () => {
  const d = useLoaderData() as PokemonType;
  console.log(d);
  return (
    <>
      <div>sd</div>
      <h2>{d.name}</h2>
      <img src={d.sprites.front_default} />
    </>
  );
};
export default Pokemon;
