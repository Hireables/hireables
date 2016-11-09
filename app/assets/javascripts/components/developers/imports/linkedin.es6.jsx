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

class Linkedin extends Component {
  componentDidMount() {
    this.dialog = new Dialog({
      reactNodeId: 'popups-container',
      dialogId: this.popupNode.id,
    });

    this.dialog.toggle();
    this.dialog.get().classList.add('pulse');
    setTimeout(() => {
      this.dialog.get().classList.remove('pulse');
    }, 300);
  }

  render() {
    const { connection } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="positions">
          {connection.repos.map(({ node }) => (node.title))}
        </div>
      </MuiThemeProvider>
    );
  }
}

Linkedin.propTypes = {
  connection: React.PropTypes.object,
};

const LinkedinContainer = Relay.createContainer(
  Linkedin, {
    initialVariables: {
      first: 10,
    },
    fragments: {
      connection: () => Relay.QL`
        fragment on Connection {
          id,
          provider,
          positions(first: $first) {
            edges {
              node {
                title,
                summary,
                company,
                pinned,
              }
            }
          }
        }
      `,
    },
  }
);

export default LinkedinContainer;
