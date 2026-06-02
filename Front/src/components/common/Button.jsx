import React from 'react';

/**
 * SonTerry Premium Button
 *
 * Variants: primary | secondary | accent | outline | text
 */
const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  style = {},
}) => {
  return (
    <>


      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        style={style}
        className={`snt-btn snt-btn-${variant} ${className}`}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
