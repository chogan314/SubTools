import React from 'react';
import date from 'date-and-time';
import {Duration, parse} from 'iso8601-duration';
import {getPremierDate} from '../util/VideoUtils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const videoBadgeStyles = require('../styles/VideoBadge.module.css');

export enum Popularity {
  Normal,
  High,
  Extreme
}

type VideoBadgeProps = {
  video: Video
  popularity: Popularity
}

function VideoBadge({video, popularity}: VideoBadgeProps): React.ReactElement {
  function durationToString(duration: Duration): string {
    const timeValues: string[] = [];
    let hours = 0;

    if (duration.days !== null) {
      hours += (duration.days ?? 0) * 24;
    }
    if (duration.hours !== null) {
      hours += (duration.hours ?? 0);
    }

    if (hours > 0) {
      timeValues.push(hours.toString());
    }
    
    timeValues.push(duration.minutes?.toLocaleString(undefined, {minimumIntegerDigits: 2}) ?? '00');
    timeValues.push(duration.seconds?.toLocaleString(undefined, {minimumIntegerDigits: 2}) ?? '00');

    return timeValues.join(':');
  }

  function getPopularityClass(popularity: Popularity): string {
    if (popularity === Popularity.Extreme) {
      return videoBadgeStyles.extremePopularity;
    }
    else if (popularity === Popularity.High) {
      return videoBadgeStyles.highPopularity;
    }
    else {
      return videoBadgeStyles.normalPopularity;
    }
  }

  return (
    <div className={videoBadgeStyles.videoBadge}>
      <a target="_blank" rel="noopener noreferrer"  href={video.url}>
        <div className={videoBadgeStyles.thumbnailContainer}>
          <img src={video.thumbnails.medium.url} alt={video.title} className={getPopularityClass(popularity)} />
          <div className={videoBadgeStyles.statsOverlay}>
            <div className={videoBadgeStyles.publishTimeOverlay}>{date.format(getPremierDate(video), 'h:mm A')}</div>
            <div className={videoBadgeStyles.durationOverlay}>{durationToString(parse(video.duration))}</div>
          </div>
          <div className={videoBadgeStyles.titleOverlay}>
            <div className={videoBadgeStyles.titleOverlayInner}>
              <div className={videoBadgeStyles.titleOverlayInnerText}>
                {video.title}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default VideoBadge;
