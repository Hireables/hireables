// Require React
React = require('react/addons');
// Material UI
import mui from 'material-ui';
let Colors = mui.Styles.Colors;
// Define component
const EmptyList = React.createClass({

  render() {

    let emptyListStyle = {
      paddingTop: '100px',
      paddingBottom: '60px'
    }

    return (
        <div className="no_content text-center" style={emptyListStyle}>
          <h1 style={{color: Colors.grey500}}>No members found</h1>
        </div>
      );
  },
});

module.exports = EmptyList;
