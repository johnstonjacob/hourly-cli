# Hourly time tracker CLI
[![npm version](https://badge.fury.io/js/hourly-cli.svg)](https://badge.fury.io/js/hourly-cli)
[![Build Status](https://travis-ci.org/johnstonjacob/hourly-cli.svg?branch=master)](https://travis-ci.org/johnstonjacob/hourly-cli)
[![dependencies Status](https://david-dm.org/johnstonjacob/hourly-cli/status.svg)](https://david-dm.org/johnstonjacob/hourly-cli)
[![devDependencies Status](https://david-dm.org/johnstonjacob/hourly-cli/dev-status.svg)](https://david-dm.org/johnstonjacob/hourly-cli?type=dev)

## Commands
hourly - starts or stop billable hours

hourly start [time] - start billable hours. [time] is the amount of time since you started working in HH:MM format.

hourly stop [time] - stop billable hours. [time] is the amount of time since you stopped working in HH:MM format.

hourly report - prints amount of hours worked in this period

hourly end - prints all hours worked for this pay period and ends the pay period
