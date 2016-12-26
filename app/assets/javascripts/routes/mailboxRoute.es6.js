import Relay from 'react-relay';

/*
  App Route to point to root endpoint: {see api/types/query_type}
  url: https://facebook.github.io/relay/docs/guides-routes.html#content
  params: {}
*/

const MailboxRoute = {
  queries: {
    mailbox: () => Relay.QL` query {
      mailbox(id: $id)
    } `,
  },

  params: {},

  name: 'MailboxRoute',
};

export default MailboxRoute;
