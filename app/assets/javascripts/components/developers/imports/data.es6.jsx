// Modules
import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
import createDOMPurify from 'dompurify';

// Stylesheet
import '../../styles/pins.sass';

const Data = (props) => {
  const { connectionData, toggleItem } = props;
  const description = createDOMPurify.sanitize(
    connectionData.description,
    { ALLOWED_TAGS: ['b', 'i'] }
  );

  return (
    <ListItem
      className={`list-item ${connectionData.pinned ? 'pinned' : ''}`}
      leftCheckbox={
        <Checkbox
          defaultChecked={connectionData.pinned}
          style={{ top: 'calc(100% / 3)' }}
          onCheck={event => toggleItem(event, connectionData)}
        />
      }
      rightIcon={
        <div
          style={{
            right: 20,
            top: 20,
            display: 'flex',
            lineHeight: '30px',
            justifyContent: 'space-between',
            color: '#777',
          }}
        >
          {connectionData.stars}
          <FontIcon
            color="#777"
            className="material-icons"
            style={{
              marginLeft: 5,
            }}
          >
            star
          </FontIcon>
        </div>
      }

      primaryText={connectionData.title}
      secondaryText={
        <span
          className="description"
          style={{ maxWidth: '70%' }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      }
      secondaryTextLines={2}
    />
  );
};

Data.propTypes = {
  connectionData: React.PropTypes.object,
  toggleItem: React.PropTypes.func,
};

const DataContainer = Relay.createContainer(Data, {
  fragments: {
    connectionData: () => Relay.QL`
      fragment on ConnectionData {
        id,
        title,
        description,
        stars,
        pinned,
        database_id,
      }
    `,
  },
});

export default DataContainer;
