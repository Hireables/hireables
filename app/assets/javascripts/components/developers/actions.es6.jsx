// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';

// Mutation
import ToggleFavourite from '../../mutations/developer/toggleFavourite.es6';

class DeveloperActions extends Component {
  constructor(props) {
    super(props);
    this.toggleFavourite = this.toggleFavourite.bind(this);
    this.setNotification = this.setNotification.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state = { notification: '', open: false, saving: false };
  }

  setNotification(notification) {
    this.setState({
      notification,
    }, () => {
      this.setState({ open: true });
    });
  }

  toggleFavourite(event) {
    event.preventDefault();
    this.setState({ saving: true });

    const onFailure = (transaction) => {
      const error = transaction.getError() || new Error('Mutation failed.');
      let errorMessage;

      if (error.source.errors && Array.isArray(error.source.errors)) {
        errorMessage = error.source.errors[0].message;
      } else {
        errorMessage = error.message;
      }

      this.setNotification(errorMessage);
      this.setState({ saving: false });
    };

    const onSuccess = () => {
      this.setState({ saving: false });
    };

    Relay.Store.commitUpdate(new ToggleFavourite({
      id: this.props.developer.id,
      login: this.props.developer.login,
    }), { onFailure, onSuccess });

    event.stopPropagation();
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { developer } = this.props;

    return (
      <div className="actions" style={{ marginTop: 10, textAlign: 'center' }}>
        {developer.favourited ?
          <FlatButton
            icon={<FontIcon className="material-icons">playlist_add_check</FontIcon>}
            label="Saved"
            primary
            type="submit"
            disabled={this.state.saving}
            style={{
              height: 25,
              lineHeight: '25px',
              backgroundColor: '#a4c639',
              color: 'white',
              maxWidth: 95,
            }}
            labelStyle={{ fontSize: 10, fontWeight: 500 }}
            onClick={this.toggleFavourite}
          /> :
            <FlatButton
              icon={<FontIcon className="material-icons">playlist_add</FontIcon>}
              label="Save"
              primary
              disabled={this.state.saving}
              style={{ height: 25, lineHeight: '25px', maxWidth: 95 }}
              type="submit"
              labelStyle={{ fontSize: 10 }}
              onClick={this.toggleFavourite}
            />
        }

        <Snackbar
          open={this.state.open}
          message={this.state.notification}
          autoHideDuration={5000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

DeveloperActions.propTypes = {
  developer: React.PropTypes.object,
};

const DeveloperActionsContainer = Relay.createContainer(DeveloperActions, {
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        id,
        login,
        favourited,
      }
    `,
  },
});

export default DeveloperActionsContainer;
