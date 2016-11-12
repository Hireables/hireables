import { StyleSheet } from 'aphrodite';

const badges = StyleSheet.create({
  badge: {
    verticalAlign: 'middle',
    textAlign: 'center',
    fontWeight: 500,
    textTransform: 'uppercase',
  },

  big: {
    top: 20,
    left: 130,
  },

  tag: {
    border: '1px solid #777',
    display: 'inline-block',
    padding: '5px 10px',
    cursor: 'pointer',
    marginRight: 10,
    marginBottom: 10,
    textDecoration: 'none',
    color: '#333',
    minWidth: 50,
    fontSize: 12,
    letterSpacing: '0.02em',
  },

  hover: {
    ':hover': {
      backgroundColor: '#f2f2f2',
    },
  },

  hireable: {
    fontSize: 14,
    lineHeight: '24px',
    position: 'absolute',
    color: 'white',
    width: 24,
    height: 24,
    backgroundColor: '#66bb6a',
    borderRadius: '100%',
    padding: 0,
    left: 65,
    top: 6,
    zIndex: 10,
    boxShadow: 'rgba(63, 67, 69, 0.298039) 0px 0px 16px 0px',
    border: '1px solid white',
  },
});

export default badges;
