/* global Routes */

import React, { Component } from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import RichEditor from '../shared/richEditor.es6';
import ConversationReply from '../../mutations/mailbox/conversationReply.es6';

class ReplyComposer extends Component {
  constructor(props) {
    super(props);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.replyToConversation = this.replyToConversation.bind(this);
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

  replyToConversation() {
    const onFailure = transaction => this.onFailure(transaction);
    const onSuccess = response => this.onSuccess(response);
    Relay.Store.commitUpdate(new ConversationReply({
      conversationId: this.props.conversation.id,
      body: this.editorNode.state.value.toString('html'),
    }), { onFailure, onSuccess });
  }

  render() {
    return (
      <div className="composor">
        <Formsy.Form
          onValid={this.enableButton}
          autoComplete="off"
          className="form"
          ref={node => (this.formNode = node)}
          onInvalid={this.disableButton}
        >
          <div className="field message">
            <RichEditor ref={node => (this.editorNode = node)} />
          </div>

          <div className="clearfix" />
          <div className="actions">
            <RaisedButton
              label="Reply"
              primary
              type="submit"
              onClick={this.replyToConversation}
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
    );
  }
}

ReplyComposer.propTypes = {
  toggleReplyForm: React.PropTypes.func,
  conversation: React.PropTypes.object,
};

export default ReplyComposer;
