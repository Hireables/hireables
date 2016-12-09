/* global Routes */

import React, { Component } from 'react';
import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import RichEditor from '../shared/richEditor.es6';

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
            <RichEditor />
          </div>

          <div className="clearfix" />
          <div className="actions">
            <RaisedButton
              label="Reply"
              primary
              type="submit"
              onClick={this.submitForm}
            />

            <RaisedButton
              label="Save as draft"
              primary
              type="submit"
              style={{ marginLeft: 10 }}
            />

            <RaisedButton
              secondary
              label="Discard"
              className="pull-right"
              icon={<ActionDelete />}
            />
          </div>
        </Formsy.Form>
      </div>
    );
  }
}

Composer.propTypes = {
  onChange: React.PropTypes.func,
};

export default Composer;
