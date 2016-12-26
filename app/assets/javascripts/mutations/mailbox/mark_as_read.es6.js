import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ MarkAsReadConversation }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on MarkAsReadConversationPayload {
        conversation {
          id,
          is_unread,
        },
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          conversation: this.props.conversationId,
        },
      },
    ];
  }

  getVariables() {
    return {
      id: this.props.conversationId,
    };
  }

  getOptimisticResponse() {
    return {
      conversation: {
        id: this.props.conversationId,
        is_unread: false,
      },
    };
  }
}
