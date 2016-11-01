/* global document window $ Turbolinks Routes */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import _ from 'underscore';
import queryString from 'query-string';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List } from 'material-ui/List';

// Local components
import Developer from './item.es6';
import Pagination from '../pagination.es6';
import EmptyList from '../shared/emptyList.es6';
import muiTheme from '../theme.es6';

class DevelopersList extends Component {
  static visitPage(page) {
    const query = queryString.stringify(page);

    if (query === '') {
      Turbolinks.visit(Routes.root_path());
    } else {
      Turbolinks.visit(`/search?${query}`);
    }
  }

  constructor(props) {
    super(props);
    this.loadNext = this.loadNext.bind(this);
    this.loadPrevious = this.loadPrevious.bind(this);

    this.queryObject = _.pick(
      queryString.parse(document.location.search),
      ['language', 'location', 'page', 'hireable', 'repos']
    );
  }

  loadNext(event) {
    event.preventDefault();
    const { relay } = this.props;
    const newPage = _.pick(Object.assign(
      this.queryObject,
      { page: parseInt(relay.variables.page, 0) + 1 },
    ), _.identity);

    DevelopersList.visitPage(newPage);
  }

  loadPrevious(event) {
    event.preventDefault();
    const { relay } = this.props;
    const previousPage = parseInt(relay.variables.page, 0) - 1;
    const newPage = _.pick(Object.assign(
      this.queryObject,
      { page: previousPage === 1 ? null : previousPage },
    ), _.identity);

    DevelopersList.visitPage(newPage);
  }

  render() {
    const containerStyle = {
      paddingBottom: '0px',
      border: '1px solid #d8d8d8',
      boxShadow: '0 0 16px 0 rgba(63,67,69,0.3)',
      margin: '40px 0px',
    };

    const { root } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="col-md-7 pull-right" style={containerStyle}>
          {root.developers.edges && root.developers.edges.length > 0 ?
            <List style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              {root.developers.edges.map(({ node }) => (
                <Developer
                  developer={node}
                  key={node.id}
                />
              ))}

              {root.developers.pageInfo != null &&
                (root.developers.pageInfo.hasNextPage ||
                  this.queryObject.page >= 2
                ) ?
                  <Pagination
                    loadNext={this.loadNext}
                    queryObject={this.queryObject}
                    pageInfo={root.developers.pageInfo}
                    loadPrevious={this.loadPrevious}
                  /> : ''
              }
            </List> : <EmptyList />
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

DevelopersList.propTypes = {
  root: React.PropTypes.object,
  relay: React.PropTypes.object,
};

const DevelopersListContainer = Relay.createContainer(DevelopersList, {
  initialVariables: {
    first: 50,
    location: null,
    language: null,
    repos: null,
    page: 1,
  },

  fragments: {
    root: () => Relay.QL`
      fragment on Viewer {
        id,
        developers(
          first: $first,
          location: $location,
          language: $language,
          repos: $repos,
          page: $page,
        ) {
          edges {
            node {
              id,
              premium,
              ${Developer.getFragment('developer')}
            }
          }

          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
      }
    `,
  },
});

export default DevelopersListContainer;
