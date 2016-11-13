/* global $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import createDOMPurify from 'dompurify';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment';

// Child Components icons
import YoutubeIcon from '../../shared/icons/youtube.es6';

class Youtube extends Component {
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

    const embedVideoStyle = {
      display: 'block',
      width: '100%',
      height: 300,
    };

    return (
      <div className={`achievement ${achievement.source_name}`}>
        <div className="achievement-block">
          <div className={`achievement-point ${achievement.source_name}`}>
            <YoutubeIcon />
          </div>
          <div className="achievement-content">
            <Card className="achievement-card full-width">
              <CardMedia
                className="achievement-card-media"
              >
                <div className="video-embed" style={embedVideoStyle}>
                  <iframe style={embedVideoStyle} frameBorder="0" src={`//youtube.com/embed/${achievement.source_id}`} />
                </div>
              </CardMedia>
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

Youtube.propTypes = {
  relay: React.PropTypes.object,
  achievement: React.PropTypes.object,
};

const YoutubeContainer = Relay.createContainer(Youtube, {
  fragments: {
    achievement: () => Relay.QL`
      fragment on Import {
        id,
        title,
        source_name,
        source_id,
        description,
        likeCount,
        pinned,
        thumbnail,
        created_at,
      }
    `,
  },
});

export default YoutubeContainer;
