import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { darkBlack } from 'material-ui/styles/colors';

class Conversation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { conversation } = this.props;
    return (
      <ListItem
        leftAvatar={<Avatar src="images/ok-128.jpg" />}
        primaryText="Brunch this weekend?"
        secondaryText={
          <p>
            <span style={{ color: darkBlack }}>Brendan Lim</span> --
            {conversation.excerpt}
          </p>
        }
        secondaryTextLines={2}
      />
    );
  }
}

Conversation.propTypes = {
  conversation: React.PropTypes.object,
};

export default Conversation;
