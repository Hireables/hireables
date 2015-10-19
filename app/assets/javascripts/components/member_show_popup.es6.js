// Require React
React = require('react/addons');

// import material UI
import mui from 'material-ui';
let Dialog = mui.Dialog;
let FlatButton = mui.FlatButton;

// Dependent component
import MemberShow from './member_show.es6.js'

// Define component
const MemberShowPopup = React.createClass({

  getInitialState() {
      return {
        modal: false
      }
  },

  render() {

    let dialogStyles = {
      padding: '0px'
    }

    let contentStyles = {
      paddingTop: '5%'
    }

    return (
      <Dialog bodyStyle={dialogStyles} contentStyle={contentStyles}
          openImmediately={true}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
          modal={this.state.modal}>
          <MemberShow member={this.props.member} languages={this.props.languages} />
      </Dialog>
    );
  }

});

module.exports = MemberShowPopup;
