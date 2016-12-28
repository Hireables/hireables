/* global Routes */

import React, { Component } from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import 'dialog-polyfill/dialog-polyfill.css';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyText } from 'formsy-material-ui/lib';
import Snackbar from 'material-ui/Snackbar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Mail from 'material-ui/svg-icons/content/mail';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../theme.es6';
import RichEditor from '../shared/richEditor.es6';
import CreateConversation from '../../mutations/mailbox/createConversation.es6';
import Dialog from '../../utils/dialog.es6';

class PopupComposer extends Component {
  static onKeyPress(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  constructor(props) {
    super(props);
    this.createConversation = this.createConversation.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.setNotification = this.setNotification.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);

    this.state = {
      canSubmit: false,
      open: false,
      notification: '',
    };
  }

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

  setNotification(notification) {
    this.setState({
      notification,
    }, () => {
      this.setState({ open: true });
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    }, () => {
      this.dialog.close();
    });
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  createConversation() {
    const onFailure = (transaction) => {
      const error = transaction.getError() || new Error('Mutation failed.');
      let errorMessage;
      if (error.source.errors && Array.isArray(error.source.errors)) {
        errorMessage = error.source.errors[0].message;
      } else {
        errorMessage = error.message;
      }
      this.setNotification(errorMessage);
    };

    const onSuccess = (response) => {
      if (response.CreateConversation) {
        this.setNotification('Message Sent');
      }
    };

    Relay.Store.commitUpdate(new CreateConversation({
      id: this.props.composer.mailbox.id,
      recipients: [this.props.composer.recipient.database_id],
      body: this.editorNode.state.value.toString('html'),
      ...this.formNode.getModel(),
    }), { onFailure, onSuccess });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <dialog
          id="email-composer"
          className="popup"
          ref={node => (this.popupNode = node)}
        >
          <Avatar
            size={50}
            className="close"
            onClick={() => this.dialog.close()}
            icon={<FontIcon className="material-icons">close</FontIcon>}
          />

          <div className="email-composer">
            <div className="header">
              <h1>
                <Mail className="icon" />
                Send a message to {this.props.composer.recipient.name}
              </h1>
            </div>

            <Formsy.Form
              onValid={this.enableButton}
              autoComplete="off"
              className="email-composer-form"
              ref={node => (this.formNode = node)}
              onInvalid={this.disableButton}
            >
              <div className="field recipient">
                <List>
                  <ListItem
                    disabled
                    innerDivStyle={{ padding: '10px 16px 20px 80px' }}
                    leftAvatar={
                      <Avatar
                        size={70}
                        src={this.props.composer.recipient.avatar_url}
                        style={{ left: 0 }}
                      />
                    }
                  >
                    <div className="name">
                      {this.props.composer.recipient.name}
                    </div>

                    <div
                      className="location"
                      style={{
                        marginTop: 5,
                        color: '#666',
                        fontSize: 14,
                      }}
                    >
                      {this.props.composer.recipient.location}
                    </div>

                    <div
                      className="bio"
                      style={{
                        marginTop: 5,
                        color: '#333',
                        fontSize: 14,
                      }}
                    >
                      {this.props.composer.recipient.bio}
                    </div>
                  </ListItem>
                </List>
              </div>

              <div className="field subject">
                <FormsyText
                  id="subject"
                  placeholder="(ex: Great opportunity at Apple Inc.)"
                  floatingLabelText="Subject *"
                  floatingLabelFixed
                  updateImmediately
                  name="subject"
                  fullWidth
                  className="subject-input"
                  onKeyDown={PopupComposer.onKeyPress}
                  required
                />
              </div>

              <div className="mail">
                <div className="field message">
                  <RichEditor ref={node => (this.editorNode = node)} />
                </div>
              </div>

              <div className="clearfix" />
              <div className="actions">
                <RaisedButton
                  label="Send"
                  primary
                  type="submit"
                  disabled={!this.state.canSubmit}
                  onClick={this.createConversation}
                />
              </div>

              <Snackbar
                open={this.state.open}
                message={this.state.notification}
                action="Dismiss"
                autoHideDuration={2000}
                onRequestClose={this.handleRequestClose}
              />
            </Formsy.Form>
          </div>
        </dialog>
      </MuiThemeProvider>
    );
  }
}

PopupComposer.propTypes = {
  mailbox: React.PropTypes.object,
  composer: React.PropTypes.object,
};

const PopupComposerContainer = Relay.createContainer(PopupComposer, {
  initialVariables: {
    login: null,
  },

  fragments: {
    composer: () => Relay.QL`
      fragment on Composer {
        id,
        mailbox {
          id
        },
        recipient(login: $login) {
          id,
          name,
          database_id,
          avatar_url,
          location,
          company,
          bio,
        }
      }
    `,
  },
});

export default PopupComposerContainer;
