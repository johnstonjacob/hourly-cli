const { curry, map, compose } = require('ramda');

const formatHHMM = ([hh, mm]) => `${hh}:${mm}`;
const leftPad = (x) => (x.toString().length < 2 ? `0${x.toString()}` : x.toString());
const getHoursAndMins = (x) => [(x - (x % 60)) / 60, x % 60];
const removeNegative = (x) => (x <= 0 ? 0 : x);
const minutesToHHMM = compose(formatHHMM, map(leftPad), getHoursAndMins, removeNegative);

const ok = (x) => (x === 'invalid' ? 'invalid' : x);

const validHHMMRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
const validHHMM = (x) => (validHHMMRegex.test(x) ? x : 'invalid');

const split = curry((x, a) => a.split(x));
const splitColon = (x) => (ok(x) ? split(':', x) : 'invalid');

const getHourMs = (x) => x * 3600000;
const getMinuteMs = (x) => x * 60000;
const getTotalMs = ([hh, mm]) => (ok(hh) ? getHourMs(hh) + getMinuteMs(mm) : 'invalid');

const formatResponse = (x) => (ok(x) ? {
  milliseconds: x,
  ok: true,
} : { ok: false });

const hhmmToMs = compose(formatResponse, getTotalMs, splitColon, validHHMM);

module.exports = {
  minutesToHHMM,
  hhmmToMs,
};
