/* global $ */

import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import PremiumDeveloperStatus from './premium_developer_status.es6';
import DeveloperMeta from './developer_meta.es6';

const developerStyle = {
  fontWeight: '500',
};

const paragraphStyles = {
  height: 'auto',
};

class PremiumDeveloper extends Component {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus(event) {
    $(event.target).css({
      backgroundColor: '#f2f2f2',
    });
  }

  render() {
    return (
      <div
        style={developerStyle}
        className="developer developer--item premium"
        id={`developer_${this.props.developer.id}`}
      >
        <ListItem
          leftAvatar={<Avatar src={this.props.developer.data.avatar_url} />}
          disabled={true}
          primaryText={this.props.developer.name}
          style={paragraphStyles}
          onKeyboardFocus={this.onFocus}
          rightIconButton={
            <div className="pull-right">
              <DeveloperMeta
                followers={this.props.developer.data.followers}
                gists={this.props.developer.data.public_gists}
                repos={this.props.developer.data.public_repos}
              />
            </div>
          }
          secondaryText={
            <PremiumDeveloperStatus developer={this.props.developer} />
          }
          secondaryTextLines={1}
        />
      </div>
    );
  }
}

PremiumDeveloper.propTypes = {
  developer: React.PropTypes.object,
};

export default PremiumDeveloper;
