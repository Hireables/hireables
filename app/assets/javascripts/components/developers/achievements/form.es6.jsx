// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import RichEditor from '../../shared/richEditor.es6';

class AchievementForm extends Component {
  constructor(props) {
    super(props);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      canSubmit: false,
      editing: false,
    };
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

  submit(event) {
    event.preventDefault();
    this.props.update(this.props.achievement, Object.assign(
      {
        description: this.editorNode.state.value.toString('html'),
      }, this.formNode.getModel(),
    )).then(() => {
      this.props.edit();
    });
  }

  render() {
    const { achievement } = this.props;

    return (
      <Formsy.Form
        autoComplete="off"
        className="form"
        ref={node => (this.formNode = node)}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
      >
        <FormsyText
          id="title"
          placeholder="(ex: Opensourced autocomplete library)"
          autoFocus
          name="title"
          fullWidth
          defaultValue={achievement.title}
          updateImmediately
          required
          validations={{
            minLength: 5,
            maxLength: 100,
          }}
          validationErrors={{
            minLength: 'Title should be minimum 5 characters',
            maxLength: 'Title should be minimum 100 characters',
          }}
        />

        <RichEditor
          ref={node => (this.editorNode = node)}
          placeholder="(ex: Published library for node.js)"
          content={achievement.description}
        />

        <RaisedButton
          label="Update"
          primary
          type="submit"
          style={{ marginTop: 20 }}
          onClick={this.submit}
          disabled={!this.state.canSubmit}
        />
      </Formsy.Form>
    );
  }
}

AchievementForm.propTypes = {
  achievement: React.PropTypes.object,
  update: React.PropTypes.func,
  edit: React.PropTypes.func,
};

const AchievementFormContainer = Relay.createContainer(AchievementForm, {
  fragments: {
    achievement: () => Relay.QL`
      fragment on Achievement {
        id,
        title,
        description,
      }
    `,
  },
});

export default AchievementFormContainer;
