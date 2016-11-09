// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'dialog-polyfill/dialog-polyfill.css';

// Util
import muiTheme from '../../theme.es6';
import Dialog from '../../../utils/dialog.es6';

// Stylesheet
import '../../styles/popup.sass';

class Youtube extends Component {
  render() {
    const { connection } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="talks">
          {connection.talks.edges.map(({ node }) => (node.title))}
        </div>
      </MuiThemeProvider>
    );
  }
}

Youtube.propTypes = {
  connection: React.PropTypes.object,
};

const YoutubeContainer = Relay.createContainer(
  Youtube, {
    initialVariables: {
      first: 10,
    },
    fragments: {
      connection: () => Relay.QL`
        fragment on Connection {
          id,
          provider,
          talks(first: $first) {
            edges {
              node {
                title,
                description,
                thumbnail,
                like_count,
                pinned,
              }
            }
          }
        }
      `,
    },
  }
);

export default YoutubeContainer;
