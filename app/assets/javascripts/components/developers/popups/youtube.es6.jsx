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
    const { developer } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <dialog
          id={`developer-profile-${developer.id}`}
          className="popup"
          ref={node => (this.popupNode = node)}
        >
          <div className="repos">
            {developer.repos.map(repo => (repo.name))}
          </div>
        </dialog>
      </MuiThemeProvider>
    );
  }
}

Youtube.propTypes = {
  developer: React.PropTypes.object,
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
          talks(first: $first) {
            edges {
              node {
                title,
                description,
                published_at,
                thumbnail,
                view_count,
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
