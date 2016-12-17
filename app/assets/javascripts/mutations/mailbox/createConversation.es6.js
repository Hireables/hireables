import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ CreateConversation }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateConversationPayload {
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
        mailbox: this.props.id,
      },
    }];
  }

  getVariables() {
    return {
      ...this.props,
    };
  }
}
