const { test } = require('@playwright/test');
const e = require('../core/elements.js');
const { getSettings } = require('../core/settings.js');

async function openPoll(testPage) {
  const { pollEnabled } = getSettings();
  test.fail(!pollEnabled, 'Polling is disabled');

  await testPage.waitAndClick(e.actions);
  await testPage.waitAndClick(e.polling);
}

function timeInSeconds(locator){
  const [hours, minutes, seconds] = locator.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

exports.openPoll = openPoll;
exports.timeInSeconds = timeInSeconds;