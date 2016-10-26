import React from 'react';
import Relay from 'react-relay';

const Languages = (props) => {
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
      <span>
        {developer.platforms.length > 0 ? developer.platforms.map(platform => (
          <a
            key={Math.random()}
            href={`/search?language:${platform.trim().toLowerCase()}`}
            style={badgeStyles}
          >
            {platform}
          </a>
        )) : ''}
      </span>
    </div>
  );
};

Languages.propTypes = {
  developer: React.PropTypes.object,
};

const LanguagesContainer = Relay.createContainer(Languages, {
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        platforms,
      }
    `,
  },
});

export default LanguagesContainer;
