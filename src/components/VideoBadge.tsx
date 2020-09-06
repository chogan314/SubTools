import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const videoBadgeStyles = require('../styles/VideoBadge.module.css');

type VideoBadgeProps = {
  video: Video
}

function VideoBadge({video}: VideoBadgeProps): React.ReactElement {
  return (
    <div className={videoBadgeStyles.videoBadge}>
      <a target="_blank" rel="noopener noreferrer"  href={video.url}>
        <img src={video.thumbnails.medium.url} alt={video.title} />
      </a>
    </div>
  );
}

export default VideoBadge;
