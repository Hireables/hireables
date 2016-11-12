import { StyleSheet } from 'aphrodite';

const iconStyles = StyleSheet.create({
  links: {
    height: 'auto',
    marginTop: 15,
    marginLeft: 0,
    display: 'flex',
    flexWrap: 'wrap',
  },

  linkIcon: {
    color: '#555',
    padding: 0,
    marginRight: 10,
    marginBottom: 5,
    backgroundColor: 'transparent',
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
