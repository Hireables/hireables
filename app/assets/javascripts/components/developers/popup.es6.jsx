import React, { Component } from 'react';
import Relay from 'react-relay';
import 'dialog-polyfill/dialog-polyfill.css';

// Util
import DeveloperShow from './show.es6';
import Dialog from '../../utils/dialog.es6';

// Question card component
class Popup extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.dialog = new Dialog({
      reactNodeId: 'questions-container',
      dialogId: this.popupNode,
    });
  }

  render() {
    return (
      <dialog className="card" ref={node => (this.popupNode = node)}>
        <button className="close" onClick={() => this.dialog.close()} />
        <DeveloperShow developer={this.props.developer} />
      </dialog>
    );
  }
}

Popup.propTypes = {
  developer: React.PropTypes.object,
};

// Relay data container to fetch data
// for this component from API server
const PopupContainer = Relay.createContainer(
  Popup, {
    fragments: {
      developer: () => Relay.QL`
        fragment on Question {
          ${DeveloperShow.getFragment('developer')}
        }
      `,
    },
  }
);

export default PopupContainer;
