import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ ReplyToConversation }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on ReplyToConversationPayload {
        receiptEdge,
        conversation {
          id,
          last_message {
            id,
            body,
            sender,
            created_at,
          },
          messages_count,
        },
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        conversation: this.props.conversationId,
      },
    }, {
      type: 'RANGE_ADD',
      parentName: 'conversation',
      parentID: this.props.conversationId,
      connectionName: 'receipts',
      edgeName: 'receiptEdge',
      rangeBehaviors: {
        '': 'prepend',
        'order(id)': 'append',
        'order(-id)': 'prepend',
      },
    }];
  }

  getVariables() {
    return {
      id: this.props.conversationId,
      body: this.props.body,
    };
  }
}
