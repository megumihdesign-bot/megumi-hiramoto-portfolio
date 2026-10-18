import { Link } from 'react-router-dom';
import { PointerEvent, ReactNode } from 'react';

/**
 * Shared button. Default: cobalt fill, cream label.
 * Hover / keyboard focus: a cream circle wipes out from where the pointer entered, carrying a
 * cobalt outline and cobalt label with it. The duplicate label sits in the wiping layer, so the
 * text changes colour exactly as the fill passes over it rather than cross-fading separately.
 */
export const WipeButton = ({
  to,
  href,
  type = 'button',
  variant = 'default',
  children,
  className = '',
}: {
  /** internal route */
  to?: string;
  /** external link (opens in a new tab) */
  href?: string;
  type?: 'button' | 'submit';
  /** 'inverse' starts cream with a cobalt outline and wipes to cobalt */
  variant?: 'default' | 'inverse';
  children: ReactNode;
  className?: string;
}) => {
  const setOrigin = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  const common = {
    className: `btn-wipe ${variant === 'inverse' ? 'btn-wipe--inverse' : ''} inline-block text-sm font-medium px-6 py-4 text-center ${className}`,
    onPointerEnter: setOrigin,
    onPointerLeave: setOrigin,
  };

  const content = (
    <>
      <span className="btn-wipe__label">{children}</span>
      <span className="btn-wipe__fill" aria-hidden="true">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...common}>
        {content}
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} {...common}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} {...common}>
      {content}
    </button>
  );
};
