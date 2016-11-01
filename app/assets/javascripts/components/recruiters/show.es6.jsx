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
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionCamera from 'material-ui/svg-icons/image/camera-alt';
import FileUpload from '../../mutations/recruiter/fileUpload.es6';
import muiTheme from '../theme.es6';

class RecruiterShow extends Component {
  constructor(props) {
    super(props);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.uploadAvatar = this.uploadAvatar.bind(this);
  }

  openFileDialog(event) {
    event.preventDefault();
    this.fileNode.click();
  }

  uploadAvatar() {
    const { recruiter } = this.props;
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
      id: recruiter.id,
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

    const { recruiter } = this.props;
    const bio = createDOMPurify.sanitize(
      recruiter.bio,
      { ALLOWED_TAGS: ['b', 'i'] }
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="recruiters-show">
          <header className="header header--bg">
            <div className="container">
              <div style={wrapperStyle}>
                <div
                  className="avatar"
                  style={{
                    width: 100,
                    margin: '0 auto',
                  }}
                >
                  <Avatar src={recruiter.avatar_url} size={100} />
                  <IconButton
                    onClick={this.openFileDialog}
                  >
                    <ActionCamera />
                  </IconButton>
                  <input
                    type="file"
                    ref={node => (this.fileNode = node)}
                    style={{ display: 'none' }}
                    onChange={this.uploadAvatar}
                  />
                </div>

                <h1 className="no-margin">
                  <a href={Routes.recruiter_path(recruiter.login)} style={linkStyles}>
                    {recruiter.name}
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
                    <small>Based in {recruiter.location}</small>
                  </span>
                </div>

                <div className="company" style={{ marginTop: '5px' }}>
                  <span style={{ color: '#333', fontWeight: '400' }}>
                    <small>Works at {recruiter.company}</small>
                  </span>
                </div>

                {recruiter.website ?
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
                      href={recruiter.website}
                    >
                      Website
                    </a>
                  </div> : ''
                }

                {this.props.can_edit ?
                  <RaisedButton
                    label="Edit"
                    secondary
                    icon={<ActionEdit />}
                    className="edit-link"
                    style={{ marginTop: 10 }}
                    href={Routes.edit_recruiter_registration_path()}
                  /> : ''
                }

                {this.props.can_edit ?
                  <RaisedButton
                    label="Delete"
                    primary
                    icon={<ActionDelete />}
                    data-method="delete"
                    data-confirm="This will completely delete your account. Okay?"
                    className="edit-link"
                    style={{ marginTop: 20, marginLeft: 10 }}
                    href={Routes.cancel_recruiter_registration_path()}
                  /> : ''
                }
              </div>
            </div>
          </header>
        </div>
      </MuiThemeProvider>
    );
  }
}

RecruiterShow.propTypes = {
  recruiter: React.PropTypes.object,
  can_edit: React.PropTypes.bool,
};

const RecruiterShowContainer = Relay.createContainer(RecruiterShow, {
  fragments: {
    recruiter: () => Relay.QL`
      fragment on Recruiter {
        id,
        login,
        name,
        bio,
        avatar_url,
        website,
        company,
        location,
      }
    `,
  },
});

export default RecruiterShowContainer;
