/* global Turbolinks Routes */
import React from 'react';
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentArchieve from 'material-ui/svg-icons/content/archive';
import ContentSend from 'material-ui/svg-icons/content/send';

const Folders = () => (
  <List>
    <ListItem
      primaryText="Inbox"
      style={{ color: '#fff' }}
      onClick={() => Turbolinks.visit(Routes.mailbox_path('inbox'))}
      leftIcon={<ContentInbox color="white" />}
    />
    <ListItem
      primaryText="Sent mail"
      style={{ color: '#fff' }}
      onClick={() => Turbolinks.visit(Routes.mailbox_path('sentbox'))}
      leftIcon={<ContentSend color="white" />}
    />
    <ListItem
      primaryText="Drafts"
      style={{ color: '#fff' }}
      onClick={() => Turbolinks.visit(Routes.mailbox_path('drafts'))}
      leftIcon={<ContentDrafts color="white" />}
    />
    <ListItem
      primaryText="Trash"
      style={{ color: '#fff' }}
      onClick={() => Turbolinks.visit(Routes.mailbox_path('trash'))}
      leftIcon={<ContentArchieve color="white" />}
    />
  </List>
);

export default Folders;
