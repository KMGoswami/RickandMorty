import React, { useEffect, Fragment, useState}  from 'react';
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { compose, graphql, Query } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  container:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
   titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));

const GET_ALL_CHARACTERS = gql`
	query GetCharacters($page: String){
	  charactersByPage(page:$page){ 
    info{
      next
      prev
    } 
		results{
	    name
	    status
      image
	  	}
	  }
	}`;

const Characters = () => {

  useEffect(()=> {
    window.addEventListener('scroll',handleScroll);
    console.log("Calling use EFfect function*****");
  })

  const handleScroll = e => {
    console.log("Inside function");
    let element = e.target
    console.log(element);
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log("It is the end");
    }
  }

  return(<Query query={GET_ALL_CHARACTERS} variables={{page:"1"}}>
    { ({ loading, error, data, fetchMore}) =>{
      if(loading) return <h1>Loading...</h1>;

      return (<div className="content-container" onScroll={handleScroll}>
      <GridList cols={5}>
        {
          data.charactersByPage.results &&
          data.charactersByPage.results.map(character => (
            <GridListTile key={character.id} cols={1} rows={2}>
            <Typography >
              <Card >
                <CardMedia
                  component="img"
                  alt={character.name} 
                  height="180"
                  image={character.image} 
                  title={character.name} 
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {character.name} 
                  </Typography>
                </CardContent>
              </Card>
              </Typography>
            </GridListTile>
          ))
        }
      </GridList> 
      {data.charactersByPage.info.next &&
      <Button color="primary" onClick={() =>{
        let nextUrl = new URL(data.charactersByPage.info.next.toString());
        let nextPage = nextUrl.searchParams.get("page").toString();
        fetchMore({
          query:GET_ALL_CHARACTERS,
          variables:{page:nextPage},
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
              charactersByPage:{
                info:{...fetchMoreResult.charactersByPage.info},
                results: [...prev.charactersByPage.results, ...fetchMoreResult.charactersByPage.results],
                __typename: "Characters"
              }
              });
          }
        })
      }
      }>Load More</Button>}
      </div>);
    }}
  </Query>);

}
export default Characters;