import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ ToggleAchievement }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on ToggleAchievementPayload {
        developer {
          id,
          achievements,
        },
        connection {
          id,
          imports,
        },
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          developer: this.props.developerId,
        },
      },
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          connection: this.props.connectionId,
        },
      },
    ];
  }

  getVariables() {
    return {
      id: this.props.id,
    };
  }
}
