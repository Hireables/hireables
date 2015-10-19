// Require React
React = require('react/addons');
var classNames = require('classnames');

// Material UI
import mui from 'material-ui';
let Colors = mui.Styles.Colors;

// Define component
const Languages= React.createClass({

  render() {

    let badgeStyles = {
      fontSize: '10px',
      lineHeight: '22px',
      backgroundColor: Colors.blue600,
      padding: '5px 8px',
      marginRight: '5px',
      color: Colors.white,
      overflow: 'hidden',
      borderRadius: 2
    }

    return (
        <div style={{marginTop: '10px'}}>
          <span>

            {this.props.languages ? this.props.languages.map(language => (
              <span key={Math.random()} style={badgeStyles}>{language}</span>
            )) : ""}
          </span>
        </div>
      );
  },
});

module.exports = Languages;
