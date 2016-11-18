// Modules
import React from 'react';
import Relay from 'react-relay';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

// Child Components icons
import ProductHuntIcon from '../../shared/icons/producthunt.es6';
import sanitize from '../../../utils/sanitize.es6';

const ProductHunt = (props) => {
  const { achievement, remove } = props;

  return (
    <div className={`achievement ${achievement.source_name}`}>
      <div className="achievement-block">
        <div className={`achievement-point ${achievement.source_name}`}>
          <ProductHuntIcon />
        </div>

        <div className="achievement-content">
          <Card className="achievement-card full-width">
            <div className="achievement-card-content">
              <h2 className="intro">
                <i className="icon material-icons">apps</i>
                <span>App/Product</span>
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
                      href={achievement.discussion_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {achievement.name}
                    </a>
                  </div>
                }
              />

              <CardText
                className="achievement-card-description"
                dangerouslySetInnerHTML={{
                  __html: sanitize(achievement.tagline),
                }}
              />

              <CardActions className="meta">
                <span className="badge">
                  {`${achievement.comments_count}`}
                  <FontIcon
                    color="#fff"
                    className="material-icons"
                    style={{
                      fontSize: 20,
                      verticalAlign: 'top',
                      marginLeft: 5,
                    }}
                  >
                    comment
                  </FontIcon>
                </span>

                <span className="badge">
                  {`${achievement.votes_count}`}
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
              </CardActions>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

ProductHunt.propTypes = {
  achievement: React.PropTypes.object,
  remove: React.PropTypes.func,
};

const ProductHuntContainer = Relay.createContainer(ProductHunt, {
  fragments: {
    achievement: () => Relay.QL`
      fragment on Import {
        id,
        name,
        source_name,
        developer_id,
        connection_id,
        is_owner,
        votes_count,
        comments_count,
        discussion_url,
        tagline,
        thumbnail,
        pinned,
        created_at,
      }
    `,
  },
});

export default ProductHuntContainer;
