/* global $ */
import React, { Component } from 'react';
import mui from 'material-ui';
import DeveloperStatus from './developer_status.es6.jsx';
import DeveloperMeta from './developer_meta.es6.jsx';

const ListItem = mui.ListItem;
const Avatar = mui.Avatar;

const developerStyle = {
  fontWeight: '500',
};

const paragraphStyles = {
  height: 'auto',
};

class Developer extends Component {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
  }

  render() {
    return (
      <div
        style={developerStyle}
        className="developer developer--item"
        id={`developer_${this.props.developer.id}`}
      >
        <ListItem
          leftAvatar={<Avatar src={this.props.developer.avatar_url} />}
          disabled={true}
          primaryText={this.props.developer.name}
          style={paragraphStyles}
          rightIconButton={
            <div className="pull-right">
              <DeveloperMeta
                followers={this.props.developer.followers}
                gists={this.props.developer.public_gists}
                repos={this.props.developer.public_repos}
              />
            </div>
          }
          secondaryText={
            <DeveloperStatus developer={this.props.developer} />
          }
          secondaryTextLines={1}
        />
      </div>
    );
  }
}

Developer.propTypes = {
  developer: React.PropTypes.object,
};

export default Developer;
