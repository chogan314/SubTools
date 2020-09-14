import React from 'react';
import ChannelBadge from './ChannelBadge';
import VideoBadge from './VideoBadge';
import date from 'date-and-time';
import {getPremierDate} from '../util/VideoUtils';
import Vibrant from 'node-vibrant';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const channelVideosByDateStyles = require('../styles/ChannelVideosByDate.module.css');

type ChannelVideosRowProps = {
  channel: Channel,
  videos: Video[],
  dates: Date[]
}

function ChannelVideosByDate({channel, videos, dates}: ChannelVideosRowProps): React.ReactElement {
  function getID(): string {
    return `channel-videos-by-date-${channel.id}`;
  }

  function areSameDate(dateA: Date, dateB: Date): boolean {
    const dateAString = date.format(dateA, 'YYYY-MM-DD');
    const dateBString = date.format(dateB, 'YYYY-MM-DD');
    return dateAString === dateBString;
  }

  function onChannelThumbnailLoad(thumbnailImgID: string): void {
    console.log(`${thumbnailImgID} loaded`);
    // const img = document.getElementById(thumbnailImgID) as HTMLImageElement;
    // img.crossOrigin = 'Anonymous';
    // const vibrant = new Vibrant(img);
    // const channelVideos = document.getElementById(getID()) as HTMLElement;
    // vibrant.getPalette().then(palette => {
    //   console.log(palette);
    //   channelVideos.style.backgroundColor = palette.DarkVibrant?.getHex() as string;
    // });
  }

  return (
    <div className={channelVideosByDateStyles.channelVideos} id={getID()}>
      <div className={channelVideosByDateStyles.channelCell}>
        <ChannelBadge channel={channel} onChannelThumbnailLoad={onChannelThumbnailLoad} />
      </div>
      {
        dates.map(d => {
          return (
            <div key={`dateCell_${date.format(d, 'YYYY-MM-DD')}`} className={channelVideosByDateStyles.dateCell}>
              <div>
                {
                  videos.filter(video => areSameDate(getPremierDate(video), d))
                  .sort((a, b) => a > b ? 1 : -1)
                  .map(video => <VideoBadge key={video.id} video={video} />)
                }
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

export default ChannelVideosByDate;
