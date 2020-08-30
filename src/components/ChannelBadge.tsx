import React from 'react';

type ChannelBadgeProps = {
  channel: Channel
}

function ChannelBadge({channel}: ChannelBadgeProps): React.ReactElement {
  return (
    <div className="channel">
      <div>Name: {channel.name}</div>
      <div>Description: {channel.description}</div>
      <div>Upload Playlist ID: {channel.uploadsPlaylistID}</div>
      <img src={channel.thumbnails.default.url} alt={channel.name} />
      <img src={channel.thumbnails.medium.url} alt={channel.name} />
      <img src={channel.thumbnails.high.url} alt={channel.name} />
    </div>
  );
}

export default ChannelBadge;
