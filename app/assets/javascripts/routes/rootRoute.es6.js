import Relay from 'react-relay';

/*
  App Route to point to root endpoint: {see api/types/query_type}
  url: https://facebook.github.io/relay/docs/guides-routes.html#content
  params: {}
*/

const RootRoute = {
  queries: {
    root: () => Relay.QL` query {
      root
    } `,
  },

  params: {},

  name: 'RootRoute',
};

export default RootRoute;
