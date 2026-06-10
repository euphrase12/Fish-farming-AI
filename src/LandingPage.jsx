export default function LandingPage({ onStart, onLearn }) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🐟 Smart Fish Farming AI</h1>
      <p>Vugurura Ubworozi Bw’amafi Ukoresheje AI</p>
      <button onClick={onStart}>Start</button>
      <button onClick={onLearn}>Learn More</button>
    </div>
  );
}
