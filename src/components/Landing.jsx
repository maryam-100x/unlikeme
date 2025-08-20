import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import ActionButton from "./ActionButton";
import {
  COIN_NAME,
  TICKER,
  CONTRACT_ADDRESS,
  DEXSCREENER_URL,
  PUMPFUN_URL,
  X_COMMUNITY_URL,
} from "../config.js";
import introVideo from "../assets/intro.mp4"; // Make sure the path is correct

// Header component with clickable Ticker
function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(15, 15, 18, 0.5)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        zIndex: 1000,
      }}
    >
      {/* This link will now refresh the page */}
      <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ fontWeight: "600", color: "#52d593", fontSize: "1.2rem" }}>
          {TICKER}
        </div>
      </a>
      <ActionButton href={X_COMMUNITY_URL} small>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ marginRight: '8px' }}
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Community
      </ActionButton>
    </motion.header>
  );
}

export default function Landing() {
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };
  
  // Effect to handle the custom 14-second loop
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleTimeUpdate = () => {
      if (videoElement.currentTime >= 14) {
        videoElement.currentTime = 0; // Reset time to loop
      }
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);


  return (
    <>
      <Header />
      <div
        className="fullscreen-container"
        style={{
          background: "linear-gradient(135deg, #0a0a0b 0%, #151518 50%, #0f0f12 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background elements */}
        <div style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(82,213,147,0.1) 0%, transparent 70%)",
          filter: "blur(20px)",
          animation: "pulse-slow 6s infinite ease-in-out"
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "5%",
          right: "15%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(82,213,147,0.08) 0%, transparent 70%)",
          filter: "blur(15px)",
          animation: "pulse-slow 8s infinite ease-in-out"
        }}></div>

        <motion.div
          className="glass main-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="content-wrapper">
            {/* Left Column: Info */}
            <motion.div
              className="info-column"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <div style={{
                background: "linear-gradient(135deg, rgba(82,213,147,0.1) 0%, rgba(82,213,147,0.05) 100%)",
                borderRadius: "16px",
                padding: "0.5rem 1rem",
                display: "inline-block",
                marginBottom: "1.5rem",
                border: "1px solid rgba(82,213,147,0.2)"
              }}>
                <p style={{ fontSize: "0.9rem", fontWeight: "500", color: "#52d593", letterSpacing: "0.5px" }}>
                  {TICKER}
                </p>
              </div>

              <h1 style={{
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                fontWeight: "700",
                background: "linear-gradient(135deg, #fff 0%, #52d593 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "1rem",
                textAlign: 'left'
              }}>
                {COIN_NAME}
              </h1>
              
              <p style={{
  color: '#a0aec0',
  marginBottom: '2rem',
  textAlign: 'left',
  maxWidth: '450px',
  lineHeight: '1.6',
  fontSize: '.9rem',
  letterSpacing: '0.05em', // Adds space between letters
  wordSpacing: '0.2em' // Adds space between words
}}>
  The official coin of the Unlike Me&nbsp;
  <a 
    href="https://www.tiktok.com/search?q=unlike%20me&t=1755706763212" 
    target="_blank" 
    rel="noopener noreferrer"
    style={{
      color: '#52d593',
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlineOffset: '3px'
    }}
  >
    TikTok trend
  </a>.
  Launched on Solana.
</p>

              <motion.div
                onClick={copyToClipboard}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  padding: "1rem",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  marginBottom: "2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  position: "relative"
                }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(82,213,147,0.05)",
                  borderColor: "rgba(82,213,147,0.2)"
                }}
                whileTap={{ scale: 0.98 }}
                animate={copied ? {
                  backgroundColor: "rgba(82,213,147,0.1)",
                  borderColor: "rgba(82,213,147,0.3)"
                } : {}}
              >
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                      position: "absolute",
                      top: "-40px",
                      left: 0,
                      background: "rgba(82,213,147,0.9)",
                      color: "white",
                      padding: "0.5rem 1rem",
                      borderRadius: "8px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Copied!
                  </motion.div>
                )}
                <code style={{
                  fontSize: "0.85rem",
                  color: "#a0aec0",
                  fontFamily: "'Fira Code', monospace",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {CONTRACT_ADDRESS}
                </code>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "#52d593", flexShrink: 0 }}>
                  {copied ? <path d="M20 6L9 17l-5-5" /> : <> <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></>}
                </svg>
              </motion.div>

              <div style={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                gap: "1rem"
              }}>
                <ActionButton href={PUMPFUN_URL}>
                  <img src="./pump.png" alt="Pump.fun" style={{ width: "44px", height: "44px", marginRight: '8px' }} />
                  Pump.fun
                </ActionButton>
                <ActionButton href={DEXSCREENER_URL}>
                  <img src="./dex.png" alt="Dexscreener" style={{ width: "20px", height: "20px", marginRight: '8px' }} />
                  Dexscreener
                </ActionButton>
              </div>
            </motion.div>

            {/* Right Column: Video */}
            <motion.div
              className="video-column"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <div className="video-frame">
                <video
                  ref={videoRef}
                  src={introVideo}
                  autoPlay
                  loop
                  muted={isMuted} // Controlled by state
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "24px",
                  }}
                />
                <button 
                  className="mute-button" 
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MutedIcon /> : <UnmutedIcon />}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

// SVG Icons for the mute button
const MutedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);

const UnmutedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
  </svg>
);