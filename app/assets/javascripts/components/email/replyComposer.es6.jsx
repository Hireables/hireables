/* global Routes */

import React, { Component } from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/RaisedButton';
import RichEditor from '../shared/richEditor.es6';
import ConversationReply from '../../mutations/mailbox/conversationReply.es6';

class ReplyComposer extends Component {
  constructor(props) {
    super(props);
    this.replyToConversation = this.replyToConversation.bind(this);
  }

  replyToConversation() {
    const onFailure = (transaction) => {
      const error = transaction.getError() || new Error('Mutation failed.');
      let errorMessage;
      if (error.source.errors && Array.isArray(error.source.errors)) {
        errorMessage = error.source.errors[0].message;
      } else {
        errorMessage = error.message;
      }
      this.props.setNotification(errorMessage);
    };

    const onSuccess = (response) => {
      if (response.ReplyToConversation) {
        this.props.toggleReplyForm();
        this.props.setNotification('Reply Sent');
      }
    };
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
        </Formsy.Form>
      </div>
    );
  }
}

ReplyComposer.propTypes = {
  toggleReplyForm: React.PropTypes.func,
  conversation: React.PropTypes.object,
  setNotification: React.PropTypes.func,
};

export default ReplyComposer;
