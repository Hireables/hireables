import React, { Component } from 'react';
import Message from './message.es6';

class Messages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="messages">
        {this.props.conversation.messages.edges.map(({ node }) => (
          <Message message={node} key={node.id} />
        ))}
      </div>
    );
  }
}

Messages.propTypes = {
  conversation: React.PropTypes.object,
};

export default Messages;
