import { StyleSheet } from 'aphrodite';

const Forms = StyleSheet.create({
  help: {
    fontSize: '12px',
    color: '#c9302c',
    fontWeight: '500',
    display: 'block',
    userSelect: 'none',
  },

  preferences: {
    marginTop: 16,
  },

  inline: {
    float: 'left',
    minWidth: 150,
    marginBottom: 16,
    width: 'auto',
  },

  half: {
    float: 'left',
    minWidth: 'calc(50% - 10px)',
    width: 'auto',
    marginRight: 20,
    ':last-of-type': {
      marginRight: 0,
    },
  },

  input: {
    marginBottom: 16,
  },

  button: {
    marginTop: 16,
  },
});

export default Forms;
