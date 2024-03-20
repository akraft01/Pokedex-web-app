import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import logo from "./poke.png";
const GET_POKEMONS = gql`
{
    pokemon {
        id
        name {
            english
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

function PokemonList() {
    const { loading, error, data } = useQuery(GET_POKEMONS);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const filteredPokemons = data.pokemon.filter(pokemon =>
        pokemon.name.english.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedType === '' || pokemon.type.includes(selectedType))
    );

    const sortPokemons = (a, b) => {
        const isReversed = sortDirection === 'asc' ? 1 : -1;
        if(sortColumn === 'name') {
            return isReversed * a.name.english.localeCompare(b.name.english);
        }
        if(sortColumn === 'id') {
            return isReversed * (a.id - b.id);
        }
        return isReversed * (a.base[sortColumn] - b.base[sortColumn]);
    };

    const handleSort = (column) => {
        const isAsc = sortColumn === column && sortDirection === 'asc';
        setSortColumn(column);
        setSortDirection(isAsc ? 'desc' : 'asc');
    };

    const currentItems = filteredPokemons.sort(sortPokemons).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
    const formatPokemonId = (id) => {
        return id.toString().padStart(3, '0');
    };
    
    const goToPreviousPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);

    const goToNextPage = () => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages);

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    const goToLastPage = () => {
        setCurrentPage(totalPages);
    };

    return (
        <div>
            <h1>Pokémons
            <img className='logoball' src={logo} alt="logo"></img>
            </h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search Pokémon"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <select
                    value={selectedType}
                    onChange={e => setSelectedType(e.target.value)}
                >
                    <option value="">All Types</option>
                    {Array.from(new Set(data.pokemon.flatMap(pokemon => pokemon.type))).map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <table>
            <thead>
    <tr>
    <th class="non-clickable"></th> 
        <th onClick={() => handleSort('id')}>
            ID {sortColumn === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('name')}>
            Name {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th class="non-clickable type-column">Type</th> 
        <th onClick={() => handleSort('HP')}>
            HP {sortColumn === 'HP' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('Attack')}>
            Attack {sortColumn === 'Attack' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('Defense')}>
            Defense {sortColumn === 'Defense' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('SpAttack')}>
            Sp. Attack {sortColumn === 'SpAttack' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('SpDefense')}>
            Sp. Defense {sortColumn === 'SpDefense' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('Speed')}>
            Speed {sortColumn === 'Speed' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
    </tr>
</thead>
                <tbody>
                    {currentItems.map(({ id, name, type, base }) => (
                        <tr key={id}>
                            <td>
                            <img src={require(`./sprites/${formatPokemonId(id)}MS.png`)} alt={name.english} />

                            </td>
                            <td>{id}</td>
                            <td>
                                <Link to={{
                                    pathname: `/pokemon/${id}`,
                                    state: { pokemon: { id, name, type, base } }
                                }}>
                                    {name.english}
                                </Link>
                            </td>
                            <td>{type.join(', ')}</td>
                            <td>{base.HP}</td>
                            <td>{base.Attack}</td>
                            <td>{base.Defense}</td>
                            <td>{base.SpAttack}</td>
                            <td>{base.SpDefense}</td>
                            <td>{base.Speed}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button className="pagination-first" onClick={goToFirstPage} disabled={currentPage === 1}>
                &lt;&lt;&lt;
                </button>
                <button className="pagination-prev" onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1;
                    const isCurrentPage = pageNumber === currentPage;
                    const isHiddenPage = Math.abs(pageNumber - currentPage) > 2;

                    if (isHiddenPage) {
                        return null;
                    }

                    return (
                        <button
                            key={index}
                            className={isCurrentPage ? 'active' : ''}
                            onClick={() => goToPage(pageNumber)}
                        >
                            {isCurrentPage ? <strong>{pageNumber}</strong> : pageNumber}
                        </button>
                    );
                })}
                <button className="pagination-next" onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
                <button className="pagination-last" onClick={goToLastPage} disabled={currentPage === totalPages}>
                &gt;&gt;&gt;
                </button>
            </div>
        </div>
    );
}

export default PokemonList;