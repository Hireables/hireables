import React from 'react';
import mui from 'material-ui';

const Colors = mui.Styles.Colors;
const EmptyList = () => {
  const emptyListStyle = {
    paddingTop: '100px',
    paddingBottom: '60px',
  };

  return (
    <div className="no_content text-center" style={emptyListStyle}>
      <h1 style={{ color: Colors.grey500 }}>No developers found</h1>
    </div>
  );
};

export default EmptyList;
