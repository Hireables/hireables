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
  const { response, source } = props;
  let errorMessage;

  if (response) {
    errorMessage = response.statusText;
  } else if (source && source.errors && Array.isArray(source.errors)) {
    errorMessage = source.errors[0].message;
  } else if (source && source.message) {
    errorMessage = source.message;
  } else {
    errorMessage = 'Something went wrong!';
  }

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className="overlay">
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
  source: React.PropTypes.object,
  response: React.PropTypes.object,
};

export default ErrorComponent;
