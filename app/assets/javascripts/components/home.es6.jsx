import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  Card,
  CardActions,
  CardTitle,
  CardText,
} from 'material-ui/Card';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#6986BD',
    accent1Color: '#6986BD',
  },
});

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
                  <Card className="card">
                    <CardTitle
                      title="For Developers"
                      style={{ padding: '16px 16px 8px' }}
                      titleStyle={{
                        color: '#6F879A',
                        borderBottom: '1px solid #6F879A',
                      }}
                    />

                    <CardText style={{ padding: '8px 16px', fontSize: '16px' }}>
                      <p style={{ marginTop: '0px' }}>
                        Create a free premium profile to receive high quality
                        job offers from vetted recruiters.
                      </p>
                      <p style={{ marginBottom: '0px' }}>
                        Control and set amount of job offers you want to receive
                        per week and opt-out anytime.
                      </p>
                    </CardText>

                    <CardActions style={{ padding: '8px 16px' }}>
                      <RaisedButton label="Login with Github" primary />
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
                  <Card className="card" style={{ backgroundColor: '#F2F2F2' }}>
                    <CardTitle
                      title="For Recruiters"
                      style={{ padding: '16px 16px 8px' }}
                      titleStyle={{
                        color: '#6F879A',
                        borderBottom: '1px solid #6F879A',
                      }}
                    />

                    <CardText style={{ padding: '8px 16px', fontSize: '16px' }}>
                      <p style={{ marginTop: '0px' }}>
                        Search, filter and email hireable talents from around the world
                        that are looking for their next opportunity.
                      </p>
                      <p style={{ marginBottom: '0px' }}>
                        See salary requirements, work preferences and experiences
                        upfront so you save time.
                      </p>
                    </CardText>

                    <CardActions style={{ padding: '8px 16px' }}>
                      <RaisedButton label="Login with your email" primary />
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
