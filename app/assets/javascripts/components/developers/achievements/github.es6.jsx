/* global $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import createDOMPurify from 'dompurify';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment';
import FontIcon from 'material-ui/FontIcon';

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
              <CardTitle
                className="achievement-card-header"
                title={
                  <div className="title">
                    {achievement.name.replace(/[_-]/g, ' ')}
                  </div>
                }
                subtitle={
                  <time className="subtitle date">
                    {moment.utc(new Date(achievement.created_at)).local().format('DD.MM.YYYY')}
                  </time>
                }
              />
              <CardText
                className="achievement-card-description"
                dangerouslySetInnerHTML={{ __html: description }}
              />

              <CardActions className="meta">
                <div className="item">
                  {achievement.language}
                </div>

                <div className="item">
                  {`${achievement.stargazers_count}`}
                  <FontIcon
                    color="#777"
                    className="material-icons"
                    style={{
                      marginLeft: 5,
                    }}
                  >
                    star
                  </FontIcon>
                </div>
              </CardActions>
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
        stargazers_count,
        pinned,
        created_at,
      }
    `,
  },
});

export default GithubContainer;
