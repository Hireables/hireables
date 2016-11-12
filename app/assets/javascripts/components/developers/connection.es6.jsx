/* global document Routes $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Loader from 'react-loader';
import update from 'immutability-helper';

// Child Components icons
import Github from '../shared/icons/github.es6';
import StackOverflow from '../shared/icons/stackoverflow.es6';
import Linkedin from '../shared/icons/linkedin.es6';
import Youtube from '../shared/icons/youtube.es6';
import Item from './imports/item.es6';

// Provider authentication
import GoogleLogin from '../../connectors/google.es6';
import StackOverflowLogin from '../../connectors/stackexchange.es6';
import LinkedinLogin from '../../connectors/linkedin.es6';

// Mutations
import ConnectOAuth from '../../mutations/developer/connectOauth.es6';
import ToggleAchievement from '../../mutations/import/toggle.es6';

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
    this.updateList = this.updateList.bind(this);
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

  componentWillUpdate(nextProps) {
    if (nextProps.connection.imports &&
        nextProps.connection.imports.edges.length > 0 &&
        nextProps !== this.props) {
      const selections = nextProps.connection.imports.edges.filter(({ node }) => {
        return node.pinned;
      }).map(({ node }) => (node.source_id));

      this.setState({ selections }, () => {
        this.updateList();
      });
    }
  }

  setNotification(notification) {
    this.setState({
      notification,
    }, () => {
      this.setState({ open: true });
    });
  }

  updateList() {
    const importContainer = $(`#import-container-${this.props.connection.provider}`);
    const uncheckedBoxes = importContainer.find('input:checkbox:not(:checked)');
    if (this.state.selections.length >= 6) {
      uncheckedBoxes.attr({ disabled: true });
      uncheckedBoxes.closest('.list-item').addClass('disabled');
    } else {
      uncheckedBoxes.attr({ disabled: false });
      uncheckedBoxes.closest('.list-item').removeClass('disabled');
    }
  }

  toggleItem(event, item) {
    event.preventDefault();
    const importContainer = $(`#import-container-${this.props.connection.provider}`);
    const uncheckedBoxes = importContainer.find('input:checkbox:not(:checked)');
    const index = this.state.selections.indexOf(item.source_id);
    $(event.target).closest('.list-item').toggleClass('pinned');

    if (index === -1) {
      this.setState({
        selections: update(this.state.selections, { $push: [item.source_id] }),
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

    const onFailure = (transaction) => {
      const error = transaction.getError() || new Error('Mutation failed.');
      let errorMessage;

      if (error.list.errors && Array.isArray(error.list.errors)) {
        errorMessage = error.list.errors[0].message;
      } else {
        errorMessage = error.message;
      }

      this.setNotification(errorMessage);
      $(event.target).closest('.list-item').toggleClass('pinned');
    };

    const onSuccess = (response) => {
      console.log(response);
    };

    Relay.Store.commitUpdate(new ToggleAchievement({
      id: item.id,
      developerId: this.props.developer.id,
      connectionId: this.props.connection.id,
    }), { onFailure, onSuccess });
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

        {connection.imports && connection.imports.edges.length > 0 ?
          <div
            className="import-container"
            id={`import-container-${connection.provider}`}
          >
            <div className="content">
              <List style={{ paddingBottom: 0, paddingTop: 0 }}>
                {connection.imports.edges.map(({ node }) => (
                  <Item
                    item={node}
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
        imports(first: $first) @include(if: $showData) {
          edges {
            node {
              id,
              source_id,
              pinned,
              ${Item.getFragment('item')}
            }
          }
        }
      }
    `,
  },
});

export default ConnectionContainer;
