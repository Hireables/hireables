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
    const containerStyle = {
      paddingTop: '0px',
      paddingBottom: '0px',
      borderRight: '1px solid #f2f2f2',
      boxShadow: '0 0 16px 0 rgba(63,67,69,0.3)',
      margin: '40px 0px',
    };

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="developers-list wrapper">
          <div className="container">
            <div className="developers-list developers--small sm-pull-reset col-md-5">
              <Card style={{ marginBottom: '20px' }}>
                <CardTitle
                  title="Developer"
                  subtitle="Signup to setup a premium profile"
                  titleColor="rgba(0, 0, 0, 0.54118)"
                />

                <CardText style={{ padding: '8px 16px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </CardText>

                <CardActions style={{ padding: '8px 16px' }}>
                  <RaisedButton label="Signup" primary />
                </CardActions>
              </Card>

              <Card style={{ marginBottom: '20px' }}>
                <CardTitle
                  titleColor="rgba(0, 0, 0, 0.54118)"
                  title="Recruiter"
                  subtitle="Signup to search premium developers"
                />

                <CardText style={{ padding: '8px 16px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </CardText>

                <CardActions style={{ padding: '8px 16px' }}>
                  <RaisedButton label="Signup" primary />
                </CardActions>
              </Card>
            </div>
            <h1 style={containerStyle}>Show some text</h1>
            <Snackbar
              open={this.state.open}
              ref="snackbar_404"
              message="Ohh no! Request failed! Make sure you are using right parameters"
              action="error"
              onRequestClose={this.handleRequestClose}
              autoHideDuration={5000}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Home;
