import Relay from 'react-relay';

/*
  App Route to point to composer endpoint: {see api/types/query_type}
  url: https://facebook.github.io/relay/docs/guides-routes.html#content
  params: {}
*/

const ComposerRoute = {
  queries: {
    composer: () => Relay.QL` query {
      composer
    } `,
  },

  params: {},

  name: 'ComposerRoute',
};

export default ComposerRoute;
