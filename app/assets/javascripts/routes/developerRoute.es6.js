import Relay from 'react-relay';

/*
  App Route to point to developer endpoint: {see api/types/query_type}
  url: https://facebook.github.io/relay/docs/guides-routes.html#content
  params: {}
*/

const DeveloperRoute = {
  queries: {
    developer: () => Relay.QL` query {
      developer(id: $id)
    } `,
  },

  paramDefinitions: {
    id: { required: true },
  },
  name: 'DeveloperRoute',
};

export default DeveloperRoute;
