// Require React
React = require('react/addons');
var Loader = require('react-loader');

// import material UI
import mui from 'material-ui';
let List = mui.List;
let Colors = mui.Styles.Colors;
let ThemeManager = mui.Styles.ThemeManager;
let LightRawTheme = mui.Styles.LightRawTheme;

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
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  componentDidMount() {
    if(this.isMounted()){
      this._fetchMembers(this.state.path, {});
    }
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  render() {

    let containerStyle = {
      paddingTop: '50px'
    };

    let subHeaderStyles = {
      fontSize: '25px',
      marginBottom: '20px',
      padding: '0',
      display: 'inline-block',
      marginRight: '30px'
    };

    let checkboxStyles = {
      display: 'inline-block',
      width: 'auto',
      marginRight: '20px',
      marginTop: '5px',
      height: '20px',
      width: '50%'
    };

    return (
      <div className="members-list p-b-100">
        <div className="container">
          <div className="members-list members--small sm-pull-reset">
            <Search action={"/members"} searchMembers={this._fetchMembers} />
          </div>
        </div>
        <Loader loaded={this.state.loaded}>
          {this.state.loaded && this.state.members.length > 0 ?
            <List subheader={this.state.featured? 'Featured members' : 'Result'} subheaderStyle={subHeaderStyles} className="container" style={containerStyle}>
            {this.state.members.map(member => (
              <Member member={member} key={member.id} meta={this.props.meta} />
            ))}
          </List> : <EmptyList />}
          {this.state.rels != null && this.state.members.length > 0 ?
            <Pagination links={this.state.rels} fetchNextPage={this._fetchMembers} />
            : <NoContent />
          }
        </Loader>
      </div>
    );
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

      // Pre fetch paginations
      if(json.rels != null) {
        setTimeout(function(){
          json.rels.map(function(link) {
            $.get('?' + decodeURIComponent(link.url), function(data) {
            }, "html");
          }.bind(this));
        }.bind(this), 1000);
      }

    }.bind(this), "json");
  }

});

module.exports = MembersList;
