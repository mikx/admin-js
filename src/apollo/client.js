import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloLink, split} from 'apollo-client-preset'
import {getMainDefinition} from 'apollo-utilities'
import {withClientState} from 'apollo-link-state'

import config from '../constants/config'

import resolvers from './state/resolvers'
import defaults from './state/defaults'

//-- cache strategy
const cache = new InMemoryCache();

//-- compile stateLink
const stateLink = withClientState({
    cache,
    resolvers,
    defaults
});

const backendOptions = {
    httpPort: 7070,
    endpointSlug: 'graphql',
    httpGqlEndpoint: `${config.base}/graphql`,
};

//-- compile httpLink with auth middleware
const httpLink = new HttpLink({
    uri: backendOptions.httpGqlEndpoint,
    credentials: 'include',
});


//-- split streams
const link = ApolloLink.from(
    [
        stateLink,
        split(
            ({query}) => {
                const {kind, operation} = getMainDefinition(query)
                return kind === 'OperationDefinition' && operation === 'subscription'
            },
            httpLink,
            httpLink,
        )
    ]
);


//-- build client
const client = new ApolloClient({
    link: httpLink,
    cache,
});

export default client;
