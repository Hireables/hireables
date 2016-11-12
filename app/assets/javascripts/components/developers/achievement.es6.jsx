/* global $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import createDOMPurify from 'dompurify';
import hljs from 'highlight.js';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import 'highlight.js/styles/tomorrow-night-eighties.css';

// Child Components icons
import Github from '../shared/icons/github.es6';
import StackOverflow from '../shared/icons/stackoverflow.es6';
import Linkedin from '../shared/icons/linkedin.es6';
import Youtube from '../shared/icons/youtube.es6';

// Map icon component to string names
const iconsMap = new Map();
iconsMap.set('github', Github);
iconsMap.set('stackoverflow', StackOverflow);
iconsMap.set('linkedin', Linkedin);
iconsMap.set('youtube', Youtube);

class Achievement extends Component {
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
    const Icon = iconsMap.get(achievement.source_name);
    const description = createDOMPurify.sanitize(
      achievement.description || achievement.body || achievement.summary,
      { ALLOWED_TAGS: ['b', 'i', 'code'] }
    );
    return (
      <div className={`achievement ${achievement.source_name}`}>
        <div className="achievement-block">
          <div className={`achievement-point ${achievement.source_name}`}>
            <Icon />
          </div>
          <div className="achievement-content">
            <Card className="achievement-card full-width">
              <CardTitle
                className="achievement-card-header"
                title={
                  <div className="title">
                    {achievement.title || achievement.name}
                  </div>
                }
                subtitle={
                  <div className="subtitle">
                    {achievement.creation_date ||
                      achievement.pushed_at ||
                      achievement.publishedAt ||
                      achievement.startDate && achievement.startDate.year
                    }
                  </div>
                }
              />
              <CardText
                className="achievement-card-description"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

Achievement.propTypes = {
  relay: React.PropTypes.object,
  achievement: React.PropTypes.object,
};

const AchievementContainer = Relay.createContainer(Achievement, {
  fragments: {
    achievement: () => Relay.QL`
      fragment on Import {
        id,
        title,
        name,
        summary,
        body,
        source_name,
        description,
        stargazers_count,
        likeCount,
        up_vote_count,
        pinned,
        creation_date,
        startDate,
        publishedAt,
        pushed_at,
      }
    `,
  },
});

export default AchievementContainer;
