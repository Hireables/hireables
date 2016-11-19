/* global document window $ Turbolinks Routes */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import _ from 'underscore';
import queryString from 'query-string';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List } from 'material-ui/List';
import {
  Card,
  CardText,
  CardTitle,
} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';

// Local components
import Developer from './item.es6';
import Pagination from '../pagination.es6';
import EmptyList from '../shared/emptyList.es6';
import muiTheme from '../theme.es6';

const cardTitleStyle = {
  padding: '16px 16px',
  backgroundColor: '#f5f5f5',
  marginBottom: 20,
  border: '1px solid #d8d8d8',
};

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
    this.toggleHireables = this.toggleHireables.bind(this);
    this.state = { developers: props.root.developers.edges || [] };

    this.queryObject = _.pick(
      queryString.parse(document.location.search),
      ['language', 'location', 'hireable', 'repos', 'page']
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

  toggleHireables(event, toggled) {
    if (toggled) {
      const hireables = this.state.developers.filter(({ node }) => (node.hireable));
      this.setState({ developers: hireables });
    } else {
      this.setState({ developers: this.props.root.developers.edges });
    }
  }

  render() {
    const { developers } = this.state;
    const { root, signedIn } = this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Card
          containerStyle={{
            paddingBottom: 0,
          }}
          style={{
            boxShadow: 'none',
            border: 0,
            borderRadius: 0,
          }}
        >
          <CardTitle
            className="card-title"
            style={cardTitleStyle}
            titleStyle={{
              color: '#333',
              fontSize: 18,
              fontWeight: 400,
            }}
          >
            Result

            <Toggle
              label="Hireables"
              className="pull-right"
              onToggle={this.toggleHireables}
              style={{ width: 'auto', display: 'inline-block' }}
            />
          </CardTitle>

          <CardText style={{ padding: 0, overflow: 'hidden' }}>
            {developers.length > 0 ?
              <List style={{ paddingTop: 0, paddingBottom: 0 }}>
                {developers.map(({ node }) => (
                  <Developer
                    developer={node}
                    key={node.id}
                    signedIn={signedIn}
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
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

DevelopersList.propTypes = {
  root: React.PropTypes.object,
  relay: React.PropTypes.object,
  signedIn: React.PropTypes.bool,
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
              hireable,
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
