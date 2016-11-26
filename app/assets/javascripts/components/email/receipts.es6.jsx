import React from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import Reply from 'material-ui/svg-icons/content/reply';
import Trash from 'material-ui/svg-icons/action/delete';
import Subject from 'material-ui/svg-icons/action/subject';
import muiTheme from '../theme.es6';
import Receipt from './receipt.es6';
import CurrentUser from '../../helpers/currentUser.es6';

const currentUser = new CurrentUser();

const Receipts = (props) => {
  const { conversation } = props;
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className="receipts">
        <div className="header">
          <h1>
            <Subject className="icon" />
            {conversation.subject}
          </h1>
          <div className="actions">
            <IconButton
              tooltip="Reply"
            >
              <Reply />
            </IconButton>

            <IconButton
              tooltip="Move to trash"
            >
              <Trash />
            </IconButton>
          </div>
        </div>
        {conversation.receipts && conversation.receipts.edges.length > 0 ?
          conversation.receipts.edges.map(({ node }) => (
            <Receipt receipt={node} key={node.id} />
          )) :
            <div className="no-result">
              <Avatar src={currentUser.avatar} />
              <h1>No emails found</h1>
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
        count_messages,
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
