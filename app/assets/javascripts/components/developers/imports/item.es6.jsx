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
  const { item, toggleItem } = props;
  const description = createDOMPurify.sanitize(
    item.description || item.summary || item.body,
    { ALLOWED_TAGS: ['b', 'i'] }
  );

  return (
    <ListItem
      className={`list-item ${item.pinned ? 'pinned' : ''}`}
      leftCheckbox={
        <Checkbox
          defaultChecked={item.pinned}
          style={{ top: 'calc(100% / 3)' }}
          onCheck={event => toggleItem(event, item)}
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
          {
            item.stargazers_count ||
            item.likeCount ||
            item.up_vote_count
          }
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
  toggleItem: React.PropTypes.func,
};

const DataContainer = Relay.createContainer(Data, {
  fragments: {
    item: () => Relay.QL`
      fragment on Import {
        id,
        title,
        name,
        summary,
        body,
        description,
        stargazers_count,
        likeCount,
        up_vote_count,
        source_id,
        source_name,
        pinned,
      }
    `,
  },
});

export default DataContainer;
