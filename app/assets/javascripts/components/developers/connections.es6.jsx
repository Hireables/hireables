import React from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List } from 'material-ui/List';

// Child Components
import muiTheme from '../theme.es6';
import Connection from './connection.es6';

const Connections = (props) => {
  const { developer } = props;
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className="source-list">
        <div className="source-list-top">
          <h3 className="source-list-title">Pin Achievements </h3>
          Connect to import and pin your achievements.
        </div>
        <List style={{ paddingBottom: 0, paddingTop: 0 }}>
          {developer.connections.map(connection => (
            <Connection
              key={connection.id}
              connection={connection}
              developer={developer}
            />
          ))}
        </List>
      </div>
    </MuiThemeProvider>
  );
};

Connections.propTypes = {
  developer: React.PropTypes.object,
};

const ConnectionsContainer = Relay.createContainer(Connections, {
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        id,
        login,
        connections {
          id,
          ${Connection.getFragment('connection')},
        },
      }
    `,
  },
});

export default ConnectionsContainer;
