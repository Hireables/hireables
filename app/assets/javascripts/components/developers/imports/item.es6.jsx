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
  const { item, toggleItemOnServer } = props;
  const description = createDOMPurify.sanitize(
    item.description || item.body || item.summary,
    { ALLOWED_TAGS: ['b', 'i'] }
  );

  const starFields = new Map();
  starFields.set('github', 'stargazers_count');
  starFields.set('stackoverflow', 'up_vote_count');
  starFields.set('youtube', 'likeCount');

  return (
    <ListItem
      className={`list-item ${item.pinned ? 'pinned' : ''}`}
      leftCheckbox={
        <Checkbox
          checked={item.pinned}
          style={{ top: 'calc(100% / 3)' }}
          onCheck={event => toggleItemOnServer(event, item)}
        />
      }
      rightIcon={
        item.source_name !== 'linkedin' ?
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
            {item[starFields.get(item.source_name)]}
            <FontIcon
              color="#777"
              className="material-icons"
              style={{
                marginLeft: 5,
              }}
            >
              star
            </FontIcon>
          </div> : <span />
      }

      primaryText={item.title || item.name}
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
  item: React.PropTypes.object,
  toggleItemOnServer: React.PropTypes.func,
};

const DataContainer = Relay.createContainer(Data, {
  fragments: {
    item: () => Relay.QL`
      fragment on Import {
        id,
        title,
        name,
        body,
        description,
        stargazers_count,
        likeCount,
        viewCount,
        summary,
        up_vote_count,
        source_id,
        source_name,
        pinned,
      }
    `,
  },
});

export default DataContainer;
