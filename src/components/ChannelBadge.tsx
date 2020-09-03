import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const chanelBadgeStyles = require('../styles/ChannelBadge.module.css');

type ChannelBadgeProps = {
  channel: Channel
}

function ChannelBadge({channel}: ChannelBadgeProps): React.ReactElement {
  return (
    <div className={chanelBadgeStyles.channelBadge}>
      <a target="_blank" rel="noopener noreferrer" className={chanelBadgeStyles.channelBadgeInner} href={channel.url}>
        <img src={channel.thumbnails.default.url} alt={channel.name} />
        <div>{channel.name}</div>
      </a>
    </div>
  );
}

export default ChannelBadge;
