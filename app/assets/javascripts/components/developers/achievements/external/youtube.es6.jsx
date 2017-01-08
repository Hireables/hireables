/* global $ window document */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import { Card, CardMedia, CardActions, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment';
import FontIcon from 'material-ui/FontIcon';

// Child Components icons
import YoutubeIcon from '../../../shared/icons/youtube.es6';
import { sanitizeText } from '../../../../utils/sanitize.es6';
import AchievementForm from '../form.es6';
import AchievementActions from '../actions.es6';

class Youtube extends Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.state = {
      editing: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.iframe.setAttribute('src', this.iframe.getAttribute('data-src'));
    }, 1000);
  }

  edit(event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({ editing: !this.state.editing });
  }

  render() {
    const { achievement, remove, update } = this.props;
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
                  <AchievementActions
                    achievement={achievement}
                    remove={remove}
                    edit={this.edit}
                  /> : ''
                }

                <time className="date">
                  {
                    moment(achievement.date, 'YYYY-MM-DD HH:mm:ss [UTC]')
                    .format('MMMM Do YYYY')
                    .toString()
                  }
                </time>

                {this.state.editing ?
                  <AchievementForm
                    achievement={achievement}
                    update={update}
                    edit={this.edit}
                  /> :
                  <div className="achievement-content">
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
                        __html: sanitizeText(achievement.description),
                      }}
                    />
                  </div>
                }

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
  update: React.PropTypes.func,
};

const YoutubeContainer = Relay.createContainer(Youtube, {
  fragments: {
    achievement: () => Relay.QL`
      fragment on Achievement {
        id,
        title,
        source_name,
        source_id,
        description,
        developer_id,
        import_id,
        is_owner,
        likeCount,
        viewCount,
        date,
        ${AchievementActions.getFragment('achievement')},
        ${AchievementForm.getFragment('achievement')},
      }
    `,
  },
});

export default YoutubeContainer;
