import React from 'react';
import Relay from 'react-relay';
import '../styles/badges.sass';

const JobTypes = (props) => {
  const { developer } = props;

  return (
    <div style={{ marginTop: '10px' }}>
      {developer.full_time ?
        <span
          key={Math.random()}
          className="badge tag"
        >
          Full-Time
        </span> : ''
      }

      {developer.part_time ?
        <span
          key={Math.random()}
          className="badge"
        >
          Part-Time
        </span> : ''
      }

      {developer.contract ?
        <span
          key={Math.random()}
          className="badge tag"
        >
          Contract
        </span> : ''
      }


      {developer.freelance ?
        <span
          key={Math.random()}
          className="badge tag"
        >
          Freelance
        </span> : ''
      }

      {developer.startup ?
        <span
          key={Math.random()}
          className="badge tag"
        >
          Startup
        </span> : ''
      }

      {developer.internship ?
        <span
          key={Math.random()}
          className="badge tag"
        >
          Internship
        </span> : ''
      }
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
        full_time,
        part_time,
        contract,
        freelance,
        startup,
        internship,
      }
    `,
  },
});

export default JobTypesContainer;
