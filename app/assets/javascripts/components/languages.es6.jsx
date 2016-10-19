import React from 'react';
import { white, grey600 } from 'material-ui/styles/colors';

const Languages = (props) => {
  const badgeStyles = {
    fontSize: '12px',
    lineHeight: '22px',
    backgroundColor: grey600,
    padding: '5px 8px',
    marginRight: '5px',
    color: white,
    fontWeight: '500',
    textDecoration: 'none',
    overflow: 'hidden',
    borderRadius: 2,
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
