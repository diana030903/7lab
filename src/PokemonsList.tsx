import React, { useEffect, useState } from "react"
import axiosClient from './axiosClient'

interface Pokemon {
  name: string
  url: string
}

const PokemonsList: React.FC<{ onSelectPokemon: (id: number) => void }> = ({
  onSelectPokemon,
}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axiosClient.get("pokemon/")
        setPokemons(response.data.results)
      } catch (error) {
        console.error("Ошибка загрузки покемонов:", error)
      }
    }

    fetchPokemons()
  }, [])

  return (
    <div>
      <h1>Список Покемонов</h1>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            {}
            <button onClick={() => onSelectPokemon(index + 1)}>
              {pokemon.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonsList