import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ DeleteConversation }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DeleteConversationPayload {
        deletedId,
        mailbox {
          id,
          conversations,
          conversations_count,
        },
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        mailbox: this.props.mailbox_id,
      } }, {
        type: 'NODE_DELETE',
        parentName: 'mailbox',
        parentID: this.props.mailbox_id,
        connectionName: 'conversations',
        deletedIDFieldName: 'deletedId',
      }];
  }

  getVariables() {
    return {
      ...this.props,
    };
  }
}
