/* global $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import hljs from 'highlight.js';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import 'highlight.js/styles/tomorrow-night-eighties.css';
import moment from 'moment';

// Child Components icons
import StackOverflowIcon from '../../shared/icons/stackoverflow.es6';
import sanitize from '../../../utils/sanitize.es6';

class StackOverflow extends Component {
  componentDidMount() {
    setTimeout(() => {
      $('code').each((i, block) => {
        hljs.highlightBlock(block);
      });
    }, 500);
  }

  render() {
    const { achievement, remove } = this.props;

    return (
      <div className={`achievement ${achievement.source_name}`}>
        <div className="achievement-block">
          <div className={`achievement-point ${achievement.source_name}`}>
            <StackOverflowIcon />
          </div>
          <div className="achievement-content">
            <Card className="achievement-card full-width">
              <div className="achievement-card-content">
                <h2 className="intro">
                  <i className="icon material-icons">question_answer</i>
                  <span>Answer</span>
                </h2>

                {achievement.is_owner ?
                  <IconButton
                    className="remove"
                    tooltip="Remove"
                    tooltipStyles={{ top: 25 }}
                    onClick={event => remove(event, achievement)}
                  >
                    <FontIcon className="material-icons">close</FontIcon>
                  </IconButton> : ''
                }

                <time className="date">
                  {
                    moment
                    .utc(new Date(achievement.created_at))
                    .local()
                    .format('MMMM Do YYYY')
                  }
                </time>

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
                    __html: sanitize(achievement.body),
                  }}
                />

                <CardActions className="meta">
                  <span className="badge">Answer</span>
                  {achievement.is_accepted ?
                    <span className="badge">
                      Accepted
                    </span> : ''
                  }
                  <span className="badge">
                    {`${achievement.up_vote_count}`}
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

                  <span className="badge">
                    {`${achievement.comment_count}`}
                    <FontIcon
                      color="#fff"
                      className="material-icons"
                      style={{
                        fontSize: 20,
                        verticalAlign: 'middle',
                        marginLeft: 5,
                      }}
                    >
                      comment
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

StackOverflow.propTypes = {
  relay: React.PropTypes.object,
  achievement: React.PropTypes.object,
  remove: React.PropTypes.func,
};

const StackOverflowContainer = Relay.createContainer(StackOverflow, {
  fragments: {
    achievement: () => Relay.QL`
      fragment on Import {
        id,
        title,
        body,
        source_name,
        is_accepted,
        comment_count,
        developer_id,
        connection_id,
        is_owner,
        link,
        up_vote_count,
        pinned,
        created_at,
      }
    `,
  },
});

export default StackOverflowContainer;
