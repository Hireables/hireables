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
        <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
        <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
        <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
        <ListItem primaryText="Trash" leftIcon={<ContentArchieve />} />
      </List>
    );
  }
}

export default Folders;
