import React, {useState} from 'react'
import {Typography, Link, CircularProgress, Button} from '@material-ui/core';
// import {Link} from "react-router-dom";
import {firstLetterUp} from './Pokedex'
import axios from 'axios';
import { useEffect } from 'react';

const Pokemon = props => {
    const {history, match} = props;
    const {params} = match;
    const pokemonID = params.id
    const [pokemon, setPokemon] = useState(undefined)

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
        .then((res) => {
            const {data} = res
            setPokemon(data)
        })
        .catch((error) => {
            setPokemon(false)
        })
    }, [pokemonID])

    const generatePokemonJSX = () => {
        const {name, id, species, height, weight, types, sprites} = pokemon
        const fullImgUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png` 
        const {front_default} = sprites

        return (
            <>
            <Typography variant="h2">
                {`${id}. ${firstLetterUp(name)}`}
                <img src={front_default} alt=""/>
            </Typography>
            <img style={{width:"100px", height:"100px"}} src={fullImgUrl} alt=""/>
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
        {pokemon === undefined && <CircularProgress />}
        {pokemon !== undefined && pokemon && generatePokemonJSX()}
        {pokemon === false && <Typography>Pokemon not found!</Typography>}
        {pokemon !== undefined && (
            <Button variant="contained" onClick={() => history.push('/')}>
                Back to All Pokemons
            </Button>
        )}
        </>
    )
}

export default Pokemon;