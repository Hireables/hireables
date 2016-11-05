/* global Routes */

import React, { Component } from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { grey700 } from 'material-ui/styles/colors';
import createDOMPurify from 'dompurify';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionEdit from 'material-ui/svg-icons/image/edit';
import ActionCamera from 'material-ui/svg-icons/image/camera-alt';

// Mutations
import FileUpload from '../../mutations/employer/fileUpload.es6';

// Components
import Favourites from './favourites.es6';
import Search from '../search.es6';

// Utils
import muiTheme from '../theme.es6';

class EmployerShow extends Component {
  constructor(props) {
    super(props);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.uploadAvatar = this.uploadAvatar.bind(this);
    this.state = { uploading: false };
  }

  componentDidMount() {
    Search.makeSticky();
  }

  openFileDialog(event) {
    event.preventDefault();
    this.fileNode.click();
  }

  uploadAvatar() {
    const { employer } = this.props;
    this.setState({
      uploading: true,
    });

    const onFailure = (transaction) => {
      const error = transaction.getError() || new Error('Mutation failed.');
      this.setState({
        uploading: false,
      });
    };

    const onSuccess = () => {
      this.setState({
        uploading: false,
      });
    };

    Relay.Store.commitUpdate(new FileUpload({
      id: employer.id,
      file: this.fileNode.files[0],
    }), { onFailure, onSuccess });
  }


  render() {
    const wrapperStyle = {
      paddingTop: '60px',
      paddingBottom: '60px',
      textAlign: 'center',
    };

    const linkStyles = {
      textStyle: 'none',
      textDecoration: 'none',
      color: '#333',
    };

    const bioStyles = {
      fontSize: '14px',
      display: 'block',
      fontWeight: '400',
    };

    const { employer } = this.props;
    const bio = createDOMPurify.sanitize(
      employer.bio,
      { ALLOWED_TAGS: ['b', 'i'] }
    );

    const userBadge = () => {
      const { name } = employer;
      const chunks = name.split(' ');
      return chunks[0][0] + chunks[1][0];
    };

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="employers-show-wrapper">
          <header className="header header--bg">
            <div className="container">
              <div className="employer-profile">
                <div style={wrapperStyle}>
                  <div
                    className="avatar"
                    style={{
                      width: 100,
                      position: 'relative',
                      margin: '0 auto',
                    }}
                  >
                    {employer.avatar_url ?
                      <Avatar
                        src={employer.avatar_url}
                        size={100}
                      /> : <Avatar
                        src={employer.avatar_url}
                        size={100}
                      >{userBadge()}</Avatar>
                    }

                    {this.state.uploading ?
                      'Uploading...' :
                        <IconButton onClick={this.openFileDialog}>
                          <ActionCamera />
                        </IconButton>
                    }
                    <input
                      type="file"
                      ref={node => (this.fileNode = node)}
                      style={{ display: 'none' }}
                      onChange={this.uploadAvatar}
                    />
                  </div>

                  <h1 className="no-margin">
                    <a href={Routes.employer_path(employer.login)} style={linkStyles}>
                      {employer.name}
                    </a>
                  </h1>

                  <div className="bio" style={{ marginTop: '5px' }}>
                    <span
                      style={bioStyles}
                      dangerouslySetInnerHTML={{ __html: bio }}
                    />
                  </div>

                  <div className="location" style={{ marginTop: '5px' }}>
                    <span style={{ color: '#333', fontWeight: '400' }}>
                      <small>Based in {employer.location}</small>
                    </span>
                  </div>

                  <div className="company" style={{ marginTop: '5px' }}>
                    <span style={{ color: '#333', fontWeight: '400' }}>
                      <small>Works at {employer.company}</small>
                    </span>
                  </div>

                  {employer.website ?
                    <div style={{ marginTop: '5px' }}>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: grey700,
                          marginLeft: '10px',
                          paddingBottom: '5px',
                          cursor: 'pointer',
                        }}
                        href={employer.website}
                      >
                        Website
                      </a>
                    </div> : ''
                  }

                  {this.props.can_edit ?
                    <RaisedButton
                      label="Edit"
                      primary
                      icon={<ActionEdit />}
                      className="edit-link"
                      style={{ marginTop: 10 }}
                      href={Routes.edit_employer_registration_path()}
                    /> : ''
                  }
                </div>
              </div>
              <div className="employer-favourites">
                <Favourites employer={employer} />
              </div>
            </div>
          </header>
        </div>
      </MuiThemeProvider>
    );
  }
}

EmployerShow.propTypes = {
  employer: React.PropTypes.object,
  can_edit: React.PropTypes.bool,
};

const EmployerShowContainer = Relay.createContainer(EmployerShow, {
  fragments: {
    employer: () => Relay.QL`
      fragment on Employer {
        id,
        login,
        name,
        bio,
        avatar_url,
        website,
        company,
        location,
        ${Favourites.getFragment('employer')},
      }
    `,
  },
});

export default EmployerShowContainer;
