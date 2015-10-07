// Require React
React = require('react/addons');
var $ = require('jquery-browserify');
// import material UI
import mui from 'material-ui';
let List = mui.List;
let Colors = mui.Styles.Colors;
// Dependent component
import Member from './member.es6.js'
import Search from './search.es6.js'

// Define component
const MembersList = React.createClass({

  getInitialState () {
    return {
      members: []
    };
  },

  componentDidMount() {
    if(this.isMounted()) {
      this._fetchMembers(this.props.id);
    }
  },

  render() {

    let containerStyle = {
      paddingTop: '50px'
    };

    let subHeaderStyles = {
      fontSize: '25px',
      marginBottom: '20px',
      padding: '0'
    };

    return (
        <div className="members-list">
          <div className="container">
            <div className="members-list members--small">
              <Search action={"/organizations/" + this.props.id + "/members"} />
            </div>
          </div>
          <List subheader="Members" subheaderStyle={subHeaderStyles} className="container" style={containerStyle}>
            {this.state.members.map(member => (
              <Member member={member} key={member.id} />
            ))}
          </List>
        </div>
    );
  },

  _fetchMembers(id) {
    $.ajaxSetup({
      cache: false
    });
    $.getJSON('/organizations/' + id + '/members', function(json, textStatus) {
      this.setState({
        members: json
      });
    }.bind(this));
  }


});

module.exports = MembersList;
