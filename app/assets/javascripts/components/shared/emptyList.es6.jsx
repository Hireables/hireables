import React from 'react';
import { grey500 } from 'material-ui/styles/colors';

const EmptyList = () => {
  const emptyContentStyle = {
    paddingTop: '60px',
    paddingBottom: '60px',
  };

  return (
    <div className="no_content text-center" style={emptyContentStyle}>
      <h1 style={{ color: grey500, fontWeight: 500 }}>No results</h1>
    </div>
  );
};

export default EmptyList;
