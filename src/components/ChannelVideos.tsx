import React from 'react';
import ChannelBadge from './ChannelBadge';
import VideoBadge from './VideoBadge';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const channelVideosStyles = require('../styles/ChannelVideos.module.css');

type ChannelVideosProps = {
  channel: Channel,
  videos: Video[]
}

function ChannelVideos({channel, videos}: ChannelVideosProps): React.ReactElement {
  return (
    <div className={channelVideosStyles.channelVideos}>
      <ChannelBadge channel={channel} />
      <div className={channelVideosStyles.channelVideosVideos}>
        {videos.map(video => <VideoBadge key={video.id} video={video} />)}
      </div>
    </div>
  );
}

export default ChannelVideos;
