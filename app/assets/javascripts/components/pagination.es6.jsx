/* global Turbolinks */

import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

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
      <div className="container">
        <div className="pagination">
          {this.props.links.map(link => (
            <RaisedButton
              key={link.id}
              label={link.label}
              style={{ marginTop: '20px', marginRight: '10px' }}
              primary={true}
              onClick={() => this.loadPage(link.url)}
            />
          ))}
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  links: React.PropTypes.array,
};

export default Pagination;
