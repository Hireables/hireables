/* global document */

import React, { Component } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { darkBlack } from 'material-ui/styles/colors';
import Receipt from './receipt.es6';

class Conversation extends Component {
  render() {
    const { conversation } = this.props;
    const userBadge = () => {
      const { name } = conversation.last_message.sender;
      const chunks = name.split(' ');
      return chunks[0][0] + chunks[1][0];
    };

    return (
      <div className={`conversation ${conversation.is_unread ? 'unread' : 'read'}`}>
        <ListItem
          onClick={event => this.props.showReceipts(event, conversation.id)}
          leftAvatar={
            conversation.last_message.sender.avatar_url ?
              <Avatar src={conversation.last_message.sender.avatar_url} /> :
              <Avatar>
                {userBadge()}
              </Avatar>
          }
          primaryText={conversation.subject}
          secondaryText={
            <p>
              <span style={{ color: darkBlack }}>
                {conversation.last_message.sender.name}
              </span> -- {conversation.last_message.body}
            </p>
          }
          secondaryTextLines={2}
          disabled
        />
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
        last_message {
          id,
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
