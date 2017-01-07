// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import marked from 'marked';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import Languages from '../../../utils/languages.json';

// Child Components icons
import GithubIcon from '../../shared/icons/github.es6';
import { sanitizeRichText } from '../../../utils/sanitize.es6';
import RichEditor from '../../shared/richEditor.es6';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
});

class Github extends Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      editing: false,
      canSubmit: false,
    };
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  edit(event) {
    event.preventDefault();
    this.setState({ editing: !this.state.editing });
  }

  submit(event) {
    event.preventDefault();
    this.props.update(this.props.achievement, Object.assign(
      {
        description: this.editorNode.state.value.toString('html'),
      }, this.formNode.getModel(),
    )).then(() => {
      this.setState({ editing: false });
    });
  }

  render() {
    const { achievement, remove } = this.props;
    const starFields = { pr: 'comments', repo: 'stargazers_count' };
    const count = achievement[starFields[achievement.category]];

    return (
      <div className={`achievement ${achievement.source_name}`}>
        <div className="achievement-block">
          <div className={`achievement-point ${achievement.source_name}`}>
            <GithubIcon />
          </div>

          <div className="achievement-content">
            <Card className="achievement-card full-width">
              <div className="achievement-card-content">
                <h2 className="intro">
                  <i className="icon material-icons">lock_open</i>
                  <span>Open Source</span>
                </h2>

                {achievement.is_owner ?
                  <div className="owner-actions">
                    <IconButton
                      className="remove"
                      tooltip="Remove"
                      tooltipStyles={{ top: 25 }}
                      onClick={event => remove(event, achievement)}
                    >
                      <FontIcon className="material-icons">close</FontIcon>
                    </IconButton>

                    <IconButton
                      className="edit"
                      tooltip="Edit"
                      tooltipStyles={{ top: 25 }}
                      onClick={this.edit}
                    >
                      <FontIcon className="material-icons">mode_edit</FontIcon>
                    </IconButton>
                  </div> : ''
                }

                <time className="date">
                  {
                    moment(achievement.date, 'YYYY-MM-DD HH:mm:ss [UTC]')
                    .format('MMMM Do YYYY')
                    .toString()
                  }
                </time>

                {this.state.editing ?
                  <Formsy.Form
                    autoComplete="off"
                    className="form"
                    ref={node => (this.formNode = node)}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                  >
                    <FormsyText
                      id="title"
                      placeholder="(ex: Opensourced autocomplete library)"
                      autoFocus
                      name="title"
                      fullWidth
                      defaultValue={achievement.title}
                      updateImmediately
                      required
                      validations={{
                        minLength: 10,
                        maxLength: 100,
                      }}
                      validationErrors={{
                        minLength: 'Title should be minimum 10 characters',
                        maxLength: 'Title should be minimum 100 characters',
                      }}
                    />

                    <RichEditor
                      ref={node => (this.editorNode = node)}
                      placeholder="(ex: Published library for node.js)"
                      content={achievement.description}
                    />

                    <RaisedButton
                      label="Update"
                      primary
                      type="submit"
                      style={{ marginTop: 20 }}
                      onClick={this.submit}
                      disabled={!this.state.canSubmit}
                    />
                  </Formsy.Form> :

                  <div className="achievement-content">
                    <CardTitle
                      className="achievement-card-header"
                      title={
                        <div className="title">
                          <a
                            href={achievement.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {achievement.title}
                          </a>
                        </div>
                      }
                    />

                    <CardText
                      className="achievement-card-description"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeRichText(achievement.description),
                      }}
                    />
                  </div>
                }

                <CardActions className="meta">
                  <span className="badge">
                    {achievement.category}
                  </span>

                  {achievement.language ?
                    <span
                      className="badge"
                      style={{
                        backgroundColor: Languages[achievement.language],
                      }}
                    >
                      {achievement.language}
                    </span> : ''
                  }

                  <span className="badge">
                    {`${count}`}
                    <FontIcon
                      color="#fff"
                      className="material-icons"
                      style={{
                        fontSize: 20,
                        verticalAlign: 'top',
                        marginLeft: 5,
                      }}
                    >
                      star
                    </FontIcon>
                  </span>
                </CardActions>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

Github.propTypes = {
  achievement: React.PropTypes.object,
  remove: React.PropTypes.func,
  update: React.PropTypes.func,
};

const GithubContainer = Relay.createContainer(Github, {
  fragments: {
    achievement: () => Relay.QL`
      fragment on Achievement {
        id,
        title,
        description,
        source_name,
        category,
        developer_id,
        import_id,
        language,
        link,
        is_owner,
        comments,
        stargazers_count,
        date,
      }
    `,
  },
});

export default GithubContainer;
