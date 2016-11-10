/* global document Routes $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Loader from 'react-loader';
import update from 'immutability-helper';

// Child Components
import Github from '../shared/icons/github.es6';
import StackOverflow from '../shared/icons/stackoverflow.es6';
import Linkedin from '../shared/icons/linkedin.es6';
import Youtube from '../shared/icons/youtube.es6';
import Data from './imports/data.es6';

// Provider authentication
import GoogleLogin from '../../connectors/google.es6';
import StackOverflowLogin from '../../connectors/stackexchange.es6';
import LinkedinLogin from '../../connectors/linkedin.es6';

// Mutations
import ConnectOAuth from '../../mutations/developer/connectOauth.es6';
import AchievementCreate from '../../mutations/achievement/create.es6';

// Map icon component to string names
const iconsMap = new Map();
iconsMap.set('github', Github);
iconsMap.set('stackoverflow', StackOverflow);
iconsMap.set('linkedin', Linkedin);
iconsMap.set('youtube', Youtube);

// Map connection js adapters
const adapterMap = new Map();
adapterMap.set('youtube', GoogleLogin);
adapterMap.set('linkedin', LinkedinLogin);
adapterMap.set('stackoverflow', StackOverflowLogin);

class Connection extends Component {
  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.connect = this.connect.bind(this);
    this.close = this.close.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.setNotification = this.setNotification.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.saveSelectedItems = this.saveSelectedItems.bind(this);
    this.state = {
      toggled: false,
      selections: [],
      open: false,
      loaded: true,
      notification: '',
    };

    const Adapter = adapterMap.get(props.connection.provider);
    if (Adapter) {
      this.connectionAdapter = new Adapter();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.connection.data &&
        nextProps.connection.data.edges.length > 0 &&
        nextProps !== this.props) {
      const selections = nextProps.connection.data.edges.filter(({ node }) => {
        if (node.pinned) {
          return node.database_id;
        }
      });
      this.setState({ selections });
    }
  }

  setNotification(notification) {
    this.setState({
      notification,
    }, () => {
      this.setState({ open: true });
    });
  }

  toggleItem(event, dataId) {
    const { connection } = this.props;
    const importContainer = $(`#import-container-${connection.provider}`);
    const uncheckedBoxes = importContainer.find('input:checkbox:not(:checked)');
    const index = this.state.selections.indexOf(dataId);
    $(event.target).closest('.list-item').toggleClass('pinned');

    if (index === -1) {
      this.setState({
        selections: update(this.state.selections, { $push: [dataId] }),
      }, () => {
        if (this.state.selections.length >= 6) {
          uncheckedBoxes.attr({ disabled: true });
          uncheckedBoxes.closest('.list-item').addClass('disabled');
        }
      });
    } else {
      this.setState({
        selections: update(this.state.selections, { $splice: [[index, 1]] }),
      }, () => {
        uncheckedBoxes.attr({ disabled: false });
        uncheckedBoxes.closest('.list-item').removeClass('disabled');
      });
    }
  }

  saveSelectedItems(event) {
    event.preventDefault();
    console.log(this.state.selections);
    this.setNotification('Saving...');
    const onFailure = (transaction) => {
      const error = transaction.getError() || new Error('Mutation failed.');
      let errorMessage;

      if (error.list.errors && Array.isArray(error.list.errors)) {
        errorMessage = error.list.errors[0].message;
      } else {
        errorMessage = error.message;
      }

      this.setNotification(errorMessage);
    };

    const onSuccess = (response) => {
      console.log(response);
    };

    this.state.selections.forEach((selection) => {
      Relay.Store.commitUpdate(new AchievementCreate({
        id: this.props.connection.id,
        developerId: this.props.developer.id,
        selection: selection.toString(),
      }), { onFailure, onSuccess });
    });
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  open(event) {
    event.preventDefault();
    const { relay } = this.props;
    this.setState({ loaded: false });
    relay.setVariables({
      showData: true,
    }, (readyState) => {
      if (readyState.done) {
        this.setState({ loaded: true, toggled: true });
      }
    });
  }

  close(event) {
    event.preventDefault();
    const { relay } = this.props;
    relay.setVariables({
      showData: false,
    }, (readyState) => {
      if (readyState.done) {
        this.setState({ toggled: false });
      }
    });
  }

  connect() {
    this.connectionAdapter.authenticate().then((data) => {
      const onFailure = (transaction) => {
        const error = transaction.getError() || new Error('Mutation failed.');
        let errorMessage;

        if (error.source.errors && Array.isArray(error.source.errors)) {
          errorMessage = error.source.errors[0].message;
        } else {
          errorMessage = error.message;
        }

        this.setNotification(errorMessage);
      };

      Relay.Store.commitUpdate(new ConnectOAuth({
        id: this.props.developer.id,
        provider: this.props.connection.provider,
        access_token: data.access_token,
        expires_at: data.expires_at,
        uid: data.uid.toString(),
      }), { onFailure });
    }, (error) => {
      this.setNotification(error);
    });
  }

  render() {
    const { connection } = this.props;
    const Icon = iconsMap.get(connection.provider);
    let onClickAction;
    let text;

    if (this.state.toggled) {
      onClickAction = this.close;
      text = 'Close';
    } else if (connection.connected && !connection.expired) {
      onClickAction = this.open;
      text = 'Import';
    } else {
      onClickAction = this.connect;
      text = 'Connect';
    }

    return (
      <div className="list-item connection">
        <ListItem
          disabled
          innerDivStyle={{ padding: '20px 56px 20px 72px' }}
          leftIcon={<div className={connection.provider}><Icon /></div>}
          rightIconButton={
            <RaisedButton
              style={{ top: 10, right: 20 }}
              primary
              onClick={onClickAction}
              label={text}
            />
          }
          primaryText={
            <div style={{ textTransform: 'capitalize' }}>
              {connection.provider}
            </div>
          }
        />

        <Loader loaded={this.state.loaded} />

        {connection.data && connection.data.edges.length > 0 ?
          <div
            className="import-container"
            id={`import-container-${connection.provider}`}
          >
            <div className="content">
              <List style={{ paddingBottom: 0, paddingTop: 0 }}>
                {connection.data.edges.map(({ node }) => (
                  <Data
                    connectionData={node}
                    key={node.id}
                    toggleItem={this.toggleItem}
                  />
                ))}
              </List>
            </div>
            <div className="actions">
              <span className="notification">
                {6 - this.state.selections.length} remaining
              </span>
              <RaisedButton
                label="Add to achievements"
                primary
                className="pull-right"
                type="submit"
                onClick={this.saveSelectedItems}
              />
            </div>

            <div className="notifications">
              <Snackbar
                open={this.state.open}
                message={this.state.notification}
                autoHideDuration={5000}
                onRequestClose={this.handleRequestClose}
              />
            </div>
          </div> : ''
        }
      </div>
    );
  }
}

Connection.propTypes = {
  connection: React.PropTypes.object,
  developer: React.PropTypes.object,
  relay: React.PropTypes.object,
};

const ConnectionContainer = Relay.createContainer(Connection, {
  initialVariables: {
    first: 10,
    showData: false,
  },
  fragments: {
    connection: () => Relay.QL`
      fragment on Connection {
        id,
        provider,
        connected,
        expired,
        data(first: $first) @include(if: $showData) {
          edges {
            node {
              id,
              database_id,
              pinned,
              ${Data.getFragment('connectionData')}
            }
          }
        }
      }
    `,
  },
});

export default ConnectionContainer;
