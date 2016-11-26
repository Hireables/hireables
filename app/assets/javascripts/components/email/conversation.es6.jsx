/* global document $ */

import React, { Component } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import moment from 'moment';
import Receipt from './receipt.es6';
import MarkAsRead from '../../mutations/mailbox/mark_as_read.es6';

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.openConversation = this.openConversation.bind(this);
    this.state = {
      active: false,
    };
  }

  componentDidMount() {
    if (this.props.conversation.is_unread) {
      this.conversationNode.classList.add('unread');
    }
  }

  openConversation(event) {
    const { conversation } = this.props;
    event.preventDefault();
    $('.conversations').find('.conversation').removeClass('active');
    this.conversationNode.classList.add('active');

    this.props.showReceipts(conversation.id);

    const onSuccess = () => {
      this.conversationNode.classList.remove('unread');
    };

    if (this.props.conversation.is_unread) {
      Relay.Store.commitUpdate(new MarkAsRead({
        conversationId: conversation.id,
      }), { onSuccess });
    }
  }

  render() {
    const { conversation } = this.props;
    const userBadge = () => {
      const { name } = conversation.last_message.sender;
      const chunks = name.split(' ');
      return chunks[0][0] + chunks[1][0];
    };

    return (
      <div
        className="conversation"
        id={`conversation-${conversation.database_id}`}
        ref={node => (this.conversationNode = node)}
      >
        <ListItem
          onClick={this.openConversation}
          leftAvatar={
            conversation.last_message.sender.avatar_url ?
              <Avatar src={conversation.last_message.sender.avatar_url} /> :
              <Avatar>
                {userBadge()}
              </Avatar>
          }
          primaryText={<div className="title">{conversation.subject}</div>}
          secondaryText={
            <p className="body">
              {conversation.last_message.body}
            </p>
          }
          secondaryTextLines={2}
          disabled
        >
          <div className="sender">
            {conversation.last_message.sender.name}
          </div>
          <div className="datetime">
            {moment(conversation.last_message.created_at, 'YYYY-MM-DD HH:mm:ss [UTC]').fromNow().toString()}
          </div>
        </ListItem>
        <Divider />
      </div>
    );
  }
}

Conversation.propTypes = {
  conversation: React.PropTypes.object,
  showReceipts: React.PropTypes.func,
};

const ConversationContainer = Relay.createContainer(Conversation, {
  initialVariables: {
    first: 20,
    visible: false,
  },

  fragments: {
    conversation: () => Relay.QL`
      fragment on Conversation {
        id,
        subject,
        is_unread,
        database_id,
        last_message {
          id,
          created_at,
          sender {
            avatar_url,
            name,
          },
          body,
        },
        receipts(first: $first) @include(if: $visible) {
          edges {
            node {
              id,
              ${Receipt.getFragment('receipt')},
            }
          }
        }
      }
    `,
  },
});

export default ConversationContainer;
