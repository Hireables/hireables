import Relay from 'react-relay';

/*
  App Route to point to developer endpoint: {see api/types/query_type}
  url: https://facebook.github.io/relay/docs/guides-routes.html#content
  params: {}
*/

const RecruiterRoute = {
  queries: {
    developer: () => Relay.QL` query {
      recruiter(id: $id)
    } `,
  },

  paramDefinitions: {
    id: { required: true },
  },
  name: 'RecruiterRoute',
};

export default RecruiterRoute;
