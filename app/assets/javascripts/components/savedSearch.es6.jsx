/* global Turbolinks mixpanel document $ location Routes window */

// Modules
import React from 'react';
import queryString from 'query-string';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import moment from 'moment';
import {
  Card,
  CardText,
  CardTitle,
} from 'material-ui/Card';

// Local components
import muiTheme from './theme.es6';

const cardTitleStyle = {
  padding: '0px 16px',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #d8d8d8',
};

const showObject = (obj) => {
  let result = '';
  Object.keys(obj).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result += `<div class="item">
          <span class="key">${key}:</span>
          <span class="value">${obj[key]}</span>
        </div>`;
    }
  });

  return result;
};

const SavedSearch = (props) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Card
      style={{
        boxShadow: 'none',
        border: 0,
        borderRadius: 0,
        paddingBottom: 0,
      }}
      containerStyle={{
        paddingBottom: 0,
      }}
    >
      <CardTitle
        title="Recent Searches"
        className="saved-search-card-title"
        style={cardTitleStyle}
        titleStyle={{
          color: '#333',
          fontSize: 18,
          fontWeight: 400,
        }}
      />

      <CardText style={{ padding: 0 }}>
        <List style={{ padding: 0 }}>
          {props.searches.map(search => (
            <ListItem
              hoverColor="#fafafa"
              onClick={() => Turbolinks.visit(`/search?${queryString.stringify(search.params)}`)}
              key={search.id}
              style={{
                borderBottom: '1px solid #f2f2f2',
              }}
              primaryText={
                <div
                  className="search"
                  dangerouslySetInnerHTML={{ __html: showObject(search.params) }}
                />
              }
              secondaryText={
                <time style={{ fontSize: 12 }}>
                  {
                    moment(search.created_at, 'YYYY-MM-DD HH:mm [UTC]')
                    .fromNow()
                    .toString()
                  }
                </time>
              }
            />
          ))}
        </List>
      </CardText>
    </Card>
  </MuiThemeProvider>
);

SavedSearch.propTypes = {
  searches: React.PropTypes.array,
};

export default SavedSearch;
