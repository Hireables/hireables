import React from 'react';
import Relay from 'react-relay';

const Compensation = (props) => {
  const badgeStyles = {
    color: '#333',
    fontWeight: 600,
    letterSpacing: '0.01em',
    fontSize: 12,
  };

  const { developer } = props;

  return (
    <div style={{ marginTop: '10px' }}>
      <div style={badgeStyles}>
        Compensation: {`${developer.salary}/yr`}
      </div>
    </div>
  );
};

Compensation.propTypes = {
  developer: React.PropTypes.object,
};

const CompensationContainer = Relay.createContainer(Compensation, {
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        compensation,
      }
    `,
  },
});

export default CompensationContainer;
