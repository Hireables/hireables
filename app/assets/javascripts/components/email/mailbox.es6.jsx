import React from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Folders from './folders.es6';
import Conversation from './conversation.es6';
import muiTheme from '../theme.es6';

const Mailbox = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className="mailbox">
      <div className="folders">
        <Folders />
      </div>
      <div className="inner-content">
        <div className="split-view">
          <div className="conversations">
            <List>
              <Subheader>Today</Subheader>
              {props.mailbox.conversations.edges.map(({ node }) => (
                <Conversation conversation={node} key={node.id} />
              ))}
              <Divider />
            </List>
          </div>
        </div>
      </div>
    </div>
  </MuiThemeProvider>
);

Mailbox.propTypes = {
  mailbox: React.PropTypes.object,
};

const MailboxContainer = Relay.createContainer(Mailbox, {
  initialVariables: {
    type: 'inbox',
    first: 20,
  },
  fragments: {
    mailbox: () => Relay.QL`
      fragment on Mailbox {
        id,
        type,
        conversations(first: $first) {
          edges {
            node {
              id,
              ${Conversation.getFragment('conversation')}
            },
          },
        },
      }
    `,
  },
});

export default MailboxContainer;
