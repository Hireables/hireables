import React from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../theme.es6';
import Receipt from './receipt.es6';

const Receipts = (props) => {
  const { conversation } = props;
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className="receipts">
        <div className="header">
          <h1>
            {conversation.subject}
          </h1>
        </div>
        {conversation.receipts && conversation.receipts.edges.length > 0 ?
          conversation.receipts.edges.map(({ node }) => (
            <Receipt receipt={node} key={node.id} />
          )) :
            <div className="no-result">
              <h1>No emails</h1>
            </div>
        }
      </div>
    </MuiThemeProvider>
  );
};

Receipts.propTypes = {
  conversation: React.PropTypes.object,
};

const ReceiptsContainer = Relay.createContainer(Receipts, {
  initialVariables: {
    first: 20,
  },

  fragments: {
    conversation: () => Relay.QL`
      fragment on Conversation {
        id,
        subject,
        is_unread,
        last_message {
          id,
          sender {
            avatar_url,
            name,
          },
          body,
        },
        receipts(first: $first) {
          edges {
            node {
              id,
              ${Receipt.getFragment('receipt')},
            }
          }
        }
      }
    `,
  },
});

export default ReceiptsContainer;
