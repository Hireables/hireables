import React from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import _ from 'underscore';


const containerStyle = {
  paddingTop: '0px',
  paddingBottom: '0px',
  borderRight: '1px solid #f2f2f2',
  boxShadow: '0 0 16px 0 rgba(63,67,69,0.3)',
  margin: '40px 0px',
};

const developerStyle = {
  fontWeight: '500',
  height: '100px',
  backgroundColor: 'white',
};

const LoadingList = () => {
  const emptyPlaceholders = _.map(_.range(0, 20, 1), (elem, index) => {
    return (
      <div
        key={index}
        style={developerStyle}
        className="developer developer--item"
        id={`developer_${elem}`}
      >
        <ListItem
          leftAvatar={<Avatar src={"https://placeholdit.imgix.net/~text?w=40&h=40"} />}
          secondaryText={
            <div className="animated-background secondary"></div>
          }
          primaryText={
            <div className="loading">
              <div className="animated-background"></div>
            </div>
          }
          disabled
          secondaryTextLines={1}
        />
      </div>
    )
  });

  return (
    <List className="col-md-7 pull-right" style={containerStyle}>
      {emptyPlaceholders}
    </List>
  );
};

export default LoadingList;