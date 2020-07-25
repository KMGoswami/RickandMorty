import React, { useEffect, Fragment, useState}  from 'react';
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { compose, graphql, Query } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import styled from 'styled-components';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'episode', label: 'Episode', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'air_date', label: 'Air Date', minWidth: 100 },
];

const GET_ALL_EPISODES = gql`
  query GetEpisodes($page: String){
    episodesByPage(page:$page){ 
    info{
      count
      next
      prev
    } 
    results{
      id
      episode
      name
      air_date
      }
    }
  }`;

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});


const Episodes = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return(
  <Query query={GET_ALL_EPISODES} variables={{page:"1"}}>
   { ({ loading, error, data, fetchMore}) =>{
      if(loading) return <h1>Loading...</h1>;
      return(
        <div>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.episodesByPage.results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>{
                      return(
                        <TableRow>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.episode}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.air_date}</TableCell>
                        </TableRow>
                      );
                  }
                    )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination 
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={loading ? -1:data.episodesByPage.info.count}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={(event, newPage) => {
                setPage(newPage);
                if(data.episodesByPage.info.next == null || 
                  (loading && ((page+1) * rowsPerPage) < data.episodesByPage.results.length)) return;
                let nextUrl = new URL(data.episodesByPage.info.next.toString());
                let nextPage = nextUrl.searchParams.get("page").toString();
                fetchMore({
                  query:GET_ALL_EPISODES,
                  variables:{page:nextPage},
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      episodesByPage:{
                        info:{...fetchMoreResult.episodesByPage.info},
                        results: [...prev.episodesByPage.results, ...fetchMoreResult.episodesByPage.results],
                        __typename: "Episodes"
                      }
                      });
                  }
                });

              }}
              onChangeRowsPerPage={ (event) => {
                setRowsPerPage(+event.target.value);
                setPage(0);
                if(data.episodesByPage.info.next == null || 
                  (loading && ((page+1) * rowsPerPage) < data.episodesByPage.results.length)) return;
                let nextUrl = new URL(data.episodesByPage.info.next.toString());
                let nextPage = nextUrl.searchParams.get("page").toString();
                fetchMore({
                  query:GET_ALL_EPISODES,
                  variables:{page:nextPage},
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      episodesByPage:{
                        info:{...fetchMoreResult.episodesByPage.info},
                        results: [...prev.episodesByPage.results, ...fetchMoreResult.episodesByPage.results],
                        __typename: "Episodes"
                      }
                      });
                  }
                });
              }}
              nextIconButtonProps={{disabled: (!loading && ((page+1) * rowsPerPage) >= data.episodesByPage.results.length)}}
            />
          </Paper>
        </div>
      )
    }}

  </Query>
);
}
export default Episodes;  