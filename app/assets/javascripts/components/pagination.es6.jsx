/* global Turbolinks */

import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { orangeA700 } from 'material-ui/styles/colors';
import NoContent from './no_content.es6';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orangeA700,
    accent1Color: orangeA700,
  },
});

const Pagination = (props) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className="container">
      <div className="pagination">
        {props.queryObject.page >= 2 ?
          <RaisedButton
            label="Previous"
            className="link previous"
            style={{ boxShadow: 'none', borderRadius: '0', background: 'transparent' }}
            onClick={props.loadPrevious}
          />
          : <NoContent />
        }
        {props.pageInfo != null &&
          props.pageInfo.hasNextPage  ?
          <RaisedButton
            label="Next"
            className="link next"
            style={{ boxShadow: 'none', borderRadius: '0', background: 'transparent' }}
            onClick={props.loadNext}
          />
          : <NoContent />
        }
      </div>
    </div>
  </MuiThemeProvider>
);

Pagination.propTypes = {
  links: React.PropTypes.array,
};

export default Pagination;
