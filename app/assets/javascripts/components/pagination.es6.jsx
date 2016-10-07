/* global Turbolinks */

import React, { Component } from 'react';
import mui from 'material-ui';

const RaisedButton = mui.RaisedButton;
const ThemeManager = mui.Styles.ThemeManager;
const LightRawTheme = mui.Styles.LightRawTheme;
const Colors = mui.Styles.Colors;

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.muiTheme = ThemeManager.getMuiTheme(LightRawTheme);
    this.loadPage = this.loadPage.bind(this);
  }

  componentWillMount() {
    const newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500,
    });

    this.setState({ muiTheme: newMuiTheme });
  }

  loadPage(link) {
    Turbolinks.visit(`/developers?${decodeURIComponent(link)}`);
  }

  render() {
    return (
      <div className="container">
        <div className="pagination">
          {this.props.links.map(link => (
            <RaisedButton
              key={link.id}
              label={link.label}
              style={{ marginTop: '20px', marginRight: '10px' }}
              primary={true} onClick={this.loadPage(link.url)}
            />
          ))}
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  links: React.PropTypes.shape,
};

export default Pagination;
