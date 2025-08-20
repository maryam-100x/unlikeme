import { useState } from "react";
import IntroFrame from "./components/IntroFrame";
import Landing from "./components/Landing";

export default function App() {
  const [phase, setPhase] = useState("intro"); // intro | landing
  
  return phase === "intro" ? (
    <IntroFrame onFinished={() => setPhase("landing")} />
  ) : (
    <Landing />
  );
}