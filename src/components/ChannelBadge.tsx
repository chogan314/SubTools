import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const chanelBadgeStyles = require('../styles/ChannelBadge.module.css');

type ChannelBadgeProps = {
  channel: Channel
  onChannelThumbnailLoad: (thumbnailImgID: string) => void
}

function ChannelBadge({channel, onChannelThumbnailLoad}: ChannelBadgeProps): React.ReactElement {
  function getID(): string {
    return `channel-badge-${channel.id}`;
  }

  return (
    <div className={chanelBadgeStyles.channelBadge}>
      <a target="_blank" rel="noopener noreferrer" className={chanelBadgeStyles.channelBadgeInner} href={channel.url}>
        <img src={channel.thumbnails.default.url} alt={channel.name} id={getID()} onLoad={() => onChannelThumbnailLoad(getID())} />
        <div>{channel.name}</div>
      </a>
    </div>
  );
}

export default ChannelBadge;
