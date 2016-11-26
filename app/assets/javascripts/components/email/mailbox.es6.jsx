/* global document $ */

import React, { Component } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';
import Loader from 'react-loader';
import Receipts from './receipts.es6';
import ErrorComponent from '../shared/errorComponent';
import conversationRoute from '../../routes/conversationRoute.es6';
import Folders from './folders.es6';
import Conversation from './conversation.es6';
import muiTheme from '../theme.es6';
import CurrentUser from '../../helpers/currentUser.es6';

const currentUser = new CurrentUser();

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

  showReceipts(conversationId) {
    this.setState({ selected: true }, () => {
      Mailbox.renderReceipts(conversationId);
    });
  }

  render() {
    const { mailbox } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="mailbox">
          <div className="folders">
            <Folders />
          </div>
          <div className="conversations">
            <List style={{ paddingTop: 0, paddingBottom: 0 }}>
              {mailbox.conversations && mailbox.conversations.edges.length > 0 ?
                mailbox.conversations.edges.map(({ node }) => (
                  <Conversation
                    conversation={node}
                    key={node.id}
                    showReceipts={this.showReceipts}
                  />
                )) :
                    <div className="no-result">
                      <Avatar src={currentUser.avatar} />
                      <h1>No conversations found</h1>
                    </div>
              }
            </List>
          </div>

          {this.state.selected ?
            <div id="receipts" /> :
            <div className="receipts">
              <div className="no-result">
                <Avatar src={currentUser.avatar} />
                <h1>No conversation has been selected</h1>
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
