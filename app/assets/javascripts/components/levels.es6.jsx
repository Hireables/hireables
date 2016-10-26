import React from 'react';
import Relay from 'react-relay';

const Levels = (props) => {
  const badgeStyles = {
    border: '2px solid #000',
    borderRadius: 5,
    display: 'inline-block',
    padding: '0.33em',
    margin: '0.5em',
    textDecoration: 'none',
    color: '#333',
    textAlign: 'center',
    minWidth: '70px',
    textTransform: 'uppercase',
    fontWeight: 600,
    letterSpacing: '0.02em',
    fontSize: 12,
    verticalAlign: 'middle',
  };

  const { developer } = props;

  return (
    <div style={{ marginTop: '10px' }}>
      {developer.cto ?
        <span
          key={Math.random()}
          style={badgeStyles}
        >
          CTO
        </span> : ''
      }

      {developer.lead ?
        <span
          key={Math.random()}
          style={badgeStyles}
        >
          Lead
        </span> : ''
      }

      {developer.senior ?
        <span
          key={Math.random()}
          style={badgeStyles}
        >
          Senior
        </span> : ''
      }


      {developer.mid ?
        <span
          key={Math.random()}
          style={badgeStyles}
        >
          Mid-Level
        </span> : ''
      }

      {developer.junior ?
        <span
          key={Math.random()}
          style={badgeStyles}
        >
          Junior
        </span> : ''
      }

      {developer.student ?
        <span
          key={Math.random()}
          style={badgeStyles}
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
