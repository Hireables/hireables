/* global $ */

import React from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

// Child Components
import muiTheme from '../theme.es6';
import Connection from './connection.es6';

const toggleList = (event) => {
  event.preventDefault();
  $('.list-content.connections').toggleClass('open');
};

const Connections = (props) => {
  const { developer } = props;
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div
        className="list bordered"
        style={{
          maxWidth: 700,
          margin: 0,
          marginLeft: 100,
        }}
      >
        <div className="list-header">
          <h3 className="list-header-title">
            Pin your achievements
          </h3>
          Connect your accounts to import and pin your achievements.
          <IconButton
            touch
            onTouchTap={event => toggleList(event)}
            style={{
              verticalAlign: 'middle',
              position: 'absolute',
              right: 10,
              top: 0,
            }}
          >
            <FontIcon
              color="#333"
              className="material-icons"
            >
              menu
            </FontIcon>
          </IconButton>
        </div>

        <List
          style={{ paddingBottom: 0, paddingTop: 0 }}
          className="list-content connections"
        >
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
