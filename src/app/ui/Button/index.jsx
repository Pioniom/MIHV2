import React from 'react';
import { Icon } from '@iconify/react';
import Link from "next/link";

export default function Button({ btnLink, btnText, variant, icon, onClick, disabled, ...props }) {
  const buttonContent = (
    <>
      <span>{btnText}</span>
      {icon ? icon : <Icon icon="bi:arrow-right" />}
    </>
  );

  // If onClick is provided, render as button
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={variant ? `cs-text_btn ${variant}` : 'cs-text_btn'}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }

  // If btnLink is provided, render as Link
  if (btnLink) {
    return (
      <Link
        href={btnLink}
        className={variant ? `cs-text_btn ${variant}` : 'cs-text_btn'}
        {...props}
      >
        {buttonContent}
      </Link>
    );
  }

  // Fallback: render as button without href
  return (
    <button
      type="button"
      className={variant ? `cs-text_btn ${variant}` : 'cs-text_btn'}
      {...props}
    >
      {buttonContent}
    </button>
  );
}
