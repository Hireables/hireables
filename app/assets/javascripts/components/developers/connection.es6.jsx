/* global document Routes $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Loader from 'react-loader';

// Child Components icons
import Github from '../shared/icons/github.es6';
import StackOverflow from '../shared/icons/stackoverflow.es6';
import Youtube from '../shared/icons/youtube.es6';
import Item from './imports/item.es6';

// Provider authentication
import GoogleLogin from '../../connectors/google.es6';
import StackOverflowLogin from '../../connectors/stackexchange.es6';

// Mutations
import ConnectOAuth from '../../mutations/developer/connectOauth.es6';
import ToggleAchievement from '../../mutations/import/toggle.es6';

// Map icon component to string names
const iconsMap = new Map();
iconsMap.set('github', Github);
iconsMap.set('stackoverflow', StackOverflow);
iconsMap.set('youtube', Youtube);

// Map connection js adapters
const adapterMap = new Map();
adapterMap.set('youtube', GoogleLogin);
adapterMap.set('stackoverflow', StackOverflowLogin);

class Connection extends Component {
  constructor(props) {
    super(props);
    this.toggleList = this.toggleList.bind(this);
    this.connect = this.connect.bind(this);
    this.toggleItemOnServer = this.toggleItemOnServer.bind(this);
    this.setNotification = this.setNotification.bind(this);
    this.showErrorNotification = this.showErrorNotification.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.toggleDisableOnList = this.toggleDisableOnList.bind(this);
    this.getContainerNode = this.getContainerNode.bind(this);
    this.updateList = this.updateList.bind(this);
    this.timer = null;
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.connection.imports &&
        nextProps.connection.imports.edges.length > 0 &&
        nextProps !== this.props
      ) {
      const selections = nextProps.connection.imports.edges.filter(({ node }) => (
        node.pinned
      )).map(({ node }) => (node.source_id));
      this.setState({ selections });
    }
  }

  componentDidUpdate() {
    if (this.props.connection.importing && this.timer === null) {
      this.timer = setTimeout(() => (
        this.props.relay.forceFetch({ showData: true }, (readyState) => {
          if (readyState.done) {
            this.timer = null;
          }
        }
      )), 2000);
      return;
    }
    this.updateList();
  }

  setNotification(notification) {
    this.setState({
      notification,
    }, () => {
      this.setState({ open: true });
    });
  }

  getContainerNode() {
    return $(`#import-container-${this.props.connection.provider}`);
  }

  getUncheckedBoxes() {
    return $(this.getContainerNode()).find('input:checkbox:not(:checked)');
  }

  toggleDisableOnList() {
    $(this.getContainerNode()).find('.list-item').toggleClass('disabled');
  }

  showErrorNotification(transaction) {
    const error = transaction.getError() || new Error('Mutation failed.');
    let errorMessage;

    if (error.list.errors && Array.isArray(error.list.errors)) {
      errorMessage = error.list.errors[0].message;
    } else {
      errorMessage = error.message;
    }
    this.setNotification(errorMessage);
  }

  updateList() {
    if (this.state.selections.length >= 6) {
      $(this.getUncheckedBoxes()).attr({ disabled: true });
      $(this.getUncheckedBoxes()).closest('.list-item').addClass('disabled');
    } else {
      $(this.getUncheckedBoxes()).attr({ disabled: false });
      $(this.getUncheckedBoxes()).closest('.list-item').removeClass('disabled');
    }
  }

  toggleItemOnServer(event, item) {
    event.preventDefault();
    this.toggleDisableOnList();

    const onFailure = (transaction) => {
      this.showErrorNotification(transaction);
      this.toggleDisableOnList();
    };

    const onSuccess = () => (this.toggleDisableOnList());
    Relay.Store.commitUpdate(new ToggleAchievement({
      id: item.id,
      developerId: this.props.developer.id,
      connectionId: this.props.connection.id,
    }), { onFailure, onSuccess });
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  toggleList(event) {
    if (event) { event.preventDefault(); }
    const { relay } = this.props;
    relay.setVariables({
      showData: !this.props.relay.variables.showData,
    }, (readyState) => {
      if (readyState.done) {
        this.setState({ toggled: !this.state.toggled });
      }
    });
  }

  connect() {
    const onSuccess = () => (this.toggleList());
    const onFailure = transaction => (this.showErrorNotification(transaction));
    this.connectionAdapter.authenticate().then((data) => {
      Relay.Store.commitUpdate(new ConnectOAuth({
        id: this.props.connection.id,
        provider: this.props.connection.provider,
        access_token: data.access_token,
        expires_at: data.expires_at,
        uid: data.uid.toString(),
      }), { onFailure, onSuccess });
    }, (error) => {
      this.setNotification(error.toString());
    });
  }

  render() {
    const { connection } = this.props;
    const Icon = iconsMap.get(connection.provider);
    let onClickAction;
    let text;

    if (this.state.toggled) {
      text = 'Close';
      onClickAction = this.toggleList;
    } else if (connection.connected && !connection.expired) {
      onClickAction = this.toggleList;
      text = 'Open';
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
              className={text}
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
        <div
          className="import-container"
          id={`import-container-${connection.provider}`}
        >
          <div className={`content ${this.state.toggled ? 'open' : ''}`}>
            {connection.imports && connection.imports.edges.length > 0 ?
              <List style={{ paddingBottom: 0, paddingTop: 0 }}>
                {connection.imports.edges.map(({ node }) => (
                  <Item
                    item={node}
                    key={node.id}
                    toggleItemOnServer={this.toggleItemOnServer}
                  />
                ))}
                <div className="actions">
                  <span className="notification">
                    {6 - this.state.selections.length} remaining
                  </span>
                </div>
              </List> : <Loader />
            }
          </div>
          <div className="notifications">
            <Snackbar
              open={this.state.open}
              message={this.state.notification}
              autoHideDuration={5000}
              onRequestClose={this.handleRequestClose}
            />
          </div>
        </div>
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
    first: 20,
    showData: false,
  },
  fragments: {
    connection: () => Relay.QL`
      fragment on Connection {
        id,
        provider,
        connected,
        expired,
        importing,
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
