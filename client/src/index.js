import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/"
});

const client = new ApolloClient({
  cache,
  link
});
console.log("------------------------------------------------")
// ... above is the instantiation of the client object.
client.query({
    query: gql`
      query GetCharacters{
	  characters{  
		results{
	    name
	    status
	  	}
	  }
	}
    `
  })
  .then(result => console.log(result));

ReactDOM.render(
	 <ApolloProvider client={client}>
  		<React.StrictMode>
    		<App />
  		</React.StrictMode>
  	</ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
