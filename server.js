const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');
const pokemonData = require('./pokemon.json');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

// Simple GET route to return the array of Pokémon
app.get('/', (req, res) => {
    res.send('Welcome to the Pokémon API');
  });
  

// GraphQL route
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true, // Enables the GraphiQL tool for interactive querying
}));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
