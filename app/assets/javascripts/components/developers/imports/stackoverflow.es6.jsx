/* global Routes $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'dialog-polyfill/dialog-polyfill.css';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import update from 'immutability-helper';
import Snackbar from 'material-ui/Snackbar';
import createDOMPurify from 'dompurify';

// Util
import muiTheme from '../../theme.es6';

// Stylesheet
import '../../styles/popup.sass';

class StackOverflow extends Component {
  constructor(props) {
    super(props);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.savePinnedAnswers = this.savePinnedAnswers.bind(this);
    this.state = { selections: [], open: false };
  }

  selectAnswer(event, answer) {
    const { connection } = this.props;
    const importContainer = `#import-container-${connection.provider}`;
    const uncheckedBoxes = $(importContainer).find('input:checkbox:not(:checked)');
    const index = this.state.selections.indexOf(answer.id);
    $(event.target).closest('.list-item').toggleClass('pinned');

    if (index === -1) {
      this.setState({
        selections: update(this.state.selections, { $push: [answer.id] }),
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

  savePinnedAnswers(event) {
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
    const sanitizeBody = (body) => {
      return createDOMPurify.sanitize(
        body,
        { ALLOWED_TAGS: ['code', 'i', 'i'] }
      );
    };

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="import-container">
          <div className="content">
            <List style={{ paddingBottom: 0, paddingTop: 0 }}>
              {connection.answers.edges.map(({ node }) => (
                <ListItem
                  key={node.id}
                  className={`list-item ${node.pinned ? 'pinned' : ''}`}
                  leftCheckbox={
                    <Checkbox
                      disabled={this.state.disabled}
                      style={{ top: 'calc(100% / 3)' }}
                      onCheck={event => this.selectAnswer(event, node)}
                    />
                  }
                  rightIcon={
                    <div
                      style={{
                        right: 20,
                        top: 20,
                        display: 'flex',
                        lineHeight: '30px',
                        justifyContent: 'space-between',
                        color: '#777',
                      }}
                    >
                      {node.up_vote_count}
                      <FontIcon
                        color="#777"
                        style={{
                          marginLeft: 5,
                        }}
                        className="material-icons"
                      >
                        thumb_up
                      </FontIcon>
                    </div>
                  }

                  primaryText={node.title}
                  secondaryText={
                    <span
                      className="description"
                      style={{ maxWidth: '80%' }}
                      dangerouslySetInnerHTML={{ __html: sanitizeBody(node.body) }}
                    />
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
              label="Save pinned answers"
              primary
              className="pull-right"
              type="submit"
              onClick={this.savePinnedAnswers}
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

StackOverflow.propTypes = {
  connection: React.PropTypes.object,
};

const StackOverflowContainer = Relay.createContainer(
  StackOverflow, {
    initialVariables: {
      first: 10,
    },
    fragments: {
      connection: () => Relay.QL`
        fragment on Connection {
          id,
          provider,
          answers(first: $first) {
            edges {
              node {
                id,
                title,
                body,
                pinned,
                up_vote_count,
              }
            }
          }
        }
      `,
    },
  }
);

export default StackOverflowContainer;
