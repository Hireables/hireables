/* global document */

import React, { Component } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import ReactDOM from 'react-dom';
import Loader from 'react-loader';
import Receipts from './receipts.es6';
import ErrorComponent from '../shared/errorComponent';
import conversationRoute from '../../routes/conversationRoute.es6';
import Folders from './folders.es6';
import Conversation from './conversation.es6';
import muiTheme from '../theme.es6';

class Mailbox extends Component {
  static renderReceipts(conversationId) {
    conversationRoute.params = {};
    conversationRoute.params.id = conversationId;
    ReactDOM.unmountComponentAtNode(document.getElementById('receipts'));
    ReactDOM.render(
      <Relay.Renderer
        Container={Receipts}
        queryConfig={conversationRoute}
        environment={Relay.Store}
        render={({ props, error, retry }) => {
          if (props) {
            return (
              <Receipts {...props} />
            );
          } else if (error) {
            return <ErrorComponent retry={retry} />;
          }
          return <Loader />;
        }}
      />,
      document.getElementById('receipts')
    );
  }

  constructor(props) {
    super(props);
    this.showReceipts = this.showReceipts.bind(this);
    this.state = {
      selected: false,
    };
  }

  showReceipts(event, conversationId) {
    event.preventDefault();
    this.setState({ selected: true }, () => {
      Mailbox.renderReceipts(conversationId);
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="mailbox">
          <div className="folders">
            <Folders />
          </div>
          <div className="conversations">
            <List>
              <Subheader>Today</Subheader>
              {this.props.mailbox.conversations.edges.map(({ node }) => (
                <Conversation
                  conversation={node}
                  key={node.id}
                  showReceipts={this.showReceipts}
                />
              ))}
              <Divider />
            </List>
          </div>


          {this.state.selected ?
            <div id="receipts" /> :
            <div className="receipts">
              <div className="no-result">
                <h1>No email has been selected</h1>
              </div>
            </div>
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

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
