import React from 'react';

const SpStepCard = ({ step, index }) => {
  const { icon: Icon, color, bg, title, desc } = step;
  return (
    <div className="sp-step">
      <div className="sp-step-num">{index + 1}</div>
      <div className="sp-step-icon" style={{ background: bg }}>
        <Icon size={22} strokeWidth={1.8} color={color} />
      </div>
      <div>
        <div className="sp-step-title">{title}</div>
        <p className="sp-step-desc">{desc}</p>
      </div>
    </div>
  );
};

export default SpStepCard;
