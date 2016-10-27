import React from 'react';
import Relay from 'react-relay';
import '../styles/badges.sass';

const Levels = (props) => {
  const { developer } = props;

  return (
    <div style={{ marginTop: '10px' }}>
      {developer.cto ?
        <span
          key={Math.random()}
          className="badge tag"
        >
          CTO
        </span> : ''
      }

      {developer.lead ?
        <span
          key={Math.random()}
          className="badge tag"
        >
          Lead
        </span> : ''
      }

      {developer.senior ?
        <span
          key={Math.random()}
          className="badge tag"
        >
          Senior
        </span> : ''
      }


      {developer.mid ?
        <span
          key={Math.random()}
          className="badge tag"
        >
          Mid-Level
        </span> : ''
      }

      {developer.junior ?
        <span
          key={Math.random()}
          className="badge tag"
        >
          Junior
        </span> : ''
      }

      {developer.student ?
        <span
          key={Math.random()}
          className="badge tag"
        >
          Student
        </span> : ''
      }
    </div>
  );
};

Levels.propTypes = {
  developer: React.PropTypes.object,
};

const LevelsContainer = Relay.createContainer(Levels, {
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        cto,
        lead,
        senior,
        mid,
        junior,
        student,
      }
    `,
  },
});

export default LevelsContainer;
