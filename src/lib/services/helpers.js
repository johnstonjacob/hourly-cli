const curry = require('lodash/fp/curry');
const compose = require('lodash/fp/compose');
const map = require('lodash/fp/map');

const formatHHMM = ([hh, mm]) => `${hh}:${mm}`;
const leftPad = (x) => (x.toString().length < 2 ? `0${x.toString()}` : x.toString());
const getHoursAndMins = (x) => [(x - (x % 60)) / 60, x % 60];
const removeNegative = (x) => (x <= 0 ? 0 : x);
const minutesToHHMM = compose(formatHHMM, map(leftPad), getHoursAndMins, removeNegative);

const ok = (x) => (x === 'notok' ? 'notok' : x);

const validHHMMRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
const validHHMM = (x) => (validHHMMRegex.test(x) ? x : 'notok');

const split = curry((x, a) => a.split(x));
const splitColon = (x) => (ok(x) ? split(':', x) : 'notok');

const getHourMs = (x) => x * 3600000;
const getMinuteMs = (x) => x * 60000;
const getTotalMs = ([hh, mm]) => (ok(hh) ? getHourMs(hh) + getMinuteMs(mm) : 'notok');

const formatResponse = (x) => (ok(x) ? {
  milliseconds: x,
  ok: true,
} : { ok: false });
const hhmmToMs = compose(formatResponse, getTotalMs, splitColon, validHHMM);


// function hhmmToMs(hhmm) {
//   const hhmmRegex =
//   if (!hhmmRegex.test(hhmm)) return { ok: false };

//   const [hh, mm] = hhmm.split(':');

//   return { ok: true, milliseconds: hh * 3600000 + mm * 60000 };
// }

module.exports = {
  minutesToHHMM,
  hhmmToMs,
};
