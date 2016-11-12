// Modules
import React from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/Avatar';

const Orgs = props => (
  <div>
    {props.developer.orgs.length > 0 ?
      <div
        className="orgs"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        {props.developer.orgs.map(org => (
          <div
            className="org"
            key={org.id}
            style={{ marginRight: 10, marginBottom: 10 }}
          >
            <Avatar
              src={org.avatar_url}
              size={32}
              style={{ borderRadius: 0 }}
            />
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
