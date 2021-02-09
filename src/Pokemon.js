import React, {useState, useEffect} from 'react'
import {Typography, 
    Link, 
    CircularProgress, 
    Button, 
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper    
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {firstLetterUp} from './Pokedex'
import axios from 'axios';

const TABLE_COLOR = '#2F4F4F';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: TABLE_COLOR,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
}))(TableRow);

const useStyles = makeStyles({
    pokemonContainer: {
        color: TABLE_COLOR,
        textAlign: 'center',
        paddingTop: '20px'
    },
    pokemonName :{
        fontSize: "40px",
        text: 'bold'
    },
    table: {
        position: 'relative',
        maxWidth: 300
    },
    tableContainer: {
        margin: 'auto',
        position: 'relative',
        padding: '1px',
        maxWidth: 300,
        maxHeight: 180,
    },
    tableCell: {
        size: 'small'
    }
});

const makeTypesString = (types) => {
    let typesList = ''
    types.map(typeInfo => {
        typesList += `${typeInfo.type.name}, `
    })
    // subtract 2 last characters
    typesList = typesList.slice(0,-2)
    return typesList
}

const Pokemon = props => {
    const classes = useStyles();
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
        const {name, id, species, height, weight, types} = pokemon
        const typesAsString = makeTypesString(types)
        const fullImgUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png` 

        return (
            <>
            <Typography className={classes.pokemonName}>
                {`${id}. ${firstLetterUp(name)}`}
            </Typography>
            <Typography variant="h5" display="inline">Type: </Typography>
            <Typography variant="h6" display="inline" color='primary'>{typesAsString}</Typography>
            <br></br>
            <img style={{width:"180px", height:"180px"}} src={fullImgUrl} alt=""/>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell size='small'>Pokemon Info:</StyledTableCell>
                        <StyledTableCell align="right" size='small'>value</StyledTableCell>
                    </TableRow>
                    </TableHead>

                    <TableBody>
                    <StyledTableRow>
                            <StyledTableCell size='small'>Species</StyledTableCell>
                            <StyledTableCell align="right" size='small'>{species.name}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                            <StyledTableCell size='small'>Height</StyledTableCell>
                            <StyledTableCell align="right" size='small'>{height}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                            <StyledTableCell size='small'>Weight</StyledTableCell>
                            <StyledTableCell align="right" size='small'>{weight}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                            <StyledTableCell size='small'>Type</StyledTableCell>
                            <StyledTableCell align="right" size='small'>{typesAsString}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                            <StyledTableCell size='small'>Serial Number</StyledTableCell>
                            <StyledTableCell align="right" size='small'>{id}</StyledTableCell>
                    </StyledTableRow>
                    </TableBody>
                </Table>
                </TableContainer>
            </>
        )
    }
    return (
        <>
        <Container className={classes.pokemonContainer}> 
        {pokemon === undefined && <CircularProgress />}
        {pokemon !== undefined && pokemon && generatePokemonJSX()}
        {pokemon === false && <Typography>Pokemon not found!</Typography>}
        {pokemon !== undefined && (
            <Button variant="contained" onClick={() => history.push('/')}>
                Back to Pokemons
            </Button>
        )}
        </Container>
        </>
    )
}

export default Pokemon;