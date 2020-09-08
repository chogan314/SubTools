import React from 'react';
import date from 'date-and-time';
import {Duration, parse} from 'iso8601-duration';
import {getPremierDate} from '../util/VideoUtils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const videoBadgeStyles = require('../styles/VideoBadge.module.css');

type VideoBadgeProps = {
  video: Video
}

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

    if (hours > 0) {
      timeValues.push(hours.toString());
    }
    
    timeValues.push(duration.minutes?.toLocaleString(undefined, {minimumIntegerDigits: 2}) ?? '00');
    timeValues.push(duration.seconds?.toLocaleString(undefined, {minimumIntegerDigits: 2}) ?? '00');

    return timeValues.join(':');
  }

  function handleMouseEnter(): void {
    const publishTimeOverlay = (document.getElementById(getID())?.querySelector(`.${videoBadgeStyles.publishTimeOverlay}`) as HTMLDivElement);
    const durationOveraly = (document.getElementById(getID())?.querySelector(`.${videoBadgeStyles.durationOverlay}`) as HTMLDivElement);
    const titleOverlay = (document.getElementById(getID())?.querySelector(`.${videoBadgeStyles.titleOverlay}`) as HTMLDivElement);

    fadeOut(publishTimeOverlay);
    fadeOut(durationOveraly);
    fadeIn(titleOverlay);
  }

  function handleMouseLeave(): void {
    const publishTimeOverlay = (document.getElementById(getID())?.querySelector(`.${videoBadgeStyles.publishTimeOverlay}`) as HTMLDivElement);
    const durationOveraly = (document.getElementById(getID())?.querySelector(`.${videoBadgeStyles.durationOverlay}`) as HTMLDivElement);
    const titleOverlay = (document.getElementById(getID())?.querySelector(`.${videoBadgeStyles.titleOverlay}`) as HTMLDivElement);

    fadeIn(publishTimeOverlay);
    fadeIn(durationOveraly);
    fadeOut(titleOverlay);
  }

  function fadeOut(div: HTMLDivElement) {
    let op = 1;  // initial opacity
    const timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            div.style.display = 'none';
        }
        div.style.opacity = op.toString();
        div.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 3);
  }

  function fadeIn(div: HTMLDivElement) {
    let op = 0.1;  // initial opacity
    div.style.opacity = op.toString();
    div.style.display = 'block';
    const timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
            div.style.display = 'block';
        }
        div.style.opacity = op.toString();
        div.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 3);
  }

  function getID(): string {
    return `videoBadge_${video.channelID}_${video.id}`;
  }

  return (
    <div className={videoBadgeStyles.videoBadge} id={getID()}>
      <a target="_blank" rel="noopener noreferrer"  href={video.url} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className={videoBadgeStyles.thumbnailContainer}>
          <img src={video.thumbnails.medium.url} alt={video.title} />
          <div className={videoBadgeStyles.publishTimeOverlay}>{date.format(getPremierDate(video), 'h:mm A')}</div>
          <div className={videoBadgeStyles.durationOverlay}>{durationToString(parse(video.duration))}</div>
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
