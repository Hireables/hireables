// Modules
import React from 'react';
import Relay from 'react-relay';

const Company = props => (
  <div>
    {props.developer.company ?
      <div
        className="location"
        style={{ color: 'rgba(0, 0, 0, 0.7)', fontWeight: 500, marginTop: 5 }}
      >
        <small className="company">
          {props.developer.company}
        </small>
      </div> : ''
    }
  </div>
);

Company.propTypes = {
  developer: React.PropTypes.object,
};

const CompanyContainer = Relay.createContainer(
  Company, {
    fragments: {
      developer: () => Relay.QL`
        fragment on Developer {
          company,
        }
      `,
    },
  }
);

export default CompanyContainer;
