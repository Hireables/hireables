/* global $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import createDOMPurify from 'dompurify';
import hljs from 'highlight.js';
import { Card, CardTitle, CardText } from 'material-ui/Card';
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
              <CardTitle
                className="achievement-card-header"
                title={
                  <div className="title">
                    {achievement.title}
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
        up_vote_count,
        pinned,
        created_at,
      }
    `,
  },
});

export default StackOverflowContainer;
