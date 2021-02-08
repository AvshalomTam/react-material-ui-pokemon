import React, {useState} from 'react';
import {
    AppBar, 
    Toolbar, 
    Grid, 
    Card, 
    CardContent, 
    CardMedia, 
    CircularProgress,
    Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import mockData from './mockData';

const useStyles = makeStyles({
    pokedexContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px'
    },
    pokedexSearching: {
        paddingTop: '80px',
        paddingLeft: '80px',
        paddingRight: '80px'
    },
    Card: {
        cursor: 'pointer'
    },
    CardMedia: {
        margin: 'auto'
    },
    CardContent: {
        textAlign: 'center'
    }
}) 

const firstLetterUp = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
}

const Pokedex = (props) => {
    const {history} = props;
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState(mockData)

    const getPokemonCard = (pokemonId) => {
        const {id, name} = pokemonData[`${pokemonId}`]
        const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

        return (
            <Grid item xs={4} key={id}>
                <Card onClick={() => history.push(`/${id}`)} className={classes.Card}>
                    <CardMedia 
                        className={classes.CardMedia}
                        image={sprite}
                        style={{width: "130px", height: "130px"}}
                    />
                    <CardContent className={classes.CardContent}>
                        <Typography>
                            {`${id}. ${firstLetterUp(name)}`}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }

    return (
        <>
          <AppBar position="static">
            <Toolbar />
          </AppBar>
          {pokemonData ? (
          <Grid container spacing={2} className={classes.pokedexContainer}>
              {Object.keys(pokemonData).map(id => getPokemonCard(id))}
          </Grid>
          ) : (
              <CircularProgress className={classes.pokedexSearching}/>
          )}
        </>
    )
}

export default Pokedex;
