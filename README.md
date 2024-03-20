# Welcome to Pokedex-web-app

Projet: Pokédex avec React et GraphQL
Ce projet est un Pokédex construit avec React pour l'interface utilisateur et GraphQL pour l'interrogation des données. Il permet aux utilisateurs de consulter une liste de Pokémon, d'effectuer des recherches et de filtrer par type, et d'accéder à des détails spécifiques sur chaque Pokémon.

Fonctionnalités
Liste de Pokémon: Affiche tous les Pokémon disponibles avec leurs noms, types et statistiques de base.
Recherche et Filtre: Permet aux utilisateurs de rechercher un Pokémon par nom et de filtrer la liste par type de Pokémon.
Pagination: La liste de Pokémon supporte la pagination pour une navigation facile.
Détails du Pokémon: En cliquant sur un Pokémon, les utilisateurs peuvent voir des informations détaillées, y compris une image du Pokémon.
Technologies Utilisées
Front-end: React.js
API de données: GraphQL avec Apollo Client
Back-end (pour les données): Express.js et une base de données JSON simple pour les données Pokémon.
Prérequis
Avant de démarrer, assurez-vous d'avoir Node.js et npm installés sur votre système. Ce projet a été créé avec Node.js version v14.17.0 ou supérieur et npm version 6.14.13 ou supérieur.

Installation
Pour exécuter ce projet localement, suivez ces étapes :

Cloner le dépôt

sh
Copy code
git clone https://exempledepot.com/projet-pokedex.git
cd projet-pokedex
Installer les dépendances

Dans le dossier racine du projet, exécutez :

sh
Copy code
npm install
Répétez cette étape dans le dossier du serveur si votre projet est structuré de cette façon.

Démarrer le serveur back-end

Si votre projet inclut un serveur back-end (Express.js dans cet exemple), naviguez vers le dossier du serveur et démarrez-le :

sh
Copy code
cd chemin/vers/serveur
npm start
Démarrer l'application React

Dans un nouveau terminal, à partir du dossier racine du projet, exécutez :

sh
Copy code
npm start
Ceci lancera l'application dans votre navigateur à l'adresse http://localhost:3000.
