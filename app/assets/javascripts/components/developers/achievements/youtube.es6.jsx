/* global $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import createDOMPurify from 'dompurify';
import { Card, CardMedia, CardActions, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment';
import FontIcon from 'material-ui/FontIcon';

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
              <div className="achievement-card-content">
                <h2 className="intro">
                  <span>Presented on </span>
                  Youtube
                </h2>

                <time className="date">
                  on {moment.utc(new Date(achievement.created_at)).local().format('MMMM Do YYYY')}
                </time>

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
                />
                <CardText
                  className="achievement-card-description"
                  dangerouslySetInnerHTML={{ __html: description }}
                />

                <CardActions className="meta">
                  <span className="badge">
                    <a
                      href={`//youtube.com/watch?v=${achievement.source_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Youtube
                    </a>
                  </span>
                  <span className="badge">Video</span>
                  <span className="badge">
                    {`${achievement.likeCount}`}
                    <FontIcon
                      color="#fff"
                      className="material-icons"
                      style={{
                        fontSize: 20,
                        verticalAlign: 'top',
                        marginLeft: 5,
                      }}
                    >
                      thumb_up
                    </FontIcon>
                  </span>

                  <span className="badge">
                    {`${achievement.viewCount}`}
                    <FontIcon
                      color="#fff"
                      className="material-icons"
                      style={{
                        fontSize: 20,
                        verticalAlign: 'middle',
                        marginLeft: 5,
                      }}
                    >
                      visibility
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
        viewCount,
        pinned,
        created_at,
      }
    `,
  },
});

export default YoutubeContainer;
