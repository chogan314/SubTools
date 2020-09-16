import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const archiveStyles = require('../styles/Live.module.css');

type LiveProps = {
  channels: Channel[],
  videos: Video[]
}

function Live({channels, videos}: LiveProps): React.ReactElement {
  return (
    <div>
    </div>
  );
}

export default Live;
