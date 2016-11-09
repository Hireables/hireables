/* global document Routes SE $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import LoadingComponent from '../../components/shared/loadingComponent';
import ErrorComponent from '../../components/shared/errorComponent';

// Route
import connectionRoute from '../../routes/connectionRoute.es6';

// Child Components
import Github from '../shared/icons/github.es6';
import StackOverflow from '../shared/icons/stackoverflow.es6';
import Linkedin from '../shared/icons/linkedin.es6';
import Youtube from '../shared/icons/youtube.es6';

// Child Components
import GithubImport from './imports/github.es6';
import StackOverflowImport from './imports/stackoverflow.es6';
import LinkedinImport from './imports/linkedin.es6';
import YoutubeImport from './imports/youtube.es6';

// Provider connection
import GoogleLogin from '../../connectors/google.es6';
import StackOverflowLogin from '../../connectors/stackexchange.es6';
import LinkedinLogin from '../../connectors/linkedin.es6';

// Mutations
import ConnectOAuth from '../../mutations/developer/connectOauth.es6';

// Map icon component to string names
const iconsMap = new Map();
iconsMap.set('github', Github);
iconsMap.set('stackoverflow', StackOverflow);
iconsMap.set('linkedin', Linkedin);
iconsMap.set('youtube', Youtube);

// Map Imports
const importsMap = new Map();
importsMap.set('github', GithubImport);
importsMap.set('stackoverflow', StackOverflowImport);
importsMap.set('linkedin', LinkedinImport);
importsMap.set('youtube', YoutubeImport);

// Map connection js adapters
const adapterMap = new Map();
adapterMap.set('youtube', GoogleLogin);
adapterMap.set('linkedin', LinkedinLogin);
adapterMap.set('stackoverflow', StackOverflowLogin);

class Connection extends Component {
  constructor(props) {
    super(props);
    this.import = this.import.bind(this);
    this.connect = this.connect.bind(this);
    this.close = this.close.bind(this);
    this.state = { toggled: false };

    const Adapter = adapterMap.get(props.connection.provider);
    if (Adapter) {
      this.connectionAdapter = new Adapter();
    }
  }

  import() {
    this.connect();
    const { connection } = this.props;
    if (connection.connected) {
      connectionRoute.params = {};
      connectionRoute.params.id = connection.id;
      const ImportComponent = importsMap.get(connection.provider);
      this.setState({ toggled: true });
      ReactDOM.render(
        <Relay.Renderer
          Container={ImportComponent}
          queryConfig={connectionRoute}
          environment={Relay.Store}
          render={({ props, error, retry }) => {
            if (props) {
              return (
                <ImportComponent {...props} />
              );
            } else if (error) {
              return <ErrorComponent retry={retry} />;
            }
            return <LoadingComponent cssClass="relative" />;
          }}
        />,
        document.getElementById(`import-container-${connection.provider}`)
      );
    }
  }

  close() {
    const { connection } = this.props;
    ReactDOM.unmountComponentAtNode(
      document.getElementById(`import-container-${connection.provider}`)
    );
    this.setState({ toggled: false });
  }

  connect() {
    this.connectionAdapter.authenticate().then((data) => {
      const onFailure = () => false;
      const onSuccess = () => true;

      Relay.Store.commitUpdate(new ConnectOAuth({
        id: this.props.developer.id,
        provider: this.props.connection.provider,
        access_token: data.access_token,
        uid: data.uid.toString(),
      }), { onFailure, onSuccess });
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
    } else if (connection.connected) {
      onClickAction = this.import;
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
            connection.provider == 'linkedin' ?
              <RaisedButton
                style={{ top: 10, right: 20 }}
                primary
                href={Routes.developer_linkedin_omniauth_authorize_path()}
                label={text}
              /> :
              <RaisedButton
                style={{ top: 10, right: 20 }}
                primary
                onClick={onClickAction}
                label={text}
              />

          }
          primaryText={connection.provider}
        />
        <div id={`import-container-${connection.provider}`} />
      </div>
    );
  }
}

Connection.propTypes = {
  connection: React.PropTypes.object,
  developer: React.PropTypes.object,
};

const ConnectionContainer = Relay.createContainer(Connection, {
  fragments: {
    connection: () => Relay.QL`
      fragment on Connection {
        id,
        provider,
        connected,
      }
    `,
  },
});

export default ConnectionContainer;
