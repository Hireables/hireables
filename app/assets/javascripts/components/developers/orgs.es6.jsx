// Modules
import React from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

const Orgs = props => (
  <div>
    {props.developer.orgs.length > 0 ?
      <div className="orgs" style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div className="header-separator">Organizations</div>
        {props.developer.orgs.map(org => (
          <div
            className="org"
            key={org.id}
            style={{ marginRight: 10, marginBottom: 10 }}
          >
            <Chip>
              <Avatar src={org.avatar_url} size={50} />
              {org.login}
            </Chip>
          </div>
        ))}
      </div> : ''
    }
  </div>
);

Orgs.propTypes = {
  developer: React.PropTypes.object,
};

const OrgsContainer = Relay.createContainer(
  Orgs, {
    fragments: {
      developer: () => Relay.QL`
        fragment on Developer {
          orgs {
            id,
            avatar_url,
            login,
            description,
            url,
          },
        }
      `,
    },
  }
);

export default OrgsContainer;
