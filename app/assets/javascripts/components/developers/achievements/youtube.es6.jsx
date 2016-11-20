/* global $ window document */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import { Card, CardMedia, CardActions, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

// Child Components icons
import YoutubeIcon from '../../shared/icons/youtube.es6';
import sanitize from '../../../utils/sanitize.es6';

class Youtube extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.iframe.setAttribute('src', this.iframe.getAttribute('data-src'));
    }, 1000);
  }

  render() {
    const { achievement, remove } = this.props;
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
                  <i className="icon material-icons">video_library</i>
                  Talk
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
                    moment(achievement.created_at, 'YYYY-MM-DD HH:mm:ss [UTC]')
                    .format('MMMM Do YYYY')
                    .toString()
                  }
                </time>

                <CardMedia
                  className="achievement-card-media"
                >
                  <div className="video-embed" style={embedVideoStyle}>
                    <iframe
                      ref={node => (this.iframe = node)}
                      style={embedVideoStyle}
                      frameBorder="0"
                      data-src={`//youtube.com/embed/${achievement.source_id}`}
                    />
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
                  dangerouslySetInnerHTML={{
                    __html: sanitize(achievement.description),
                  }}
                />

                <CardActions className="meta">
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
  achievement: React.PropTypes.object,
  remove: React.PropTypes.func,
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
        developer_id,
        connection_id,
        is_owner,
        likeCount,
        viewCount,
        pinned,
        created_at,
      }
    `,
  },
});

export default YoutubeContainer;
