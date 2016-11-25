import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentArchieve from 'material-ui/svg-icons/content/archive';
import ContentSend from 'material-ui/svg-icons/content/send';

class Folders extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List>
        <ListItem
          primaryText="Inbox"
          style={{ color: '#fff' }}
          leftIcon={<ContentInbox color='white' />}
        />
        <ListItem
          primaryText="Sent mail"
          style={{ color: '#fff' }}
          leftIcon={<ContentSend color='white' />}
        />
        <ListItem
          primaryText="Drafts"
          style={{ color: '#fff' }}
          leftIcon={<ContentDrafts color='white' />}
        />
        <ListItem
          primaryText="Trash"
          style={{ color: '#fff' }}
          leftIcon={<ContentArchieve color='white' />}
        />
      </List>
    );
  }
}

export default Folders;
