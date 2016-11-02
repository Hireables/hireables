import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#5b98e0',
    accent1Color: '#5b98e0',
  },
  toolbar: {
    backgroundColor: '#5b98e0',
    color: '#fff',
  },

  appBar: {
    backgroundColor: '#5b98e0',
  },

  raisedButton: {
    secondaryColor: '#c9302c',
    color: 'white',
    secondaryTextColor: 'white',
  },
});

export default muiTheme;
