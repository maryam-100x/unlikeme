import { useState } from "react";

export default function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <button 
      onClick={doCopy}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        padding: "0.8rem 1.5rem",
        background: copied ? "rgba(82, 213, 147, 0.2)" : "rgba(255,255,255,0.1)",
        border: copied ? "1px solid rgba(82, 213, 147, 0.5)" : "1px solid rgba(255,255,255,0.2)",
        borderRadius: "8px",
        color: "#fff",
        fontSize: "0.9rem",
        fontWeight: "500",
        transition: "all 0.2s ease",
        marginTop: "1rem"
      }}
    >
      {copied ? (
        <>
          <CheckIcon /> Copied!
        </>
      ) : (
        <>
          <CopyIcon /> Copy CA
        </>
      )}
    </button>
  );
}

// SVG icon components
function CheckIcon() {
  return (
    <svg 
      className="icon icon-sm" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      style={{ color: '#52d593' }}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg 
      className="icon icon-sm" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}