import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const containerStyles = require('../styles/Container.module.css');

type ContainerProps = {
  children: React.ReactNode;
}

function Container({children}: ContainerProps): React.ReactElement {
  return (
    <div className={containerStyles.container}>
      <div className={containerStyles.containerInner}>
        {children}
      </div>
    </div>
  );
}

export default Container;
