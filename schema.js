const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
const pokemonData = require('./pokemon.json');

// Define the PokemonType
const PokemonType = new GraphQLObjectType({
  name: 'Pokemon',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: new GraphQLObjectType({
      name: 'PokemonName',
      fields: () => ({
        english: { type: GraphQLString },
        japanese: { type: GraphQLString },
        chinese: { type: GraphQLString },
        french: { type: GraphQLString }
      })
    }) },
    type: { type: new GraphQLList(GraphQLString) },
    base: { type: new GraphQLObjectType({
      name: 'BaseStats',
      fields: () => ({
        HP: { type: GraphQLInt },
        Attack: { type: GraphQLInt },
        Defense: { type: GraphQLInt },
        SpAttack: { type: GraphQLInt, resolve: (parent) => parent["Sp. Attack"] }, // Adjusted for the correct JSON key
        SpDefense: { type: GraphQLInt, resolve: (parent) => parent["Sp. Defense"] }, // Adjusted for the correct JSON key
        Speed: { type: GraphQLInt },
      })
    }) },
  }),
});

// Define the RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    pokemon: {
      type: new GraphQLList(PokemonType),
      resolve(_, args) { 
        return pokemonData;
      },
    },
    pokemonById: {
      type: PokemonType,
      args: { id: { type: GraphQLInt } },
      resolve(_, args) { 
        return pokemonData.find(pokemon => pokemon.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
