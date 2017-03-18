// Modules
import React from 'react';
import Relay from 'react-relay';

const Company = props => (
  <div
    className="company"
    style={{
      color: '#333',
      fontWeight: 500,
      whiteSpace: 'nowrap',
      width: 200,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    }}
  >
    {props.developer.company ?
      <small className="company">
        {props.developer.company}
      </small> : ''
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
