import Relay from 'react-relay';

/*
  App Route to point to developer endpoint: {see api/types/query_type}
  url: https://facebook.github.io/relay/docs/guides-routes.html#content
  params: {}
*/

const ConnectionRoute = {
  queries: {
    connection: () => Relay.QL` query {
      connection(id: $id)
    } `,
  },

  paramDefinitions: {
    id: { required: true },
  },
  name: 'ConnectionRoute',
};

export default ConnectionRoute;
