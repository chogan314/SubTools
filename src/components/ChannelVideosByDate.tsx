import React from 'react';
import ChannelBadge from './ChannelBadge';
import VideoBadge from './VideoBadge';
import date from 'date-and-time';
import {getPremierDate} from '../util/VideoUtils';
import Vibrant from 'node-vibrant';
import {Popularity} from './VideoBadge';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const channelVideosByDateStyles = require('../styles/ChannelVideosByDate.module.css');

type ChannelVideosRowProps = {
  channel: Channel,
  videos: Video[],
  dates: Date[]
}

function ChannelVideosByDate({channel, videos, dates}: ChannelVideosRowProps): React.ReactElement {
  function getID(): string {
    return `channel-videos-by-date-videos-section-${channel.id}`;
  }

  function areSameDate(dateA: Date, dateB: Date): boolean {
    const dateAString = date.format(dateA, 'YYYY-MM-DD');
    const dateBString = date.format(dateB, 'YYYY-MM-DD');
    return dateAString === dateBString;
  }

  function onChannelThumbnailLoad(thumbnailImgID: string): void {
    console.log(`${thumbnailImgID} loaded`);
    const img = document.getElementById(thumbnailImgID) as HTMLImageElement;
    img.crossOrigin = 'Anonymous';
    const vibrant = new Vibrant(img);
    const channelVideos = document.getElementById(getID()) as HTMLElement;
    vibrant.getPalette().then(palette => {
      console.log(palette);
      channelVideos.style.backgroundColor = palette.Muted?.getHex() as string;
    });
  }

  function videosAreDisplayed(): boolean {
    return videos.some(video => dates.some(date => areSameDate(getPremierDate(video), date)));
  }

  function getPopularity(): Popularity {
    const r = Math.floor(Math.random() * 10) + 1;
    if (r >= 10) {
      return Popularity.Extreme;
    }
    else if (r >= 7) {
      return Popularity.High;
    }
    else {
      return Popularity.Normal;
    }
  }

  return (
    <div className={`${channelVideosByDateStyles.channelVideos}${videosAreDisplayed() ? "" : " " + channelVideosByDateStyles.emptyContainer}`}>
      <div className={channelVideosByDateStyles.channelCell}>
        <ChannelBadge channel={channel} onChannelThumbnailLoad={onChannelThumbnailLoad} />
      </div>
      <div className={channelVideosByDateStyles.videosSection} id={getID()}>
        {
          dates.map(d => {
            return (
              <div key={`dateCell_${date.format(d, 'YYYY-MM-DD')}`} className={channelVideosByDateStyles.dateCell}>
                <div>
                  {
                    videos.filter(video => areSameDate(getPremierDate(video), d))
                    .sort((a, b) => a > b ? 1 : -1)
                    .map(video => <VideoBadge key={video.id} video={video} popularity={getPopularity()} />)
                  }
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default ChannelVideosByDate;
