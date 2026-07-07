import React from 'react';

const TcSection = ({ title, intro, items }) => (
  <div className="tc-section">
    <div className="tc-section-title">{title}</div>
    {intro && <p className="tc-section-intro">{intro}</p>}
    <ul className="tc-list">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

export default TcSection;
