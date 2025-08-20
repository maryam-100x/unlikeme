export default function ActionButton({ as = 'a', href, onClick, children, style = {}, ...props }) {
  const commonStyles = {
    padding: '1rem 2rem',
    margin: '0.5rem',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(82, 213, 147, 0.1)',
    color: '#fff',
    border: '1px solid rgba(82, 213, 147, 0.3)',
    position: 'relative',
    overflow: 'hidden',
  };

  const hoverStyles = {
    background: 'rgba(82, 213, 147, 0.2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 20px rgba(82, 213, 147, 0.15)',
  };

  const handleMouseEnter = (e) => {
    Object.assign(e.target.style, hoverStyles);
  };

  const handleMouseLeave = (e) => {
    Object.assign(e.target.style, commonStyles);
  };

  if (as === 'a') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        style={{ ...commonStyles, ...style }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
        <ExternalLinkIcon />
      </a>
    );
  }
  
  return (
    <button
      onClick={onClick}
      style={{ ...commonStyles, ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}

// Simple SVG icon components
function ExternalLinkIcon() {
  return (
    <svg 
      className="icon icon-sm" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}