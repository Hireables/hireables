import Relay from 'react-relay';

/*
  App Route to point to developer endpoint: {see api/types/query_type}
  url: https://facebook.github.io/relay/docs/guides-routes.html#content
  params: {}
*/

const EmployerRoute = {
  queries: {
    employer: () => Relay.QL` query {
      employer(id: $id)
    } `,
  },

  paramDefinitions: {
    id: { required: true },
  },
  name: 'EmployerRoute',
};

export default EmployerRoute;
