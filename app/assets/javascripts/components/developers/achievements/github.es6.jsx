/* global $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import createDOMPurify from 'dompurify';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment';
import FontIcon from 'material-ui/FontIcon';
import Colors from '../../../utils/colors.json';

// Child Components icons
import GithubIcon from '../../shared/icons/github.es6';

class Github extends Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.delete = this.edit.bind(this);
  }

  edit() {
    this.setState({ editing: true });
    console.log('enable edit form');
  }

  delete() {
    this.setState({ deleting: true });
    console.log('Delete mutation');
  }

  render() {
    const { achievement } = this.props;
    const description = createDOMPurify.sanitize(
      achievement.description,
      { ALLOWED_TAGS: ['b', 'i', 'code'] }
    );

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
                  <span>Open Sourced on </span>
                  <a
                    href={achievement.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
                </h2>

                <time className="date">
                  on {moment.utc(new Date(achievement.created_at)).local().format('MMMM Do YYYY')}
                </time>

                <CardTitle
                  className="achievement-card-header"
                  title={
                    <div className="title">
                      {achievement.name.replace(/[_-]/g, ' ')}
                    </div>
                  }
                />

                <CardText
                  className="achievement-card-description"
                  dangerouslySetInnerHTML={{ __html: description }}
                />

                <CardActions className="meta">
                  <span
                    className="badge"
                    style={{
                      backgroundColor: Colors[achievement.language].color,
                    }}
                  >
                    {achievement.language}
                  </span>

                  <span className="badge">
                    {`${achievement.stargazers_count}`}
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
  relay: React.PropTypes.object,
  achievement: React.PropTypes.object,
};

const GithubContainer = Relay.createContainer(Github, {
  fragments: {
    achievement: () => Relay.QL`
      fragment on Import {
        id,
        name,
        source_name,
        description,
        language,
        html_url,
        stargazers_count,
        pinned,
        created_at,
      }
    `,
  },
});

export default GithubContainer;
