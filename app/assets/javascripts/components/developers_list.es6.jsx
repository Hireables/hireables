/* global document window $ */

import React, { Component } from 'react';
import Loader from 'react-loader';
import { List } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import Toggle from 'material-ui/Toggle';
import Jumbotron from './jumbotron.es6';
import Developer from './developer.es6';
import PremiumDeveloper from './premium_developer.es6';
import Search from './search.es6';
import NoContent from './no_content.es6';
import Pagination from './pagination.es6';
import EmptyList from './empty_list.es6';

class DevelopersList extends Component {
  constructor(props) {
    super(props);
    this.fetchHireables = this.fetchHireables.bind(this);
    this.fetchDevelopers = this.fetchDevelopers.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);

    this.state = {
      developers: [],
      rels: [],
      path: this.props.path,
      featured: this.props.featured,
      loaded: false,
      hireable: false,
      open: false,
    };
  }

  componentDidMount() {
    const query = decodeURIComponent(document.location.search.replace('?', ''));
    const path = !query ? this.state.path : `${this.state.path}?${query}`;
    this.fetchDevelopers(path, {});
  }

  fetchHireables(event, toggled) {
    const query = decodeURIComponent(document.location.search.replace('?', ''));
    const path = !query ? this.state.path : `${this.state.path}?${query}`;

    this.setState({
      [event.target.name]: toggled,
    });

    this.fetchDevelopers(path, !this.state.hireable ?
      { hireable: !this.state.hireable } : {}
    );
  }

  fetchDevelopers(path, params) {
    this.setState({ loaded: false });

    $.ajaxSetup({
      cache: false,
    });

    $.post(path, params, (json) => {
      this.setState({
        developers: json.developers,
        rels: json.rels,
        loaded: true,
      });
    }, 'json').fail(() => {
      this.refs.snackbar_404.show();
      this.setState({ loaded: true });
    });
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
      borderLeft: '1px solid #f2f2f2',
      borderRight: '1px solid #f2f2f2',
    };

    const subHeaderStyles = {
      fontSize: '20px',
      marginBottom: '20px',
      padding: '0',
      display: 'inline-block',
      marginLeft: '15px',
      fontWeight: '500',
      color: '#777',
      lineHeight: '30px',
      marginRight: '30px',
    };

    const checkboxStyles = {
      display: 'inline-block',
      marginRight: '20px',
      width: '30%',
      float: 'right',
      fontWeight: '500',
      marginTop: 'calc(67px / 3)',
    };

    return (
      <MuiThemeProvider>
        <div className="developers-list wrapper">
          <div className="container">
            <div className="developers-list developers--small sm-pull-reset col-md-5">
              <Jumbotron />
              <Search
                action={'/developers'}
                searchDevelopers={this.fetchDevelopers}
                fetchDevelopers={this.fetchDevelopers}
              />
            </div>
            <Loader loaded={this.state.loaded} className="p-b-100">
              {this.state.loaded && this.state.developers.length > 0 ?
                <List className="col-md-7 pull-right" style={containerStyle}>
                  <div className="list--header">
                    <h2 style={subHeaderStyles} className="list--header--title">
                      {this.state.featured ? 'Featured developers' : 'Search result'}
                    </h2>
                    <Toggle
                      className="list--header--hireable-toggle"
                      name="hireable"
                      label="Only hireables"
                      defaultToggled={this.state.hireable}
                      style={checkboxStyles}
                      onToggle={this.fetchHireables}
                    />
                  </div>
                  {this.state.developers.map(developer => (
                    developer.data !== undefined ?
                      <PremiumDeveloper
                        developer={developer}
                        key={developer.id}
                        meta={this.props.meta}
                      /> :
                      <Developer
                        developer={developer}
                        key={developer.id}
                        meta={this.props.meta}
                      />
                  ))}
                  {this.state.rels != null && this.state.developers.length > 0 ?
                    <Pagination links={this.state.rels} fetchNextPage={this.fetchDevelopers} />
                    : <NoContent />
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
  path: React.PropTypes.string,
  featured: React.PropTypes.bool,
  meta: React.PropTypes.object,
};

export default DevelopersList;