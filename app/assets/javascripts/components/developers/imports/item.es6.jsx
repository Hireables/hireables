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
  const { data, toggleItem } = props;
  const description = createDOMPurify.sanitize(
    data.description || data.summary || data.body,
    { ALLOWED_TAGS: ['b', 'i'] }
  );

  return (
    <ListItem
      className={`list-item ${data.pinned ? 'pinned' : ''}`}
      leftCheckbox={
        <Checkbox
          defaultChecked={data.pinned}
          style={{ top: 'calc(100% / 3)' }}
          onCheck={event => toggleItem(event, data)}
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
            data.stargazers_count ||
            data.likeCount ||
            data.up_vote_count
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

      primaryText={data.title || data.name}
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
  data: React.PropTypes.object,
  toggleItem: React.PropTypes.func,
};

const DataContainer = Relay.createContainer(Data, {
  fragments: {
    import: () => Relay.QL`
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
        pinned,
      }
    `,
  },
});

export default DataContainer;
