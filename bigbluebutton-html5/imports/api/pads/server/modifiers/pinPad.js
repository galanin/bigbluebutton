import { check } from 'meteor/check';
import { default as Pads } from '/imports/api/pads';
import Logger from '/imports/startup/server/logger';

export default function pinPad(meetingId, externalId, pinned) {
  try {
    check(meetingId, String);
    check(externalId, String);
    check(pinned, Boolean);

    if (pinned) {
      Pads.update({ meetingId, pinned: true }, { $set: { pinned: false } });
    }

    const selector = {
      meetingId,
      externalId,
    };

    const modifier = {
      $set: {
        pinned,
      },
    };

    const numberAffected = Pads.update(selector, modifier);

    if (numberAffected) {
      const prefix = pinned ? '' : 'un';
      Logger.debug(`Pad ${prefix}pinned external=${externalId} meeting=${meetingId}`);
    }
  } catch (err) {
    Logger.error(`Pinning pad: ${err}`);
  }
}
