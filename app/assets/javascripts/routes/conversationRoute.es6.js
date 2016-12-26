import Relay from 'react-relay';

/*
  App Route to point to root endpoint: {see api/types/query_type}
  url: https://facebook.github.io/relay/docs/guides-routes.html#content
  params: {}
*/

const ConversationRoute = {
  queries: {
    conversation: () => Relay.QL` query {
      conversation(id: $id)
    } `,
  },

  params: {},

  name: 'ConversationRoute',
};

export default ConversationRoute;
