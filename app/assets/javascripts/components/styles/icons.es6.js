import { StyleSheet } from 'aphrodite';

const iconStyles = StyleSheet.create({
  links: {
    height: 'auto',
    marginLeft: 0,
    display: 'flex',
    flexWrap: 'wrap',
  },

  linkIcon: {
    color: '#555',
    padding: 0,
    borderRadius: 0,
    fontSize: 13,
    backgroundColor: 'transparent',
  },

  bordered: {
    margin: 5,
    border: '1px solid #f2f2f2',
  },

  premium: {
    border: '1px solid #fff',
  },

  hover: {
    ':hover': {
      backgroundColor: '#f2f2f2',
    },
  },

  label: {
    fontSize: 16,
  },

  iconAvatar: {
    backgroundColor: 'transparent',
    color: 'rgb(91, 152, 224)',
    fontSize: 16,
  },

  chipIcon: {
    backgroundColor: 'transparent',
    color: 'rgb(91, 152, 224)',
  },
});

export default iconStyles;
