import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ CreateConversation }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateConversationPayload {
        conversationEdge,
        mailbox {
          id,
          conversations_count,
        },
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        conversation: this.props.mailboxId,
      },
    }, {
      type: 'RANGE_ADD',
      parentName: 'conversation',
      parentID: this.props.mailboxId,
      connectionName: 'conversations',
      edgeName: 'conversationEdge',
      rangeBehaviors: {
        '': 'prepend',
        'order(id)': 'append',
        'order(-id)': 'prepend',
      },
    }];
  }

  getVariables() {
    return {
      id: this.props.mailboxId,
      body: this.props.body,
    };
  }
}
