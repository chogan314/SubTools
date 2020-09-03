import React from 'react';
import ChannelVideos from './ChannelVideos';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const archiveSectionStyles = require('../styles/ArchiveSection.module.css');

type ArchiveSectionProps = {
  channels: Channel[],
  videos: Video[]
}

function getChannelVideos(channel: Channel, vidoes: Video[]): Video[] {
  return vidoes
    .filter(video => video.channelID === channel.id)
    .filter(video => video.broadcastType === "none")
    .sort((videoA, videoB) => videoA.publishDate > videoB.publishDate ? 1 : 0);
}

function ArchiveSection({channels, videos}: ArchiveSectionProps): React.ReactElement {
  return (
    <div className={archiveSectionStyles.archiveSection}>
      {channels.map(channel => <ChannelVideos key={channel.id} channel={channel} videos={getChannelVideos(channel, videos)} />)}
    </div>
  );
}

export default ArchiveSection;
