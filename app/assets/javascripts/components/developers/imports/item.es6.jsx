// Modules
import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
import { sanitizeText } from '../../../utils/sanitize.es6';
import '../../styles/pins.sass';

const Data = (props) => {
  const { item, unpinImport, pinImport } = props;
  const description = sanitizeText(
    item.description || item.body || item.summary || item.tagline
  );

  const starFields = {
    github: {
      pr: 'comments',
      repo: 'stargazers_count',
    },
    medium: 'recommends',
    stackoverflow: 'up_vote_count',
    youtube: 'likeCount',
    meetup: 'yes_rsvp_count',
    producthunt: 'votes_count',
  };

  const count = item.source_name === 'github' ?
    item[starFields[item.source_name][item.category]] :
    item[starFields[item.source_name]];

  return (
    <ListItem
      className={`list-item ${item.pinned ? 'pinned' : ''}`}
      leftCheckbox={
        <Checkbox
          checked={item.pinned}
          style={{ top: 'calc(100% / 3)' }}
          onCheck={(event, checked) =>
            (checked ? pinImport(event, item) : unpinImport(event, item))
          }
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
            {count}
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
          dangerouslySetInnerHTML={{ __html: description.replace(/&nbsp;/g, '') }}
        />
      }
      secondaryTextLines={2}
    />
  );
};

Data.propTypes = {
  item: React.PropTypes.object,
  pinImport: React.PropTypes.func,
  unpinImport: React.PropTypes.func,
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
        category,
        stargazers_count,
        likeCount,
        viewCount,
        recommends,
        yes_rsvp_count,
        summary,
        up_vote_count,
        source_id,
        source_name,
        votes_count,
        comments_count,
        discussion_url,
        comments,
        tagline,
        pinned,
      }
    `,
  },
});

export default DataContainer;
