import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ UpdateAchievement }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateAchievementPayload {
        achievement
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          achievement: this.props.id,
        },
      },
    ];
  }

  getVariables() {
    return {
      ...this.props,
    };
  }
}
