function minutesToHHMM(mins) {
  if (mins <= 0) return '00:00';

  let mm = mins % 60;
  let hh = (mins - mm) / 60;
  if (mm.toString().length < 2) mm = `0${mm.toString()}`;
  if (hh.toString().length < 2) hh = `0${hh.toString()}`;

  return `${hh}:${mm}`;
}

function hhmmToMs(hhmm) {
  const hhmmRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!hhmmRegex.test(hhmm)) return { ok: false };

  const [hh, mm] = hhmm.split(':');

  return { ok: true, milliseconds: hh * 3600000 + mm * 60000 };
}

module.exports = {
  minutesToHHMM,
  hhmmToMs,
};
