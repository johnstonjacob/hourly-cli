function minutesToHHMM(mins) {
  let mm = mins % 60;
  let hh = (mins - mm) / 60;

  if (mm.toString().length < 2) mm = `0${mm.toString()}`;
  if (hh.toString().length < 2) hh = `0${hh.toString()}`;

  return `${hh}:${mm}`;
}

module.exports = {
  minutesToHHMM,
};
