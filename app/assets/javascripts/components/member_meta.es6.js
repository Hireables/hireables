// Require React
React = require('react/addons');
import mui from 'material-ui';
let Colors = mui.Styles.Colors;
// Define component
const MemberMeta = React.createClass({

  render() {
    return (
        <ul className="no-style fs-14 hidden-sm" style={{color: Colors.grey600}}>
           <li className="text-center inline m-r-20">
             <span>Followers</span>
             <span className="block m-t-5">{this.props.followers}</span>
           </li>
           <li className="text-center inline m-r-20">
             <span>Gists</span>
             <span className="block m-t-5">{this.props.gists}</span>
           </li>
           <li className="text-center inline m-r-20">
             <span>Repos</span>
             <span className="block m-t-5">{this.props.repos}</span>
           </li>
        </ul>
    );
  },
});

module.exports = MemberMeta;
