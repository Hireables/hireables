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
import Member from './member.es6.js'
import Search from './search.es6.js'
import NoContent from './no_content.es6.js'
import Pagination from './pagination.es6.js'
import EmptyList from './empty_list.es6.js'

// Define component
const MembersList = React.createClass({

  getInitialState () {
    return {
      members: [],
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
      this._fetchMembers(path, {});
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
      fontSize: '25px',
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
      marginTop: 'calc(71px / 3)',
    };

    const styles = {
      toggle: {
        marginBottom: 16,
        float:'right'
      },
    };

    return (
      <div className="members-list wrapper">
        <div className="container">
          <div className="members-list members--small sm-pull-reset col-md-5">
            <Jumbotron />
            <Search action={"/members"} searchMembers={this._fetchMembers} fetchMembers={this._fetchMembers} />
          </div>
          <Loader loaded={this.state.loaded} className="p-b-100">
            {this.state.loaded && this.state.members.length > 0 ?
              <List className="col-md-7 pull-right" style={containerStyle}>
              <div className="list--header">
                <h2 style={subHeaderStyles}>
                  {this.state.featured? 'Featured members' : 'Search result'}
                </h2>
                <Toggle name="hireable" label="Only hireables" defaultToggled={this.state.hireable}
               style={checkboxStyles}
               onToggle={this._fetchHireables} />
              </div>
              {this.state.members.map(member => (
                <Member member={member} key={member.id} meta={this.props.meta} />
              ))}
              {this.state.rels != null && this.state.members.length > 0 ?
                <Pagination links={this.state.rels} fetchNextPage={this._fetchMembers} />
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

    this._fetchMembers(path, !this.state.hireable ? {hireable: !this.state.hireable} : {});
  },

  _fetchMembers(path, params) {
    // Set state to be loading
    this.setState({loaded: false});

    // Setup cache false
    $.ajaxSetup({
      cache: false
    });

    // Get initial members
    $.post(path, params, function(json, textStatus) {
      this.setState({
        members: json.members,
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

module.exports = MembersList;
