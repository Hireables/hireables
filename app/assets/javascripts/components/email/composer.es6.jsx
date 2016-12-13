/* global Routes */

import React, { Component } from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyText } from 'formsy-material-ui/lib';
import Dropzone from 'react-dropzone';
import IconButton from 'material-ui/IconButton';
import Mail from 'material-ui/svg-icons/content/mail';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../theme.es6';
import RichEditor from '../shared/richEditor.es6';
import CreateConversation from '../../mutations/mailbox/createConversation.es6';

class Composer extends Component {
  static onKeyPress(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  constructor(props) {
    super(props);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.createConversation = this.createConversation.bind(this);
    this.handleFileDrop = this.handleFileDrop.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.state = {
      open: false,
      notification: '',
    };
  }

  onFailure(transaction) {
    const error = transaction.getError() || new Error('Mutation failed.');
    let errorMessage;
    if (error.source.errors && Array.isArray(error.source.errors)) {
      errorMessage = error.source.errors[0].message;
    } else {
      errorMessage = error.message;
    }
    this.setNotification(errorMessage);
  }

  onSuccess(response) {
    if (response.ConversationReply) {
      this.props.toggleReplyForm();
    }
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
    });
  }

  createConversation() {
    const onFailure = transaction => this.onFailure(transaction);
    const onSuccess = response => this.onSuccess(response);
    Relay.Store.commitUpdate(new CreateConversation({
      conversationId: this.props.conversation.id,
      body: this.editorNode.state.value.toString('html'),
    }), { onFailure, onSuccess });
  }

  handleFileDrop(acceptedFiles, rejectedFiles) {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="email-composor">
          <div className="header">
            <h1>
              <Mail className="icon" />
              Send a message
            </h1>
            <div className="actions">
              <IconButton
                tooltip="Discard"
              >
                <Cancel />
              </IconButton>
            </div>
          </div>

          <Formsy.Form
            onValid={this.enableButton}
            autoComplete="off"
            className="email-composer-form"
            ref={node => (this.formNode = node)}
            onInvalid={this.disableButton}
          >
            <div className="field subject">
              <FormsyText
                id="text-field-default"
                placeholder="(ex: Rails job)"
                name="subject"
                fullWidth
                className="subject-input"
                onKeyDown={Composer.onKeyPress}
                required
              />
            </div>

            <div className="mail">
              <div className="field message">
                <RichEditor ref={node => (this.editorNode = node)} />
              </div>
            </div>

            <div className="field attachment">
              <Dropzone
                onDrop={this.onDrop}
                multiple
                disablePreview
                maxSize={2}
                accept="application/pdf, application/doc"
              >
                <div>
                  Try dropping some files here,
                  or click to select files to upload.
                </div>
              </Dropzone>
            </div>

            <div className="clearfix" />
            <div className="actions">
              <RaisedButton
                label="Send"
                primary
                type="submit"
                onClick={this.createConversation}
              />
            </div>

            <div className="notifications">
              <Snackbar
                open={this.state.open}
                ref={node => (this.notification = node)}
                message={this.state.notification}
                autoHideDuration={5000}
                onRequestClose={this.handleRequestClose}
              />
            </div>
          </Formsy.Form>
        </div>
      </MuiThemeProvider>
    );
  }
}

Composer.propTypes = {
  toggleReplyForm: React.PropTypes.func,
  conversation: React.PropTypes.object,
};

export default Composer;
