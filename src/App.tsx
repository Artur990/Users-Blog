import React from "react";
import { Outlet, Link, useLoaderData } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import EditUsers from "./components/EditUsers";

// const { userCurrent } = useAuth();
export interface PokemonType {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
}

interface PokemonsType {
  pokemons: {
    results: PokemonType[];
  };
}

export const rootLoader = async (): Promise<PokemonsType> => {
  const results = await fetch("https://pokeapi.co/api/v2/pokemon");

  if (!results.ok) throw new Error("Something went wrong!");

  const pokemons = await results.json();

  return { pokemons };
};
//
const App: React.FC = () => {
  // const { pokemons } = useLoaderData() as PokemonsType;
  // console.log(pokemons);
  return (
    <AuthContextProvider>
      <>
        {/* <header>
          {pokemons.results.map((pokemon) => (
            <Link
              style={{ marginRight: 20 }}
              key={pokemon.name}
              to={`pokemon/${pokemon.name}`}
            >
              {pokemon.name}
            </Link>
          ))}
        </header> */}
        <Loading />
        <Navbar />
        <Toaster />
        <Outlet />
      </>
    </AuthContextProvider>
  );
};

export default App;
{
  /* <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/myPost" element={<MyPost />} />
          <Route path="/dodajPost" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reAuth" element={<ReAuth />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/accountSettings" element={<AccountSettings />} />
            <Route path="/changeEmail" element={<ChangeEmail />} />
            <Route path="/delateAccount" element={<DeleteAccount />} />
            <Route path="/changePassword" element={<ChangePassword />} />
          </Route>
        </Routes> */
}
