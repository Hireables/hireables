import React from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import _ from 'underscore';
import {
  Card,
  CardText,
} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const developerStyle = {
  fontWeight: '500',
  height: '120px',
  backgroundColor: 'white',
};

const LoadingList = () => {
  const emptyPlaceholders = _.map(_.range(0, 20, 1), (elem, index) => (
    <div
      key={index}
      style={developerStyle}
      className="profile--item"
      id={`developer_${elem}`}
    >
      <ListItem
        leftAvatar={
          <div style={{ textAlign: 'center' }}>
            <Avatar src={'https://placeholdit.imgix.net/~text?w=80&h=80'} size={80} />
          </div>
        }
        secondaryText={
          <div className="animated-background secondary" />
        }
        primaryText={
          <div className="animated-background" />
        }
        disabled
        secondaryTextLines={1}
      />
    </div>
  ));

  return (
    <MuiThemeProvider>
      <Card>
        <CardText style={{ padding: 0, overflow: 'hidden' }}>
          <List style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            {emptyPlaceholders}
          </List>
        </CardText>
      </Card>
    </MuiThemeProvider>
  );
};

export default LoadingList;
