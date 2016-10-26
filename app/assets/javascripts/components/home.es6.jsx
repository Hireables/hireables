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
        <section className="split-home">
          <section className="left-section">
            <div className="hero-section">
              <div className="hero-content">
                <div className="developer">
                  <Card className="hero-card">
                    <CardTitle
                      title="For Developers"
                      style={{ padding: '16px 16px 8px' }}
                      titleStyle={{
                        color: '#6F879A',
                        borderBottom: '1px solid #6F879A',
                      }}
                    />

                    <CardText style={{ padding: '8px 16px', fontSize: '16px' }}>
                      <p style={{ marginTop: '0px', fontWeight: '500' }}>
                        Receive high quality job offers from vetted recruiters.
                      </p>
                      <ul style={{ padding: 0, marginBottom: '0px', listStyle: 'none' }}>
                        <li style={listStyles}>
                          <ActionCheckCircle style={iconStyles} color="#66bb6a" />
                          Signup with Github.
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
                          Unsubscribe anytime.
                        </li>
                      </ul>
                    </CardText>

                    <CardActions style={{ padding: '0 16px 10px' }}>
                      <RaisedButton
                        label="Signup"
                        icon={<FontIcon className="muidocs-icon-custom-github" />}
                        onClick={() => Turbolinks.visit(Routes.new_developer_session_path())}
                        primary
                      />
                    </CardActions>
                  </Card>
                </div>
              </div>
            </div>
          </section>
          <section className="right-section">
            <div className="hero-section">
              <div className="hero-content">
                <div className="recruiter">
                  <Card className="hero-card">
                    <CardTitle
                      title="For Recruiters"
                      style={{ padding: '16px 16px 8px' }}
                      titleStyle={{
                        color: '#6F879A',
                        borderBottom: '1px solid #6F879A',
                      }}
                    />
                    <CardText style={{ padding: '8px 16px', fontSize: '16px' }}>
                      <p style={{ marginTop: '0px', fontWeight: '500' }}>
                        Search hireable developers from around the world.
                      </p>
                      <ul style={{ padding: 0, marginBottom: '0px', listStyle: 'none' }}>
                        <li style={listStyles}>
                          <ActionCheckCircle style={iconStyles} color="#66bb6a" />
                          Signup with email.
                        </li>
                        <li style={listStyles}>
                          <ActionCheckCircle style={iconStyles} color="#66bb6a" />
                          Search Github and Premium profiles from one place.
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

                    <CardActions style={{ padding: '0 16px 10px' }}>
                      <RaisedButton
                        label="Signup"
                        icon={<ActionContentMail color="white" />}
                        onClick={() => Turbolinks.visit(Routes.new_recruiter_registration_path())}
                        primary
                      />
                    </CardActions>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </section>
      </MuiThemeProvider>
    );
  }
}

export default Home;
