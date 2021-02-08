import React, {useState} from 'react'
import mockData from './mockData';
import {Typography} from '@material-ui/core';
import {Link} from "react-router-dom";

import {firstLetterUp} from './Pokedex'

const Pokemon = props => {
    const {match} = props;
    const {params} = match;
    const pokemonID = params.id
    const [pokemon, setPokemon] = useState(mockData[`${pokemonID}`])

    const generatePokemonJSX = () => {
        const {name, id, species, height, weight, types, sprites} = pokemon
        const fullImgUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png` 
        const {front_default} = sprites

        return (
            <>
            <Typography variant="h2">
                {`${id}. ${firstLetterUp(name)}`}
                <img src={front_default}/>
            </Typography>
            <img style={{width:"100px", height:"100px"}} src={fullImgUrl}/>
            <Typography variant="h5">Pokemon Info:</Typography>
            <Typography>
                {"Species: "}
                <Link to={species.url}>{species.name}</Link>
            </Typography>
            <Typography>Height: {height}</Typography>
            <Typography>Weight: {weight}</Typography>
            <Typography variant="h6">Types:</Typography>
            {types.map(typeInfo => {
                const name = typeInfo.type.name
                return <Typography key={name}>{name}</Typography>
                })}
            </>
        )
    }
    return (
        <>
        {generatePokemonJSX(pokemon)}
        </>
    )
}

export default Pokemon;