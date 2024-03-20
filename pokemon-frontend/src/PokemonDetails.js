import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import './PokemonDetails.css';
import { useNavigate } from 'react-router-dom';
import typeTranslations from './typeTranslations.json';


// Mise à jour de la requête GraphQL pour correspondre à la nouvelle requête dans schéma
const GET_POKEMON_DETAILS = gql`
query GetPokemonDetails($id: Int!) {
  pokemonById(id: $id) {
    id
    name {
      english
      japanese
      chinese
      french
    }
    type
    base {
      HP
      Attack
      Defense
      SpAttack
      SpDefense
      Speed
    }
  }
}
`;
function formatPokemonId(id) {
  return id.toString().padStart(3, '0');
}

function getTranslations(typeEnglish) {
  const translation = typeTranslations.find(t => t.english === typeEnglish);
  return translation || { english: typeEnglish, chinese: "", japanese: "" };
}

function PokemonDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const numericId = parseInt(id); // Convertit l'ID en nombre, si nécessaire

  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { id: numericId }, 
  });
  const pokemonIdFormatted = formatPokemonId(id);
  const imagePath = require(`./images/${pokemonIdFormatted}.png`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading Pokémon details: {error.message}</p>;

  // Extraction des données du Pokémon pour simplifier l'accès aux champs
  const pokemon = data.pokemonById;
  const totalStats = pokemon.base.HP + pokemon.base.Attack + pokemon.base.Defense + 
                   pokemon.base.SpAttack + pokemon.base.SpDefense + pokemon.base.Speed;


  return (
  <div className="pokemon-details">
    {/* Bouton Retour */}
    <button onClick={() => navigate(-1)} className="back-button">◀</button>
      
    
    <div class="pokemon-container">
  <h2 class="pokemon-name">{pokemon.name.english}</h2>
</div>

    
    <div className="stats">
    <div className="stat"><div className="stat-name">Other names</div><div className="stat-value">{pokemon.name.french} (FR), {pokemon.name.chinese} (CHS), {pokemon.name.japanese} (JPN)</div></div>
    <div className="stat">
  <div className="stat-name">Type</div>
  <div className="stat-value">
    {pokemon.type.map(type => {
      const { english, chinese, japanese } = getTranslations(type);
      return `${english} (CHS: ${chinese}, JPN: ${japanese})`;
    }).join(', ')}
  </div>
</div>
      
{/* HP */}
<div className="stat">
  <div className="stat-name">HP</div>
  <div className="stat-bar">
    <div className="stat-fill" style={{ width: `${(pokemon.base.HP / 270) * 100}%` }}></div>
  </div>
  <div className="stat-value"><strong>{pokemon.base.HP}</strong></div>
</div>

{/* Attack */}
<div className="stat">
  <div className="stat-name">Attack</div>
  <div className="stat-bar">
    <div className="stat-fill" style={{ width: `${(pokemon.base.Attack / 200) * 100}%` }}></div>
  </div>
  <div className="stat-value"><strong>{pokemon.base.Attack}</strong></div>
</div>

{/* Defense */}
<div className="stat">
  <div className="stat-name">Defense</div>
  <div className="stat-bar">
    <div className="stat-fill" style={{ width: `${(pokemon.base.Defense / 250) * 100}%` }}></div>
  </div>
  <div className="stat-value"><strong>{pokemon.base.Defense}</strong></div>
</div>

{/* SpAttack */}
<div className="stat">
  <div className="stat-name">Sp. Attack</div>
  <div className="stat-bar">
    <div className="stat-fill" style={{ width: `${(pokemon.base.SpAttack / 200) * 100}%` }}></div>
  </div>
  <div className="stat-value"><strong>{pokemon.base.SpAttack}</strong></div>
</div>

{/* SpDefense */}
<div className="stat">
  <div className="stat-name">Sp. Defense</div>
  <div className="stat-bar">
    <div className="stat-fill" style={{ width: `${(pokemon.base.SpDefense / 250) * 100}%` }}></div>
  </div>
  <div className="stat-value"><strong>{pokemon.base.SpDefense}</strong></div>
</div>

{/* Speed */}
<div className="stat">
  <div className="stat-name">Speed</div>
  <div className="stat-bar">
    <div className="stat-fill" style={{ width: `${(pokemon.base.Speed / 200) * 100}%` }}></div>
  </div>
  <div className="stat-value"><strong>{pokemon.base.Speed}</strong></div>
</div>

      </div>
      <div className="stat">
  <div className="stat-name">Total Stats</div>
  <div className="stat-bar">
    <div className="total-stats-bar" style={{ width: `${(totalStats / 700) * 100}%` }}></div>
  </div>
  <div className="stat-value"><strong>{totalStats}</strong></div>
</div>

   
    <img src={imagePath} alt="Pokémon" style={{ marginTop: "20px" }} />
  </div>
);}

export default PokemonDetails;