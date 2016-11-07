/* global Routes */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import 'dialog-polyfill/dialog-polyfill.css';

// Util
import muiTheme from '../../theme.es6';
import Dialog from '../../../utils/dialog.es6';

// Stylesheet
import '../../styles/popup.sass';

class Github extends Component {
  constructor(props) {
    super(props);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.dialog = new Dialog({
      reactNodeId: 'popups-container',
      dialogId: this.popupNode.id,
    });

    this.dialog.toggle();
    this.dialog.get().classList.add('pulse');
    setTimeout(() => {
      this.dialog.get().classList.remove('pulse');
    }, 300);
  }

  submitForm(event) {
    event.preventDefault();
    // const platforms = this.state.platforms.map(elem => (
    //   elem.label
    // ));

    // this.setNotification('Saving...');

    // const onFailure = (transaction) => {
    //   const error = transaction.getError() || new Error('Mutation failed.');
    //   let errorMessage;

    //   if (error.source.errors && Array.isArray(error.source.errors)) {
    //     errorMessage = error.source.errors[0].message;
    //   } else {
    //     errorMessage = error.message;
    //   }

    //   this.setNotification(errorMessage);
    // };

    // const onSuccess = () => {
    //   window.location.href = Routes.developer_path(this.props.developer.login);
    // };

    // const newModel = Object.assign(this.formNode.getModel(), {
    //   platforms: platforms.toString(),
    // });

    // Relay.Store.commitUpdate(new UpdateDeveloper({
    //   id: this.props.developer.id,
    //   ...newModel,
    // }), { onFailure, onSuccess });
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  render() {
    const { developer } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <dialog
          id={`developer-profile-${developer.id}`}
          className="popup import"
          ref={node => (this.popupNode = node)}
        >
          <div className="header-top">
            <h3 className="header-top-title">Pin Achievements </h3>
            Connect to import and pin your achievements.
          </div>
          <Avatar
            size={24}
            className="close"
            onClick={() => this.dialog.close()}
            icon={<FontIcon className="material-icons">close</FontIcon>}
          />
          <div className="content">
            <List style={{ paddingBottom: 0, paddingTop: 0 }}>
              {developer.repos.edges.map(({ node }) => (
                <div className="source-item" key={node.id}>
                  <ListItem
                    disabled
                    style={{ lineHeight: '24px' }}
                    leftAvatar={
                      <Avatar
                        icon={<FontIcon className="material-icons">code</FontIcon>}
                      />
                    }
                    rightIconButton={
                      <RaisedButton
                        style={{ top: 30, right: 20 }}
                        primary
                        onClick={this.connectOrImport}
                        label={node.added ? 'Remove' : 'Add'}
                      />
                    }
                    primaryText={node.name}
                    secondaryText={
                      <span
                        className="description"
                        style={{ maxWidth: '70%' }}
                      >
                        {node.description}
                      </span>
                    }
                    secondaryTextLines={2}
                  />
                </div>
              ))}
            </List>
          </div>
        </dialog>
      </MuiThemeProvider>
    );
  }
}

Github.propTypes = {
  developer: React.PropTypes.object,
};

const GithubContainer = Relay.createContainer(
  Github, {
    initialVariables: {
      first: 10,
    },

    fragments: {
      developer: () => Relay.QL`
        fragment on Developer {
          id,
          repos(first: $first) {
            edges {
              node {
                id,
                name,
                full_name,
                description,
                stargazers_count,
                html_url,
                forks_count,
                language,
              }
            }
          }
        }
      `,
    },
  }
);

export default GithubContainer;
