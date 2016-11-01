/* global Turbolinks Routes */

import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Card,
  CardActions,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import ActionContentMail from 'material-ui/svg-icons/content/mail';
import muiTheme from './theme.es6';

const iconStyles = {
  marginRight: '10px',
  verticalAlign: 'middle',
};

const listStyles = {
  marginBottom: 10,
  display: 'block',
};

const cardTitleStyle = {
  padding: '8px 16px 8px',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #d8d8d8',
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state = { open: false };
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="container">
          <section className="split-home">
            <Card
              className="hero-card"
              style={{ border: '1px solid #d8d8d8' }}
            >
              <CardTitle
                title="Developers"
                style={cardTitleStyle}
                titleStyle={{
                  color: '#333',
                  fontSize: 18,
                  fontWeight: 500,
                }}
              />

              <CardText style={{ padding: '16px 16px 0', fontSize: 16 }}>
                <p style={{ marginTop: '0px', fontWeight: '500' }}>
                  Receive high quality job offers from vetted recruiters.
                </p>
                <ul style={{ padding: 0, marginBottom: 0, listStyle: 'none' }}>
                  <li style={listStyles}>
                    <ActionCheckCircle style={iconStyles} color="#66bb6a" />
                    Signup with Github to create an extended profile
                  </li>
                  <li style={listStyles}>
                    <ActionCheckCircle style={iconStyles} color="#66bb6a" />
                    Update your experiences and job preferences.
                  </li>
                  <li style={listStyles}>
                    <ActionCheckCircle style={iconStyles} color="#66bb6a" />
                    Receive high quality job offers.
                  </li>
                  <li style={listStyles}>
                    <ActionCheckCircle style={iconStyles} color="#66bb6a" />
                    Be in control.
                  </li>
                </ul>
              </CardText>

              <CardActions style={{ padding: '8px 16px 10px' }}>
                <RaisedButton
                  label="Signup"
                  icon={<FontIcon className="muidocs-icon-custom-github" />}
                  primary
                  onClick={
                    () => Turbolinks.visit(
                      Routes.developer_github_omniauth_authorize_path()
                    )
                  }
                />
              </CardActions>
            </Card>

            <Card className="hero-card">
              <CardTitle
                title="Employers and Recruiters"
                style={cardTitleStyle}
                titleStyle={{
                  color: '#333',
                  fontSize: 18,
                  fontWeight: 500,
                }}
              />
              <CardText style={{ padding: '16px 16px 0', fontSize: 16 }}>
                <p style={{ marginTop: 0, fontWeight: '500' }}>
                  Search hireable developers from around the world.
                </p>
                <ul style={{ padding: 0, marginBottom: 0, listStyle: 'none' }}>
                  <li style={listStyles}>
                    <ActionCheckCircle style={iconStyles} color="#66bb6a" />
                    Signup with email to create a profile.
                  </li>
                  <li style={listStyles}>
                    <ActionCheckCircle style={iconStyles} color="#66bb6a" />
                    Search Github and extended profiles from one place.
                  </li>
                  <li style={listStyles}>
                    <ActionCheckCircle style={iconStyles} color="#66bb6a" />
                    See experiences and job preferences upfront.
                  </li>
                  <li style={listStyles}>
                    <ActionCheckCircle style={iconStyles} color="#66bb6a" />
                    Reach out to Hireables with your offer.
                  </li>
                </ul>
              </CardText>

              <CardActions style={{ padding: '8px 16px 10px' }}>
                <RaisedButton
                  label="Signup"
                  icon={<ActionContentMail color="white" />}
                  onClick={() => Turbolinks.visit(Routes.new_recruiter_registration_path())}
                  primary
                />
              </CardActions>
            </Card>
          </section>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Home;
