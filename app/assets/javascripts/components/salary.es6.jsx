import React from 'react';
import Relay from 'react-relay';

const Salary = (props) => {
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
        Salary: {`${developer.salary}/yr`}
      </div>
    </div>
  );
};

Salary.propTypes = {
  developer: React.PropTypes.object,
};

const SalaryContainer = Relay.createContainer(Salary, {
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        salary,
      }
    `,
  },
});

export default SalaryContainer;
