import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, ApolloLink, concat} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';

const uri = 'http://localhost:3000/graphql'; // <-- add the URL of the GraphQL server here

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token') || null)
  });
  return forward(operation);
});

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const http = httpLink.create({uri});
  return {
    link: concat(authMiddleware, http),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
