import { StyleSheet } from 'aphrodite';

const iconStyles = StyleSheet.create({
  links: {
    height: 'auto',
    marginTop: 10,
    marginLeft: 0,
    display: 'flex',
    flexWrap: 'wrap',
  },

  linkIcon: {
    color: '#555',
    padding: 0,
    margin: 0,
    marginBottom: 5,
    backgroundColor: 'transparent',
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
