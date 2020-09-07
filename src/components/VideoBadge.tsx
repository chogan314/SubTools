import React from 'react';
import date from 'date-and-time';
import {Duration, parse} from 'iso8601-duration';
import {getPremierDate} from '../util/VideoUtils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const videoBadgeStyles = require('../styles/VideoBadge.module.css');

type VideoBadgeProps = {
  video: Video
}

// <a target="_blank" rel="noopener noreferrer"  href={video.url}></a>

function VideoBadge({video}: VideoBadgeProps): React.ReactElement {
  function durationToString(duration: Duration): string {
    const timeValues: string[] = [];
    let hours = 0;

    if (duration.days !== null) {
      hours += (duration.days ?? 0) * 24;
    }
    if (duration.hours !== null) {
      hours += (duration.hours ?? 0);
    }

    timeValues.push(hours.toString());
    timeValues.push(duration.minutes?.toLocaleString(undefined, {minimumIntegerDigits: 2}) ?? '00');
    timeValues.push(duration.seconds?.toLocaleString(undefined, {minimumIntegerDigits: 2}) ?? '00');

    return timeValues.join(':');
  }

  return (
    <div className={videoBadgeStyles.videoBadge}>
      <div className={videoBadgeStyles.thumbnailContainer}>
        <img src={video.thumbnails.medium.url} alt={video.title} />
        <div className={videoBadgeStyles.publishTimeOverlay}>{date.format(getPremierDate(video), 'h:mm A')}</div>
        <div className={videoBadgeStyles.durationOverlay}>{durationToString(parse(video.duration))}</div>
      </div>
    </div>
  );
}

export default VideoBadge;
