import React from 'react';
import Relay from 'react-relay';

const JobTypes = (props) => {
  const badgeStyles = {
    border: '2px solid #000',
    borderRadius: 5,
    display: 'inline-block',
    padding: '0.33em',
    margin: '0.2em',
    textDecoration: 'none',
    color: '#333',
    minWidth: '50px',
    textTransform: 'uppercase',
    fontWeight: 600,
    letterSpacing: '0.01em',
    fontSize: 12,
    verticalAlign: 'middle',
  };

  const { developer } = props;

  return (
    <div style={{ marginTop: '10px' }}>
      <span>
        {developer.job_types.length > 0 ? developer.job_types.map(job => (
          <div
            key={Math.random()}
            style={badgeStyles}
          >
            {job}
          </div>
        )) : ''}
      </span>
    </div>
  );
};

JobTypes.propTypes = {
  developer: React.PropTypes.object,
};

const JobTypesContainer = Relay.createContainer(JobTypes, {
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        job_types,
      }
    `,
  },
});

export default JobTypesContainer;
