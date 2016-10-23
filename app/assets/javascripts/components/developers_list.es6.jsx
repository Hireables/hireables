/* global document window $ Turbolinks Routes */

import React, { Component } from 'react';
import Relay from 'react-relay';
import _ from 'underscore';
import queryString from 'query-string';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import { List } from 'material-ui/List';
import Developer from './developer.es6';
import Pagination from './pagination.es6';
import EmptyList from './empty_list.es6';
import LoadingList from './loading_list.es6';
import muiTheme from './theme.es6';

class DevelopersList extends Component {
  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.loadNext = this.loadNext.bind(this);
    this.loadPrevious = this.loadPrevious.bind(this);
    this.queryObject = _.pick(
      queryString.parse(document.location.search),
      ['language', 'location', 'page', 'hireable']
    );
    this.state = { open: false, loaded: false };
  }

  componentWillMount() {
    this.props.relay.setVariables(this.queryObject, (readyState) => {
      if (readyState.done) {
        this.setState({ loaded: true }, () => {
          const { pageInfo } = this.props.root.developers;
          const { relay } = this.props;
          if (pageInfo != null && pageInfo.hasNextPage) {
            $.get(
              '/search',
              Object.assign(this.queryObject, { page: parseInt(relay.variables.page, 0) + 1 })
            );
          }
        });
      }
    });
  }

  loadNext(event) {
    event.preventDefault();
    const { relay } = this.props;
    const newPage = _.pick(Object.assign(
      this.queryObject,
      { page: parseInt(relay.variables.page, 0) + 1 },
    ), _.identity);

    const query = queryString.stringify(newPage);

    if (query === '') {
      Turbolinks.visit(Routes.root_path());
    } else {
      Turbolinks.visit(`/search?${query}`);
    }
  }

  loadPrevious(event) {
    event.preventDefault();
    const { relay } = this.props;
    const previousPage = parseInt(relay.variables.page, 0) - 1;
    const newPage = _.pick(Object.assign(
      this.queryObject,
      { page: previousPage === 1 ? null : previousPage },
    ), _.identity);

    const query = queryString.stringify(newPage);

    if (query === '') {
      Turbolinks.visit(Routes.root_path());
    } else {
      Turbolinks.visit(`/search?${query}`);
    }
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const containerStyle = {
      paddingTop: '0px',
      paddingBottom: '0px',
      borderRight: '1px solid #f2f2f2',
      boxShadow: '0 0 16px 0 rgba(63,67,69,0.3)',
      margin: '40px 0px',
    };

    const { root } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="col-md-7 pull-right">
          {this.state.loaded ?
            (root.developers.edges && root.developers.edges.length > 0 ?
              <List style={containerStyle}>
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
              </List> : <EmptyList />) : <LoadingList />
            }
          <Snackbar
            open={this.state.open}
            ref="snackbar_404"
            message="Ohh no! Request failed! Make sure you are using right parameters"
            action="error"
            onRequestClose={this.handleRequestClose}
            autoHideDuration={5000}
          />
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
    hireable: null,
    order: '-id',
    page: '1',
  },

  fragments: {
    root: () => Relay.QL`
      fragment on Viewer {
        id,
        developers(
          first: $first,
          location: $location,
          language: $language,
          hireable: $hireable,
          order: $order,
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
