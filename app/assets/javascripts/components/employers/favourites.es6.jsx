/* global document window $ Turbolinks Routes */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List } from 'material-ui/List';
import {
  Card,
  CardText,
  CardTitle,
} from 'material-ui/Card';

// Local components
import Developer from '../developers/item.es6';
import EmptyList from '../shared/emptyList.es6';
import muiTheme from '../theme.es6';

const cardTitleStyle = {
  padding: '8px 16px 8px',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #d8d8d8',
};

class Favourites extends Component {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore(event) {
    event.preventDefault();
    const { relay } = this.props;
    this.props.relay.setVariables({ first: relay.variables.first + 20 });
  }

  render() {
    const { employer } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Card containerStyle={{ paddingBottom: 0 }}>
          <CardTitle
            title="Saved profiles"
            className="card-title"
            style={cardTitleStyle}
            titleStyle={{
              color: '#333',
              fontSize: 18,
              fontWeight: 400,
            }}
          />
          <CardText style={{ padding: 0, overflow: 'hidden' }}>
            {employer.favourites.edges && employer.favourites.edges.length > 0 ?
              <List style={{ paddingTop: 0, paddingBottom: 0 }}>
                {employer.favourites.edges.map(({ node }) => (
                  <Developer
                    developer={node}
                    key={node.id}
                  />
                ))}
              </List> : <EmptyList />
            }
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

Favourites.propTypes = {
  employer: React.PropTypes.object,
  relay: React.PropTypes.object,
};

const FavouritesContainer = Relay.createContainer(Favourites, {
  initialVariables: {
    first: 20,
  },

  fragments: {
    employer: () => Relay.QL`
      fragment on Employer {
        id,
        favourites(
          first: $first,
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

export default FavouritesContainer;
