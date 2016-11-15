/* global $ */

import React, { Component } from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

// Child Components
import muiTheme from '../theme.es6';
import Connection from './connection.es6';

class Connections extends Component {
  constructor(props) {
    super(props);
    this.toggleConnections = this.toggleConnections.bind(this);
  }

  toggleConnections(event) {
    event.preventDefault();
    this.props.relay.setVariables({
      showConnections: true,
    }, (readyState) => {
      if (readyState.done) {
        $('.list-content.connections').toggleClass('open');
      }
    });
  }

  render() {
    const { developer } = this.props;
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
            Click hamburger icon to toggle list

            <IconButton
              touch
              onTouchTap={this.toggleConnections}
              style={{
                verticalAlign: 'middle',
                position: 'absolute',
                right: 10,
                top: 10,
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
            {developer.connections && developer.connections.length > 0 ?
              developer.connections.map(connection => (
                <Connection
                  key={connection.id}
                  connection={connection}
                  developer={developer}
                />
              )) : ''
            }
          </List>
        </div>
      </MuiThemeProvider>
    );
  }
}

Connections.propTypes = {
  developer: React.PropTypes.object,
  relay: React.PropTypes.object,
};

const ConnectionsContainer = Relay.createContainer(Connections, {
  initialVariables: {
    showConnections: false,
  },
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        id,
        connections @include(if: $showConnections) {
          id,
          ${Connection.getFragment('connection')},
        },
      }
    `,
  },
});

export default ConnectionsContainer;
