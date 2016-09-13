// Require React
React = require('react/addons');
var Loader = require('react-loader');

// import material UI
import mui from 'material-ui';
let List = mui.List;
let Colors = mui.Styles.Colors;
let ThemeManager = mui.Styles.ThemeManager;
let Snackbar = mui.Snackbar;
let LightRawTheme = mui.Styles.LightRawTheme;
let Toggle = mui.Toggle;
import Jumbotron from './jumbotron.es6.js';

// Dependent component
import Developer from './developer.es6.js'
import PremiumDeveloper from './premium_developer.es6.js'
import Search from './search.es6.js'
import NoContent from './no_content.es6.js'
import Pagination from './pagination.es6.js'
import EmptyList from './empty_list.es6.js'

// Define component
const DevelopersList = React.createClass({

  getInitialState () {
    return {
      developers: [],
      rels: [],
      path: this.props.path,
      featured: this.props.featured,
      loaded: false,
      hireable: false,
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  componentDidMount() {
    if(this.isMounted()){
      var query = decodeURIComponent(document.location.search.replace('?', ''));
      var path = !query? this.state.path : this.state.path + '?' + query
      this._fetchDevelopers(path, {});
    }
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  render() {

    let containerStyle = {
      paddingTop: '0px',
      borderLeft: '1px solid #f2f2f2',
      borderRight: '1px solid #f2f2f2',
    };

    let subHeaderStyles = {
      fontSize: '20px',
      marginBottom: '20px',
      padding: '0',
      display: 'inline-block',
      marginLeft: '15px',
      fontWeight: '500',
      color: '#777',
      lineHeight: '30px',
      marginRight: '30px'
    };

    let checkboxStyles = {
      display: 'inline-block',
      marginRight: '20px',
      width: '30%',
      float:'right',
      fontWeight: '500',
      marginTop: 'calc(67px / 3)',
    };

    const styles = {
      toggle: {
        marginBottom: 16,
        float:'right'
      },
    };

    return (
      <div className="developers-list wrapper">
        <div className="container">
          <div className="developers-list developers--small sm-pull-reset col-md-5">
            <Jumbotron />
            <Search action={"/developers"} searchDevelopers={this._fetchDevelopers} fetchDevelopers={this._fetchDevelopers} />
          </div>
          <Loader loaded={this.state.loaded} className="p-b-100">
            {this.state.loaded && this.state.developers.length > 0 ?
              <List className="col-md-7 pull-right" style={containerStyle}>
              <div className="list--header">
                <h2 style={subHeaderStyles} className="list--header--title">
                  {this.state.featured? 'Featured developers' : 'Search result'}
                </h2>
                <Toggle className="list--header--hireable-toggle" name="hireable" label="Only hireables" defaultToggled={this.state.hireable}
               style={checkboxStyles}
               onToggle={this._fetchHireables} />
              </div>
              {this.state.developers.map(developer => (
                developer.data !== undefined ?
                <PremiumDeveloper
                  developer={developer}
                  key={developer.id}
                  meta={this.props.meta}
                /> : <Developer
                      developer={developer}
                      key={developer.id}
                      meta={this.props.meta}
                    />
              ))}
              {this.state.rels != null && this.state.developers.length > 0 ?
                <Pagination links={this.state.rels} fetchNextPage={this._fetchDevelopers} />
                : <NoContent />
              }
            </List> : <EmptyList />}
          </Loader>
          <Snackbar
            ref="snackbar_404"
            message="Ohh no! Request failed! Make sure you are using right parameters"
            action="error"
            autoHideDuration={5000} />
        </div>
      </div>
    );
  },

  _fetchHireables(event, toggled) {
    var query = decodeURIComponent(document.location.search.replace('?', ''));
    var path = !query? this.state.path : this.state.path + '?' + query;

    this.setState({
      [event.target.name]: toggled,
    });

    this._fetchDevelopers(path, !this.state.hireable ? {hireable: !this.state.hireable} : {});
  },

  _fetchDevelopers(path, params) {
    // Set state to be loading
    this.setState({loaded: false});

    // Setup cache false
    $.ajaxSetup({
      cache: false
    });

    // Get initial developers
    $.post(path, params, function(json, textStatus) {
      this.setState({
        developers: json.developers,
        rels: json.rels,
        loaded: true
      });
    }.bind(this), "json")
    .fail(function(json, textStatus) {
      this.refs.snackbar_404.show();
      this.setState({loaded: true})
    }.bind(this));

  }

});

module.exports = DevelopersList;
