/* global $ Routes Turbolinks window */

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {
  Card,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import muiTheme from '../theme.es6';

const cardTitleStyle = {
  padding: '8px 16px 8px',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #d8d8d8',
};

const DeveloperLogin = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Card className="card small">
      <CardTitle
        title="Developer Login"
        style={cardTitleStyle}
        titleStyle={{
          color: '#333',
          fontSize: 18,
          fontWeight: 500,
        }}
      />
      <CardText style={{ fontSize: 16, textAlign: 'center', padding: '50px 0' }}>
        <RaisedButton
          label="Login with github"
          icon={<FontIcon className="muidocs-icon-custom-github" />}
          onClick={() => Turbolinks.visit(Routes.new_developer_session_path())}
          primary
        />
        <div className="login-disclaimer" style={{ marginTop: 10 }}>
          <small className="login-disclaimer-text">
            We will fetch your email and access token
          </small>
        </div>
      </CardText>
    </Card>
  </MuiThemeProvider>
);

export default DeveloperLogin;
