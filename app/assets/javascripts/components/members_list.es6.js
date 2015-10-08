// Require React
React = require('react/addons');
var $ = require('jquery-browserify');
var Loader = require('react-loader');

// import material UI
import mui from 'material-ui';
let List = mui.List;
let Colors = mui.Styles.Colors;
let Checkbox = mui.Checkbox;

// Dependent component
import Member from './member.es6.js'
import NoContent from './no_content.es6.js'
import Pagination from './pagination.es6.js'

// Define component
const MembersList = React.createClass({

  getInitialState () {
    return {
      members: [],
      loaded: false,
      counter: 1
    };
  },

  componentDidMount() {
    setTimeout(function(){
      this._fetchMembers(this.props.id, {hireable: false});
    }.bind(this), 100);
  },

  setChecked(e, checked) {
    this.setState({loaded: false});
    this._fetchMembers(this.props.id, {hireable: checked});
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
        <div className="members-list">
          <List subheader="Members" subheaderStyle={subHeaderStyles} className="container" style={containerStyle}>
            <Checkbox
              name="hireable"
              style={checkboxStyles}
              value="false"
              onCheck={this.setChecked}
              label="Find all hireables"/>
            <Loader loaded={this.state.loaded}>
              {this.state.members.map(member => (
                <Member member={member} key={member.id} meta={this.props.meta} />
              ))}
            </Loader>
          </List>

          {this.state.links? <Pagination links={this.state.links} loadNext={this._loadNext} loadPrev={this._loadPrev} /> : <NoContent />}
        </div>
    );
  },

  _loadNext() {
    this.setState({counter: this.state.counter + 1, loaded: false});
    this._fetchMembers(this.props.id, {page: this.state.counter + 1});
  },

  _loadPrev() {
    this.setState({counter: this.state.counter - 1, loaded: false});
    this._fetchMembers(this.props.id, {page: this.state.counter - 1});
  },

  _fetchMembers(id, params) {
    $.ajaxSetup({
      cache: false
    });
    $.getJSON('/organizations/' + id + '/members', params, function(json, textStatus) {
      this.setState({
        members: JSON.parse(json.members),
        links: JSON.parse(json.links),
        loaded: true
      });
    }.bind(this));
  }


});

module.exports = MembersList;
