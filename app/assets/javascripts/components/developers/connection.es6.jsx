/* global document */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

// Route
import developerRoute from '../../routes/developerRoute.es6';
import LoadingComponent from '../shared/loadingComponent';
import ErrorComponent from '../shared/errorComponent';

// Child Components
import Github from '../shared/icons/github.es6';
import StackOverflow from '../shared/icons/stackoverflow.es6';
import Linkedin from '../shared/icons/linkedin.es6';
import Youtube from '../shared/icons/youtube.es6';

// Child Components
import GithubPopup from './popups/github.es6';
import StackOverflowPopup from './popups/stackoverflow.es6';
import LinkedinPopup from './popups/linkedin.es6';
import YoutubePopup from './popups/youtube.es6';

// Map icon component to string names
const iconsMap = new Map();
iconsMap.set('github', Github);
iconsMap.set('stackoverflow', StackOverflow);
iconsMap.set('linkedin', Linkedin);
iconsMap.set('youtube', Youtube);

// Map Popups
const popupsMap = new Map();
popupsMap.set('github', GithubPopup);
popupsMap.set('stackoverflow', StackOverflowPopup);
popupsMap.set('linkedin', LinkedinPopup);
popupsMap.set('youtube', YoutubePopup);

class Connection extends Component {
  constructor(props) {
    super(props);
    this.connectOrImport = this.connectOrImport.bind(this);
  }

  connectOrImport() {
    const { connection, developer } = this.props;
    if (connection.connected) {
      developerRoute.params = {};
      developerRoute.params.id = developer.login;
      const ImportPopup = popupsMap.get(connection.provider);

      ReactDOM.render(
        <Relay.Renderer
          Container={ImportPopup}
          queryConfig={developerRoute}
          environment={Relay.Store}
          render={({ props, error, retry }) => {
            if (props) {
              return (
                <ImportPopup
                  {...props}
                />
              );
            } else if (error) {
              return <ErrorComponent retry={retry} />;
            }
            return <LoadingComponent />;
          }}
        />,
        document.getElementById('popups-container')
      );
    }
  }

  render() {
    const { connection } = this.props;
    const Icon = iconsMap.get(connection.provider);
    return (
      <div className="list-item">
        <ListItem
          disabled
          innerDivStyle={{ padding: '20px 56px 20px 72px' }}
          leftIcon={<div className={connection.provider}><Icon /></div>}
          rightIconButton={
            <RaisedButton
              style={{ top: 10, right: 20 }}
              primary
              onClick={this.connectOrImport}
              label={connection.connected ? 'Import' : 'Connect'}
            />
          }
          primaryText={connection.provider}
        />
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
        provider,
        connected,
      }
    `,
  },
});

export default ConnectionContainer;
