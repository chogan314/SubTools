import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sectionStyles = require('../styles/Section.module.css');

type SectionProps = {
  children: React.ReactElement;
  title: string
}

function Section({children, title}: SectionProps): React.ReactElement {
  return (
    <div className={sectionStyles.section}>
      <h1 className={sectionStyles.title}>{title}</h1>
      {children}
    </div>
  );
}

export default Section;
