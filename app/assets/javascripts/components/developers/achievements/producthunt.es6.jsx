// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment';
import FontIcon from 'material-ui/FontIcon';

// Child Components icons
import ProductHuntIcon from '../../shared/icons/producthunt.es6';
import { sanitizeText } from '../../../utils/sanitize.es6';
import AchievementForm from './form.es6';
import AchievementActions from './actions.es6';

class ProductHunt extends Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.state = {
      editing: false,
    };
  }

  edit(event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({ editing: !this.state.editing });
  }

  render() {
    const { achievement, remove, update } = this.props;

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
                        __html: sanitizeText(achievement.description),
                      }}
                    />
                  </div>
                }

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
  }
}

ProductHunt.propTypes = {
  achievement: React.PropTypes.object,
  remove: React.PropTypes.func,
  update: React.PropTypes.func,
};

const ProductHuntContainer = Relay.createContainer(ProductHunt, {
  fragments: {
    achievement: () => Relay.QL`
      fragment on Achievement {
        id,
        title,
        source_name,
        developer_id,
        import_id,
        is_owner,
        votes_count,
        comments_count,
        link,
        description,
        thumbnail,
        date,
        ${AchievementActions.getFragment('achievement')},
        ${AchievementForm.getFragment('achievement')},
      }
    `,
  },
});

export default ProductHuntContainer;
