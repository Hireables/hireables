// Modules
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AlertError from 'material-ui/svg-icons/alert/error';
import FontIcon from 'material-ui/FontIcon';

// Child Components
import muiTheme from '../theme.es6';

// Error component
const ErrorComponent = (props) => {
  const { response, error } = props;
  let errorMessage;

  if (response) {
    errorMessage = response.statusText;
  } else if (error && error.source && Array.isArray(error.source.errors)) {
    errorMessage = error.source.errors[0].message;
  } else if (error && error.message) {
    errorMessage = error.message;
  } else {
    errorMessage = 'Something went wrong!';
  }

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className={`overlay ${props.cssClass}`}>
        <div className="error">
          <FontIcon style={{ display: 'block' }}>
            <AlertError style={{ width: 50, height: 50 }} color="#c9302c" />
          </FontIcon>
          <p>Request failed: {errorMessage}</p>
          <RaisedButton
            label="Retry"
            style={{ marginTop: 10 }}
            onClick={props.retry}
            primary
          />
        </div>
      </div>
    </MuiThemeProvider>
  );
};

ErrorComponent.propTypes = {
  retry: React.PropTypes.func,
  cssClass: React.PropTypes.string,
  error: React.PropTypes.object,
  response: React.PropTypes.object,
};

export default ErrorComponent;
