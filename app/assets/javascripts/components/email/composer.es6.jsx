/* global Routes */

import React, { Component } from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyText } from 'formsy-material-ui/lib';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import { css } from 'aphrodite';
import Mail from 'material-ui/svg-icons/content/mail';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../theme.es6';
import RichEditor from '../shared/richEditor.es6';
import CreateConversation from '../../mutations/mailbox/createConversation.es6';
import chipStyles from '../styles/chips.es6';

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
    this.createConversation = this.createConversation.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.renderChip = this.renderChip.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    this.addRecipients = this.addRecipients.bind(this);
    this.fetchRecipients = this.fetchRecipients.bind(this);
    this.onInvalidRecipientSelection = this.onInvalidRecipientSelection.bind(this);

    this.state = {
      canSubmit: false,
      recipients: [],
    };
  }

  onInvalidRecipientSelection(message) {
    this.recipientNode.state.searchText = '';
    this.recipientNode.focus();
    this.setState({ canSubmit: false });
    this.props.setNotification(message);
  }

  fetchRecipients(event) {
    if (event.keyCode === 13) {
      Composer.onKeyPress(event);
      return;
    }

    this.props.relay.setVariables({
      query: this.recipientNode.state.searchText,
    });
  }

  addRecipients(selectedRecipient, index) {
    if (index === -1) {
      this.onInvalidRecipientSelection('Please select from the list');
      return;
    }

    const newRecipient = selectedRecipient.name.trim();

    if (newRecipient === '') {
      this.onInvalidRecipientSelection('Empty recipient');
      return;
    }

    const isDuplicate = this.state.recipients.some(recipient => (
      recipient.database_id === selectedRecipient.database_id
    ));

    if (isDuplicate) {
      this.onInvalidRecipientSelection('Duplicate recipient');
      return;
    }

    const recipients = this.state.recipients.concat([{
      database_id: selectedRecipient.database_id,
      name: newRecipient,
      avatar: selectedRecipient.avatar_url,
    }]);

    this.setState({ recipients }, () => {
      this.recipientNode.state.searchText = '';
      this.recipientNode.focus();
      this.setState({
        canSubmit: true,
      });
    });
  }

  handleRequestDelete(databaseId) {
    this.recipients = this.state.recipients;
    const recipientToDelete = this.recipients
    .map(recipient => recipient.database_id)
    .indexOf(databaseId);
    this.recipients.splice(recipientToDelete, 1);
    this.setState({ recipients: this.recipients });
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
      this.props.setNotification(errorMessage);
    };

    const onSuccess = (response) => {
      if (response.CreateConversation) {
        this.props.setNotification('Message Sent');
        this.props.removeComposer();
      }
    };

    if (this.state.recipients && this.state.recipients.length > 0) {
      Relay.Store.commitUpdate(new CreateConversation({
        id: this.props.mailbox.id,
        recipients: this.state.recipients.map(recipient => recipient.database_id),
        body: this.editorNode.state.value.toString('html'),
        ...this.formNode.getModel(),
      }), { onFailure, onSuccess });
    } else {
      this.props.setNotification('Please select atleast one recipient');
    }
  }

  renderChip(data) {
    return (
      <Chip
        key={data.database_id}
        onRequestDelete={() => this.handleRequestDelete(data.database_id)}
        className={css(chipStyles.badge)}
      >
        <Avatar src={data.avatar} />
        {data.name}
      </Chip>
    );
  }

  render() {
    const dataSourceConfig = {
      text: 'name',
      value: 'database_id',
      avatar: 'avatar_url',
    };

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
                onClick={this.props.removeComposer}
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
            <div className="field recipients">
              <AutoComplete
                floatingLabelText="To *"
                name="recipients"
                id="recipients"
                placeholder="(ex: Type 'ad' to search for adam)"
                floatingLabelFixed
                fullWidth
                animated={false}
                dataSource={
                  this.props.composer.recipients.edges.map(({ node }) => node)
                }
                filter={AutoComplete.fuzzyFilter}
                onNewRequest={this.addRecipients}
                className="recipients-input"
                ref={node => (this.recipientNode = node)}
                onKeyDown={this.fetchRecipients}
                dataSourceConfig={dataSourceConfig}
                maxSearchResults={5}
              />
              <div className={css(chipStyles.wrapper)}>
                {this.state.recipients.map(this.renderChip, this)}
              </div>
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
                onKeyDown={Composer.onKeyPress}
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
          </Formsy.Form>
        </div>
      </MuiThemeProvider>
    );
  }
}

Composer.propTypes = {
  mailbox: React.PropTypes.object,
  composer: React.PropTypes.object,
  relay: React.PropTypes.object,
  removeComposer: React.PropTypes.func,
  setNotification: React.PropTypes.func,
};

const ComposerContainer = Relay.createContainer(Composer, {
  initialVariables: {
    first: 5,
    query: null,
  },

  fragments: {
    composer: () => Relay.QL`
      fragment on Composer {
        id,
        recipients(first: $first, query: $query) {
          edges {
            node {
              id,
              database_id,
              email,
              name,
              avatar_url,
            }
          }
        }
      }
    `,
  },
});

export default ComposerContainer;
