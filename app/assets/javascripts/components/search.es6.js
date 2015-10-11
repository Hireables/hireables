// Require React
React = require('react/addons');
var $ = require('jquery-browserify')

// Material UI
import mui from 'material-ui';
let RaisedButton = mui.RaisedButton;
let Toolbar = mui.Toolbar;
let ToolbarGroup = mui.ToolbarGroup;
let ToolbarTitle = mui.ToolbarTitle;
let ToolbarSeparator = mui.ToolbarSeparator;
let FontIcon = mui.FontIcon;
let DropDownIcon = mui.DropDownIcon;
let Colors = mui.Styles.Colors;
let TextField = mui.TextField;
let ThemeManager = mui.Styles.ThemeManager;
let LightRawTheme = mui.Styles.LightRawTheme;
let DropDownMenu = mui.DropDownMenu;
let injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

// Define component
const Search = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState () {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      current_filter: 'followers',
      current_filter_placeholder: ">=100 or 1000"
    };
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500
    });
    this.setState({muiTheme: newMuiTheme});
  },

  componentDidMount(){
    this._populateParams();
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  render() {

    let textFieldStyles = {
      marginRight: '20px',
      marginTop: '10px'
    }

    let menuItems = [
       { payload: '1', text: 'followers', placeholder: '>=100 or >1000' },
       { payload: '2', text: 'repos', placeholder: '>= 5 or >10' },
       { payload: '3', text: 'location', placeholder: 'london or france, south america' },
       { payload: '4', text: 'language', placeholder: 'ruby or rust, c++' },
       { payload: '5', text: 'joined', placeholder: '>=2012-04-30 or >2012-04-29' },
    ];

    return (
        <form ref="search" method="GET" action={this.props.action} onKeyDown={this._handleKeyDown}>
          <DropDownMenu menuItems={menuItems} style={{float: 'left'}} onChange={this._filterChanged} />
          <TextField
            hintText={this.state.current_filter_placeholder}
            style={textFieldStyles}
            ref="filters"
            name={this.state.current_filter}
            errorText={this.state.error2Text}
            errorStyle={{color:'orange'}}
            defaultValue="" />
          <TextField
            hintText="Type keyword ex: 'tom' or empty"
            style={textFieldStyles}
            ref="query"
            name="keyword"
            errorText={this.state.error2Text}
            errorStyle={{color:'orange'}}
            defaultValue="" />
          <RaisedButton label="Find" primary={true} onClick={this._handleSubmit} />
        </form>
      );
  },

  _filterChanged(e, select, menuItem) {
    this.setState({current_filter: menuItem.text, current_filter_placeholder: menuItem.placeholder});
  },

  _handleKeyDown(event) {
    if(event.keyCode === 13) {
      this._handleSubmit(event);
    }
  },

  _handleSubmit(event) {
    $(event.target.closest('form')).submit(function() {
      $(':input', this).each(function() {
          this.disabled = !($(this).val());
      });
    });
    $(event.target.closest('form')).submit();
  },

  _populateParams(){
    var query = decodeURIComponent(document.location.search.replace('?', ''));
    //extract each field/value pair
    query = query.split('&');
    //run through each pair
    for (var i = 0; i < query.length; i++) {
      //split up the field/value pair into an array
      var field = query[i].split("=");
      //target the field and assign its value
      $("input[name='" + field[0] + "'], select[name='" + field[0] + "']").val(field[1]);
    }
  }

});

module.exports = Search;
