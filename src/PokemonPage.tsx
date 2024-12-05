import React, { useEffect, useState } from "react"
import axiosClient from './axiosClient'

interface PokemonDetails {
  name: string
  weight: number
  height: number
  sprites: {
    front_default: string
  }
  types: Array<{ type: { name: string } }>
}

const PokemonPage: React.FC<{ id: number; onBack: () => void }> = ({
  id,
  onBack,
}) => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axiosClient.get(`pokemon/${id}`)
        setPokemon(response.data)
      } catch (error) {
        console.error("Ошибка загрузки покемона:", error)
      }
    }

    fetchPokemon()
  }, [id])

  if (!pokemon) {
    return <p>Загрузка...</p>
  }

  return (
    <div>
      <button onClick={onBack}>Назад к списку</button>
      <h1>{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ width: "200px" }}
      />
      <p>Вес: {pokemon.weight}</p>
      <p>Рост: {pokemon.height}</p>
      <p>Типы:</p>
      <ul>
        {pokemon.types.map((type, index) => (
          <li key={index}>{type.type.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonPage