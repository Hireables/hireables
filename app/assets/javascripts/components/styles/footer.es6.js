import { StyleSheet } from 'aphrodite';

const footerToolbarStyles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'transparent',
    padding: '0',
    height: '40px',
    borderTop: '1px solid #ccc',
    marginBottom: 10,
  },

  group: {
    width: '100%',
  },

  text: {
    textDecoration: 'none',
    fontSize: 14,
    color: '#bdbdbd',
  },

  copyright: {
    float: 'right',
  },
});

export default footerToolbarStyles;
