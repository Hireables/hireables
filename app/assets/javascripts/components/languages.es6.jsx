import React from 'react';
import mui from 'material-ui';

const Colors = mui.Styles.Colors;
const Languages = () => {
  const badgeStyles = {
    fontSize: '12px',
    lineHeight: '22px',
    backgroundColor: Colors.grey600,
    padding: '5px 8px',
    marginRight: '5px',
    color: Colors.white,
    fontWeight: '500',
    textDecoration: 'none',
    overflow: 'hidden',
    borderRadius: 2,
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <span>
        {this.props.languages ? this.props.languages.map(language => (
          <a
            key={Math.random()}
            href={`/developers?q=language:${language.trim().toLowerCase()}`}
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
