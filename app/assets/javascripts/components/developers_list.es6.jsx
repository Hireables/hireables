/* global document window $ */

import React, { Component } from 'react';
import Loader from 'react-loader';
import mui from 'material-ui';
import Jumbotron from './jumbotron.es6.jsx';
import Developer from './developer.es6.jsx';
import PremiumDeveloper from './premium_developer.es6.jsx';
import Search from './search.es6.jsx';
import NoContent from './no_content.es6.jsx';
import Pagination from './pagination.es6.jsx';
import EmptyList from './empty_list.es6.jsx';

const List = mui.List;
const ThemeManager = mui.Styles.ThemeManager;
const Snackbar = mui.Snackbar;
const LightRawTheme = mui.Styles.LightRawTheme;
const Toggle = mui.Toggle;

class DevelopersList extends Component {
  constructor(props) {
    super(props);
    this.fetchHireables = this.fetchHireables.bind(this);
    this.fetchDevelopers = this.fetchDevelopers.bind(this);
    this.state = {
      developers: [],
      rels: [],
      path: this.props.path,
      featured: this.props.featured,
      loaded: false,
      hireable: false,
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
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
            ref="snackbar_404"
            message="Ohh no! Request failed! Make sure you are using right parameters"
            action="error"
            autoHideDuration={5000}
          />
        </div>
      </div>
    );
  }
}

DevelopersList.childContextTypes = {
  muiTheme: React.PropTypes.shape,
};

DevelopersList.propTypes = {
  path: React.PropTypes.string,
  featured: React.PropTypes.bool,
  meta: React.PropTypes.shape,
};

export default DevelopersList;
