/* global Routes $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import 'dialog-polyfill/dialog-polyfill.css';
import Checkbox from 'material-ui/Checkbox';
import update from 'immutability-helper';

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
    this.selectRepo = this.selectRepo.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.selections = [];
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

  selectRepo(event, repo) {
    $(event.target).closest('.source-item').toggleClass('pinned');
    if (this.selections.indexOf(repo.id) === -1) {
      update(this.selections, { $push: [repo.id] });
    } else {
      update(this.selections, { $splice: [repo.id] });
    }

    console.log(this.selections);
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
            <h3 className="header-top-title">Pin Top Github Repos </h3>
            Connect to import and pin your top github repos.
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
                <ListItem
                  key={node.id}
                  className={`source-item ${node.pinned ? 'pinned' : ''}`}
                  leftCheckbox={
                    <Checkbox
                      style={{ top: 'calc(100% / 3)' }}
                      onCheck={event => this.selectRepo(event, node)}
                    />
                  }
                  rightIcon={
                    <div
                      style={{
                        right: 20,
                        top: 20,
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: '#777',
                      }}
                    >
                      {node.stargazers_count}
                      <FontIcon
                        color="#777"
                        className="material-icons"
                      >
                        star
                      </FontIcon>
                    </div>
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
      first: 50,
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
                pinned,
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
