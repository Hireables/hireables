/* global Turbolinks */

import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { orangeA700 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orangeA700,
    accent1Color: orangeA700,
  },
});

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.loadPage = this.loadPage.bind(this);
  }

  loadPage(link) {
    Turbolinks.visit(`/developers?${decodeURIComponent(link)}`);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="container">
          <div className="pagination">
            {this.props.links.map(link => (
              <RaisedButton
                key={link.id}
                label={link.label}
                style={{ marginTop: '20px', marginRight: '10px' }}
                primary
                onClick={() => this.loadPage(link.url)}
              />
            ))}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Pagination.propTypes = {
  links: React.PropTypes.array,
};

export default Pagination;
