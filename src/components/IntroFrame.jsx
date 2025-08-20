import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INTRO_VIDEO } from "../config.js";

export default function IntroFrame({ onFinished }) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const startVideo = async () => {
    setStarted(true);
    try {
      await videoRef.current.play();
      setIsPlaying(true);
    } catch (e) {
      console.error("Play failed", e);
    }
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onFinished?.();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      onFinished?.();
    };

    const checkTime = () => {
      if (v.currentTime >= 13) {
        v.pause();
        onFinished?.();
      }
    };

    v.addEventListener('play', handlePlay);
    v.addEventListener('pause', handlePause);
    v.addEventListener('ended', handleEnded);
    v.addEventListener("timeupdate", checkTime);
    
    return () => {
      v.removeEventListener('play', handlePlay);
      v.removeEventListener('pause', handlePause);
      v.removeEventListener('ended', handleEnded);
      v.removeEventListener("timeupdate", checkTime);
    };
  }, [onFinished]);

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0b 0%, #151518 100%)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Animated background elements */}
        <div style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: "radial-gradient(circle, rgba(82,213,147,0.05) 0%, transparent 70%)",
          animation: "pulse-slow 8s infinite ease-in-out"
        }}></div>
        
        <motion.video
          ref={videoRef}
          src={INTRO_VIDEO}
          style={{
            height: "100%",
            width: "auto",
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            zIndex: 2
          }}
          playsInline
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        />

        {/* Constant Skip Button (shown when video is playing) */}
        {isPlaying && (
          <motion.button
            onClick={handleSkip}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
              zIndex: 4,
              fontSize: "1rem",
              padding: "0.8rem 1.5rem",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backdropFilter: "blur(10px)",
              cursor: "pointer"
            }}
            whileHover={{ 
              background: "rgba(255,255,255,0.15)",
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
          >
            <XIcon /> Skip
          </motion.button>
        )}

        {!started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              background: "rgba(10,10,11,0.85)",
              zIndex: 3
            }}
          >
            <motion.button
              onClick={startVideo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontSize: "1.5rem",
                padding: "1.2rem 2.5rem",
                background: "rgba(82,213,147,0.15)",
                border: "1px solid rgba(82,213,147,0.4)",
                borderRadius: "16px",
                color: "#fff",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 30px rgba(82,213,147,0.2)"
              }}
            >
              <PlayIcon /> Play
            </motion.button>
            
            {showSkip && (
              <motion.button
                onClick={handleSkip}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                style={{
                  marginTop: "2rem",
                  fontSize: "1rem",
                  padding: "0.8rem 1.8rem",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "12px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <XIcon /> Skip
              </motion.button>
            )}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// SVG icon components
function PlayIcon() {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}