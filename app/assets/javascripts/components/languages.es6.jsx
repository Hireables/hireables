import React from 'react';

const Languages = (props) => {
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

  const { languages } = props;

  return (
    <div style={{ marginTop: '10px' }}>
      <span>
        {languages ? languages.map(language => (
          <a
            key={Math.random()}
            href={`/search?language:${language.trim().toLowerCase()}`}
            style={badgeStyles}
          >
            {language}
          </a>
        )) : ''}
      </span>
    </div>
  );
};

Languages.propTypes = {
  languages: React.PropTypes.array,
};

module.exports = Languages;
