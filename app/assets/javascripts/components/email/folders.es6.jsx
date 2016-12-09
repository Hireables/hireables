/* global Turbolinks Routes window */

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
      className={
        `folder ${Routes.mailbox_path('inbox') === window.location.pathname ? 'active' : ''}`
      }
      onClick={() => Turbolinks.visit(Routes.mailbox_path('inbox'))}
      leftIcon={<ContentInbox />}
    />
    <ListItem
      primaryText="Sent mail"
      className={
        `folder ${Routes.mailbox_path('sentbox') === window.location.pathname ? 'active' : ''}`
      }
      onClick={() => Turbolinks.visit(Routes.mailbox_path('sentbox'))}
      leftIcon={<ContentSend />}
    />
    <ListItem
      primaryText="Drafts"
      className={
        `folder ${Routes.mailbox_path('drafts') === window.location.pathname ? 'active' : ''}`
      }
      onClick={() => Turbolinks.visit(Routes.mailbox_path('drafts'))}
      leftIcon={<ContentDrafts />}
    />
    <ListItem
      primaryText="Trash"
      className={
        `folder ${Routes.mailbox_path('trash') === window.location.pathname ? 'active' : ''}`
      }
      onClick={() => Turbolinks.visit(Routes.mailbox_path('trash'))}
      leftIcon={<ContentArchieve />}
    />
  </List>
);

export default Folders;
