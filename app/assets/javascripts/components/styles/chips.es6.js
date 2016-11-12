import { StyleSheet } from 'aphrodite';

const Chips = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  chip: {
    marginBottom: 4,
    background: 'transparent',
    textTransform: 'capitalize',
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

export default Chips;
