const { curry, map, compose } = require('ramda');

const formatHHMM = ([hh, mm]) => `${hh}:${mm}`;
const leftPad = (x) => (x.toString().length < 2 ? `0${x.toString()}` : x.toString());
const getHoursAndMins = (x) => [(x - (x % 60)) / 60, x % 60];
const removeNegative = (x) => (x <= 0 ? 0 : x);
const minutesToHHMM = compose(formatHHMM, map(leftPad), getHoursAndMins, removeNegative);

const validHHMMRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
const validHHMM = validHHMMRegex.test.bind(validHHMMRegex);

const split = curry((x, a) => a.split(x));
const splitColon = split(':');

const getHourMs = (x) => x * 3600000;
const getMinuteMs = (x) => x * 60000;
const getTotalMs = ([hh, mm]) => getHourMs(hh) + getMinuteMs(mm);

const hhmmToMs = compose(getTotalMs, splitColon);

module.exports = {
  minutesToHHMM,
  hhmmToMs,
  validHHMM,
};
