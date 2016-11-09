/* global Routes $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Checkbox from 'material-ui/Checkbox';
import update from 'immutability-helper';
import Snackbar from 'material-ui/Snackbar';

// Util
import muiTheme from '../../theme.es6';

// Stylesheet
import '../../styles/popup.sass';
import '../../styles/pins.sass';

class Github extends Component {
  constructor(props) {
    super(props);
    this.selectRepo = this.selectRepo.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.savePinnedRepos = this.savePinnedRepos.bind(this);
    this.state = { selections: [], open: false };
  }

  selectRepo(event, repo) {
    const uncheckedBoxes = $('.popup input:checkbox:not(:checked)');
    const index = this.state.selections.indexOf(repo.id);
    $(event.target).closest('.list-item').toggleClass('pinned');

    if (index === -1) {
      this.setState({
        selections: update(this.state.selections, { $push: [repo.id] }),
      }, () => {
        if (this.state.selections.length >= 6) {
          uncheckedBoxes.attr({ disabled: true });
          uncheckedBoxes.closest('.list-item').addClass('disabled');
        }
      });
    } else {
      this.setState({
        selections: update(this.state.selections, { $splice: [[index, 1]] }),
      }, () => {
        uncheckedBoxes.attr({ disabled: false });
        uncheckedBoxes.closest('.list-item').removeClass('disabled');
      });
    }
  }

  savePinnedRepos(event) {
    event.preventDefault();
    // const platforms = this.state.platforms.map(elem => (
    //   elem.label
    // ));

    // this.setNotification('Saving...');

    // const onFailure = (transaction) => {
    //   const error = transaction.getError() || new Error('Mutation failed.');
    //   let errorMessage;

    //   if (error.list.errors && Array.isArray(error.list.errors)) {
    //     errorMessage = error.list.errors[0].message;
    //   } else {
    //     errorMessage = error.message;
    //   }

    //   this.setNotification(errorMessage);
    // };

    // const onSuccess = () => {
    //   window.location.href = Routes.connection_path(this.props.connection.login);
    // };

    // const newModel = Object.assign(this.formNode.getModel(), {
    //   platforms: platforms.toString(),
    // });

    // Relay.Store.commitUpdate(new UpdateDeveloper({
    //   id: this.props.connection.id,
    //   ...newModel,
    // }), { onFailure, onSuccess });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { connection } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="import-container">
          <div className="content">
            <List style={{ paddingBottom: 0, paddingTop: 0 }}>
              {connection.repos.edges.map(({ node }) => (
                <ListItem
                  key={node.id}
                  className={`list-item ${node.pinned ? 'pinned' : ''}`}
                  leftCheckbox={
                    <Checkbox
                      disabled={this.state.disabled}
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
          <div className="actions">
            <span className="notification">
              {6 - this.state.selections.length} remaining
            </span>
            <RaisedButton
              label="Save pinned repos"
              primary
              className="pull-right"
              type="submit"
              onClick={this.savePinnedRepos}
            />
          </div>

          <div className="notifications">
            <Snackbar
              open={this.state.open}
              message="Maximum 6 selections allowed"
              autoHideDuration={5000}
              onRequestClose={this.handleRequestClose}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Github.propTypes = {
  connection: React.PropTypes.object,
};

const GithubContainer = Relay.createContainer(
  Github, {
    initialVariables: {
      first: 10,
    },

    fragments: {
      connection: () => Relay.QL`
        fragment on Connection {
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
