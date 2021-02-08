import React from 'react'

const Pokemon = props => {

    const {match} = props;
    const {params} = match;
    const pokemonID = params.id

    return (
        <div>
            {`pokemon page of id : ${pokemonID}!`}
        </div>
    )
}

export default Pokemon;