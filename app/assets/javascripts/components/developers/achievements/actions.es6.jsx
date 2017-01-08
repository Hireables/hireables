// Modules
import React from 'react';
import Relay from 'react-relay';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const AchievementActions = (props) => {
  const { achievement, remove, edit } = props;
  return (
    <div className="owner-actions">
      <IconButton
        className="remove"
        tooltip="Remove"
        tooltipStyles={{ top: 25 }}
        onClick={event => remove(event, achievement)}
      >
        <FontIcon className="material-icons">close</FontIcon>
      </IconButton>

      <IconButton
        className="edit"
        tooltip="Edit"
        tooltipStyles={{ top: 25 }}
        onClick={edit}
      >
        <FontIcon className="material-icons">mode_edit</FontIcon>
      </IconButton>
    </div>
  );
};

AchievementActions.propTypes = {
  achievement: React.PropTypes.object,
  remove: React.PropTypes.func,
  edit: React.PropTypes.func,
};

const AchievementActionsContainer = Relay.createContainer(AchievementActions, {
  fragments: {
    achievement: () => Relay.QL`
      fragment on Achievement {
        id,
        developer_id,
        import_id,
        is_owner,
      }
    `,
  },
});

export default AchievementActionsContainer;
