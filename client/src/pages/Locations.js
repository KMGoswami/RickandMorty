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
  card:{
    borderWidth:1,
    borderStyle:'solid',
    borderColor: 'black',
    padding:0
  },
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    padding: 0
  }
}));

const GET_ALL_LOCATIONS = gql`
	query GetLocations($page: String){
	  locationsByPage(page:$page){ 
    info{
      next
      prev
    } 
		results{
	    name
	    type
      dimension
	  	}
	  }
	}`;

const Locations = () => {

  const classes = useStyles();

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

  return(<Query query={GET_ALL_LOCATIONS} variables={{page:"1"}}>
    { ({ loading, error, data, fetchMore}) =>{
      if(loading) return <h1>Loading...</h1>;

      return (<div onScroll={handleScroll}>
      <GridList cols={5} className={classes.gridList}>
        {
          data.locationsByPage.results &&
          data.locationsByPage.results.map(location => (
            <GridListTile key={location.id} cols={1} rows={1}>
            <Typography >
              <Card className={classes.card}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {location.name} 
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    {location.type} 
                  </Typography>
                </CardContent>
              </Card>
              </Typography>
            </GridListTile>
          ))
        }
      </GridList> 
      {data.locationsByPage.info.next &&
      <Button color="primary" onClick={() =>{
        let nextUrl = new URL(data.locationsByPage.info.next.toString());
        let nextPage = nextUrl.searchParams.get("page").toString();
        fetchMore({
          query:GET_ALL_LOCATIONS,
          variables:{page:nextPage},
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
              locationsByPage:{
                info:{...fetchMoreResult.locationsByPage.info},
                results: [...prev.locationsByPage.results, ...fetchMoreResult.locationsByPage.results],
                __typename: "Locations"
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
export default Locations;