/* global document $ window Turbolinks Routes */

import React, { Component } from 'react';
import Relay from 'react-relay';
import queryString from 'query-string';
import { List } from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';
import Loader from 'react-loader';
import Receipts from './receipts.es6';
import ErrorComponent from '../shared/errorComponent';
import nameBadge from '../../utils/nameBadge.es6';
import conversationRoute from '../../routes/conversationRoute.es6';
import Folders from './folders.es6';
import Conversation from './conversation.es6';
import muiTheme from '../theme.es6';
import LoadingComponent from '../shared/loadingComponent';
import CurrentUser from '../../helpers/currentUser.es6';
import Composer from './composer.es6';
import ComposerRoute from '../../routes/composerRoute.es6';

const currentUser = new CurrentUser();

class Mailbox extends Component {
  static unmountReceipts() {
    ReactDOM.unmountComponentAtNode(document.getElementById('receipts'));
  }

  constructor(props) {
    super(props);
    this.showReceipts = this.showReceipts.bind(this);
    this.showComposer = this.showComposer.bind(this);
    this.handleScrollLoad = this.handleScrollLoad.bind(this);
    this.renderComposer = this.renderComposer.bind(this);
    this.renderReceipts = this.renderReceipts.bind(this);
    this.removeComposer = this.removeComposer.bind(this);
    this.setNotification = this.setNotification.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.loadMore = this.loadMore.bind(this);

    this.state = {
      selected: false,
      loading: false,
      notification: '',
      open: false,
    };
  }

  componentDidMount() {
    this.setNotification(`${this.props.mailbox.type} loaded`);
    this.conversationsNode.addEventListener('scroll', this.handleScrollLoad);
    this.props.relay.forceFetch();
  }

  componentWillUnmount() {
    this.conversationsNode.removeEventListener('scroll', this.handleScrollLoad);
  }

  setNotification(notification) {
    this.setState({
      notification,
    }, () => {
      this.setState({ open: true });
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  showReceipts(conversationId) {
    this.setState({ selected: true }, () => {
      this.renderReceipts(conversationId);
    });
  }

  showComposer() {
    this.setState({ selected: true }, () => {
      this.renderComposer();
    });
  }

  removeComposer() {
    ReactDOM.unmountComponentAtNode(document.getElementById('receipts'));
    this.setState({ selected: false });
  }

  handleScrollLoad() {
    if ($(this.conversationsNode).scrollTop() >
        $(this.conversationsNode).height() -
        $(this.conversationsNode).height() - 200 &&
        !this.state.loading
      ) {
      const { mailbox } = this.props;
      if (mailbox.conversations.pageInfo.hasNextPage) {
        this.setState({
          loading: true,
        }, () => {
          this.loadMore();
        });
      }
    }
  }

  loadMore() {
    const { relay } = this.props;
    relay.setVariables({
      first: relay.variables.first + 10,
    }, (readyState) => {
      if (readyState.done) {
        this.setState({
          loading: false,
        });
      }
    });
  }

  renderReceipts(conversationId) {
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
              <Receipts
                {...props}
                mailbox={this.props.mailbox}
                setNotification={this.setNotification}
                unmountReceipts={Mailbox.unmountReceipts}
              />
            );
          } else if (error) {
            return <ErrorComponent error={error} retry={retry} />;
          }
          return <Loader />;
        }}
      />,
      document.getElementById('receipts')
    );
  }

  renderComposer() {
    ReactDOM.unmountComponentAtNode(document.getElementById('receipts'));
    ReactDOM.render(
      <Relay.Renderer
        Container={Composer}
        queryConfig={ComposerRoute}
        environment={Relay.Store}
        render={({ props, error, retry }) => {
          if (props) {
            return (
              <Composer
                mailbox={this.props.mailbox}
                removeComposer={this.removeComposer}
                setNotification={this.setNotification}
                {...props}
              />
            );
          } else if (error) {
            return <ErrorComponent error={error} retry={retry} />;
          }
          return <Loader />;
        }}
      />,
      document.getElementById('receipts')
    );
  }

  render() {
    const { mailbox } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="mailbox">
          <div className="folders">
            {mailbox.user_type === 'employer' ?
              <div className="composer-button">
                <RaisedButton
                  primary
                  onClick={this.showComposer}
                  label="Compose"
                  style={{
                    display: 'block',
                  }}
                />
              </div> : ''
            }
            <Folders />
          </div>
          <div
            className="conversations"
            ref={node => (this.conversationsNode = node)}
          >
            <div className="header">
              <h1>
                {mailbox.type}
                {mailbox.conversations_count > 0 ?
                  <span className="count">
                    &nbsp;({mailbox.conversations_count})
                  </span> : ''
                }
              </h1>
            </div>
            <List
              className="conversations-list"
              style={{ paddingTop: 0, paddingBottom: 0 }}
            >
              {mailbox.conversations && mailbox.conversations.edges.length > 0 ?
                mailbox.conversations.edges.map(({ node }) => (
                  <Conversation
                    conversation={node}
                    key={node.id}
                    showReceipts={this.showReceipts}
                  />
                )) :
                <div className="no-result">
                  {currentUser.avatar ?
                    <Avatar src={currentUser.avatar} /> :
                    <Avatar>
                      {nameBadge(currentUser.name)}
                    </Avatar>
                  }
                  <h1>No conversations found</h1>
                </div>
              }
              {this.state.loading ? <LoadingComponent cssClass="relative" /> : ''}
            </List>
          </div>

          {this.state.selected ?
            <div id="receipts" /> :
            <div className="receipts">
              <div className="no-result">
                {currentUser.avatar ?
                  <Avatar src={currentUser.avatar} /> :
                  <Avatar>
                    {nameBadge(currentUser.name)}
                  </Avatar>
                }
                <h1>No conversation has been selected</h1>
              </div>
            </div>
          }

          <div className="notifications">
            <Snackbar
              open={this.state.open}
              ref={node => (this.notification = node)}
              message={this.state.notification}
              autoHideDuration={5000}
              onRequestClose={this.handleRequestClose}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Mailbox.propTypes = {
  mailbox: React.PropTypes.object,
  relay: React.PropTypes.object,
};

const MailboxContainer = Relay.createContainer(Mailbox, {
  initialVariables: {
    type: 'inbox',
    first: 10,
  },

  fragments: {
    mailbox: () => Relay.QL`
      fragment on Mailbox {
        id,
        type,
        user_type,
        conversations_count,
        conversations(first: $first) {
          edges {
            node {
              id,
              ${Conversation.getFragment('conversation')}
            },
          },
          pageInfo {
            hasNextPage,
          },
        },
      }
    `,
  },
});

export default MailboxContainer;
