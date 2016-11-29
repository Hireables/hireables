const nameBadge = (name) => {
  const chunks = name.split(' ');
  let badge;
  if (chunks[0] && chunks[1]) {
    badge = chunks[0][0] + chunks[1][0];
  } else if (chunks[0] && chunks[1] === undefined) {
    badge = chunks[0][0] + chunks[0][1];
  }
  return badge;
};
export default nameBadge;
