/* global document window $ Turbolinks Routes */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import FontIcon from 'material-ui/FontIcon';
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

// Utils
import CurrentUser from '../../helpers/currentUser.es6';

const currentUser = new CurrentUser();

const cardTitleStyle = {
  padding: 15,
  backgroundColor: '#f5f5f5',
  marginBottom: 20,
};

class Favourites extends Component {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
    this.handleScrollLoad = this.handleScrollLoad.bind(this);
    this.updateFavourites = this.updateFavourites.bind(this);
    this.state = { loading: false };
  }

  componentWillMount() {
    this.props.relay.forceFetch();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScrollLoad);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollLoad);
  }

  handleScrollLoad() {
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 200 &&
      !this.state.loading) {
      const { employer } = this.props;

      if (employer.favourites.pageInfo.hasNextPage) {
        this.setState({
          loading: true,
        }, () => {
          this.loadMore();
        });
      }
    }
  }

  loadMore() {
    const { relay } = this.props;
    relay.setVariables({
      first: relay.variables.first + 20,
    }, (readyState) => {
      if (readyState.done) {
        this.setState({
          loading: false,
        });
      }
    });
  }

  updateFavourites() {
    this.props.relay.forceFetch();
  }

  render() {
    const { employer } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Card
          containerStyle={{ paddingBottom: 0 }}
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
            Saved profiles
            {currentUser.isEmployer && currentUser.isOwner(employer.database_id) ?
              <FontIcon
                title="Refresh"
                className="material-icons pull-right"
                onClick={this.updateFavourites}
                style={{ cursor: 'pointer' }}
              >refresh</FontIcon> : ''
            }
          </CardTitle>
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
        database_id,
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
