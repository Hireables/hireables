import React, { Component } from 'react';
import Folders from './folders.es6';
import Conversations from './conversations.es6';
import Messages from './messages.es6';

class EmailBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="email-box">
        <div className="folders">
          <Folders />
        </div>
        <div className="conversations">
          <Conversations />
        </div>
        <div className="messages">
          <Messages />
        </div>
      </div>
    );
  }
}

export default EmailBox;
