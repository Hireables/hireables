/* global document window $ */

import React, { Component } from 'react';
import Relay from 'react-relay';
import _ from 'underscore';
import RaisedButton from 'material-ui/RaisedButton';
import queryString from 'query-string';
import Loader from 'react-loader';
import { List } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import Developer from './developer.es6';
import PremiumDeveloper from './premium_developer.es6';
import Search from './search.es6';
import NoContent from './no_content.es6';
import EmptyList from './empty_list.es6';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { orangeA700 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orangeA700,
    accent1Color: orangeA700,
  },
});

class DevelopersList extends Component {
  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.loadPrevious = this.loadPrevious.bind(this);
    this.queryObject = queryString.parse(document.location.search);
    this.state = {
      open: false,
      loaded: false,
    };
  }

  componentDidMount() {
    const queryObject = this.queryObject.page === 1 ? _.omit(this.queryObject, 'page') : this.queryObject;
    this.props.relay.setVariables(queryObject, (readyState) => {
      if (readyState.done) {
        this.setState({ loaded: true });
      }
    });
  }

  loadMore(event) {
    event.preventDefault();
    const newPage = Object.assign(
      this.queryObject,
      { page: parseInt(this.props.relay.variables.page, 0) + 1 },
    );

    Turbolinks.visit(`/developers?${queryString.stringify(
       _.pick(newPage, _.identity)
    )}`);
  }

  loadPrevious(event) {
    event.preventDefault();
    const newPage = Object.assign(
      this.queryObject,
      { page: parseInt(this.props.relay.variables.page, 0) - 1 },
    );

    Turbolinks.visit(`/developers?${queryString.stringify(
       _.pick(newPage, _.identity)
    )}`);
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

    const { root, relay } = this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="developers-list wrapper">
          <div className="container">
            <div className="developers-list developers--small sm-pull-reset col-md-5">
              <Search action={'/developers'} relay={relay} />
            </div>
            <Loader loaded={this.state.loaded}>
              {root.developers.edges && root.developers.edges.length > 0 ?
                <List className="col-md-7 pull-right" style={containerStyle}>
                  {root.developers.edges.map(({ node }) => (
                    node.remote ?
                      <PremiumDeveloper
                        developer={node}
                        key={node.id}
                      /> :
                      <Developer
                        developer={node}
                        key={node.id}
                      />
                  ))}
                  {root.developers.pageInfo != null &&
                    root.developers.pageInfo.hasNextPage ||
                    this.queryObject.page >= 2  ?
                    <div className="pagination">
                      {this.queryObject.page >= 2 ?
                        <RaisedButton
                          label="Previous page"
                          style={{ marginTop: '20px', marginRight: '10px' }}
                          primary
                          onClick={this.loadPrevious}
                        />
                        : <NoContent />
                      }
                      {root.developers.pageInfo != null && root.developers.pageInfo.hasNextPage  ?
                        <RaisedButton
                          label="Next page"
                          style={{ marginTop: '20px', marginRight: '10px' }}
                          primary
                          onClick={this.loadMore}
                        />
                        : <NoContent />
                      }
                    </div> : ''
                  }
                </List> : <EmptyList />}
              </Loader>
            <Snackbar
              open={this.state.open}
              ref="snackbar_404"
              message="Ohh no! Request failed! Make sure you are using right parameters"
              action="error"
              onRequestClose={this.handleRequestClose}
              autoHideDuration={5000}
            />
          </div>
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
    first: 20,
    fullname: null,
    location: null,
    language: null,
    followers: '>10',
    repos: '>10',
    order: '-id',
    page: '1',
  },

  fragments: {
    root: () => Relay.QL`
      fragment on Viewer {
        id,
        developers(
          first: $first,
          fullname: $fullname,
          location: $location,
          language: $language,
          followers: $followers,
          repos: $repos,
          order: $order,
          page: $page,
        ) {
          edges {
            node {
              id,
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
