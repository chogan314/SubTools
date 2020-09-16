import React from 'react';
import ChannelVideosByDate from './ChannelVideosByDate';
import date from 'date-and-time';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const archiveStyles = require('../styles/Archive.module.css');

type ArchiveProps = {
  channels: Channel[],
  videos: Video[]
}

function Archive({channels, videos}: ArchiveProps): React.ReactElement {
  const dates = [
    new Date(),
    date.addDays(new Date(), -1),
    date.addDays(new Date(), -2),
    date.addDays(new Date(), -3),
    date.addDays(new Date(), -4),
    date.addDays(new Date(), -5),
    date.addDays(new Date(), -6)
  ];

  function getChannelVideos(channel: Channel, videos: Video[]): Video[] {
    return videos
      .filter(video => video.channelID === channel.id)
      .filter(video => video.broadcastType === "none")
      .sort((videoA, videoB) => videoA.publishDate > videoB.publishDate ? 1 : 0);
  }

  return (
    <div>
      <div className={archiveStyles.tableHeader}>
        <div className={archiveStyles.channelHeader}>Channel</div>
        <div className={archiveStyles.dateHeaders}>
          {
            dates.map(d => {
              return (
                <div key={`dateHeader_${date.format(d, 'YYYY-MM-DD')}`}>
                  {date.format(d, 'dddd MMM DD')}
                </div>
              );
            })
          }
        </div>
      </div>
      {channels.map(channel => <ChannelVideosByDate key={channel.id} channel={channel} videos={getChannelVideos(channel, videos)} dates={dates} />)}
    </div>
  );
}

export default Archive;
