import React from 'react';
import ChannelBadge from './ChannelBadge';
import VideoBadge from './VideoBadge';
import date from 'date-and-time';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const channelVideosByDateStyles = require('../styles/ChannelVideosByDate.module.css');

type ChannelVideosRowProps = {
  channel: Channel,
  videos: Video[],
  dates: Date[]
}

function ChannelVideosByDate({channel, videos, dates}: ChannelVideosRowProps): React.ReactElement {
  function areSameDate(dateA: Date, dateB: Date) {
    const dateAString = date.format(dateA, 'YYYY-MM-DD');
    const dateBString = date.format(dateB, 'YYYY-MM-DD');
    return dateAString === dateBString;
  }

  return (
    <div className={channelVideosByDateStyles.channelVideos}>
      <div className={channelVideosByDateStyles.channelCell}>
        <ChannelBadge channel={channel} />
      </div>
      {
        dates.map(d => {
          return (
            <div key={`dateCell_${date.format(d, 'YYYY-MM-DD')}`} className={channelVideosByDateStyles.dateCell}>
              <div>
                {
                  videos.filter(video => areSameDate(video.publishDate, d))
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
