import React, { Component } from 'react';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Conversation from './conversation.es6';

class Conversations extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List>
        <Subheader>Today</Subheader>
        {this.props.email.conversations.edges.map(({ node }) => (
          <Conversation conversation={node} key={node.id} />
        ))}
        <Divider inset />
      </List>
    );
  }
}

Conversations.propTypes = {
  email: React.PropTypes.object,
};

export default Conversations;
