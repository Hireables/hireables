import React, { Component } from 'react';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';

class Composer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="composor">
        <Formsy.Form
          onValid={this.enableButton}
          autoComplete="off"
          className="form"
          ref={node => (this.formNode = node)}
          onInvalid={this.disableButton}
        >
          <div className="field bio">
            <FormsyText
              id="text-field-default"
              placeholder="(ex: Looking for opportunities in AI)"
              autoFocus
              name="bio"
              fullWidth
              multiLine
              floatingLabelText="What are you looking for *"
              floatingLabelFixed
              updateImmediately
              required
              validations={{
                minLength: 50,
              }}
              validationErrors={{
                minLength: 'Bio should be minimum 50 characters',
              }}
            />
          </div>
        </Formsy.Form>
      </div>
    );
  }
}

Composer.propTypes = {
  conversation: React.PropTypes.object,
};

export default Composer;
