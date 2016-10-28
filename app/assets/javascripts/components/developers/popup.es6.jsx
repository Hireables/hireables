// Modules

import React, { Component } from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import 'dialog-polyfill/dialog-polyfill.css';
import muiTheme from '../theme.es6';

// Util
import DeveloperShow from './show.es6';
import Dialog from '../../utils/dialog.es6';

// Stylesheet
import '../styles/popup.sass';

class Popup extends Component {
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
          <IconButton
            className="close"
            onClick={() => this.dialog.close()}
          >
            <NavigationClose />
          </IconButton>
          <DeveloperShow developer={developer} />
        </dialog>
      </MuiThemeProvider>
    );
  }
}

Popup.propTypes = {
  developer: React.PropTypes.object,
};

const PopupContainer = Relay.createContainer(
  Popup, {
    fragments: {
      developer: () => Relay.QL`
        fragment on Developer {
          id,
          ${DeveloperShow.getFragment('developer')}
        }
      `,
    },
  }
);

export default PopupContainer;
