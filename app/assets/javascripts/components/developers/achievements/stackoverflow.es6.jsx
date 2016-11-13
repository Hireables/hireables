/* global $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import createDOMPurify from 'dompurify';
import hljs from 'highlight.js';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card';
import 'highlight.js/styles/tomorrow-night-eighties.css';
import moment from 'moment';

// Child Components icons
import StackOverflowIcon from '../../shared/icons/stackoverflow.es6';

class StackOverflow extends Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.delete = this.edit.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      $('code').each((i, block) => {
        hljs.highlightBlock(block);
      });
    }, 500);
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
      achievement.body,
      { ALLOWED_TAGS: ['b', 'i', 'code'] }
    );

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
                  <span>Answered on </span>
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Stackoverflow
                  </a>
                </h2>

                <time className="date">
                  on {moment.utc(new Date(achievement.created_at)).local().format('MMMM Do YYYY')}
                </time>

                <CardTitle
                  className="achievement-card-header"
                  title={
                    <div className="title">
                      {achievement.title}
                    </div>
                  }
                />

                <CardText
                  className="achievement-card-description"
                  dangerouslySetInnerHTML={{ __html: description }}
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
        link,
        up_vote_count,
        pinned,
        created_at,
      }
    `,
  },
});

export default StackOverflowContainer;