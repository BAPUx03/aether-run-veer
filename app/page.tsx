export default function Home() {
  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">AR</span>
          <span>
            <strong>AETHER RUN</strong>
            <small>SHARDFALL</small>
          </span>
        </div>
        <div className="tag"><i /> ORIGINAL BROWSER ADVENTURE</div>
      </header>

      <section className="game-stage" aria-label="Aether Run playable game">
        <iframe
          src="/game/index.html"
          title="Play Aether Run: Shardfall"
          allow="autoplay; fullscreen; gamepad"
        />
      </section>

      <footer className="footer">
        <p><b>Move</b> A/D or arrows <span>•</span> <b>Jump</b> W / Space <span>•</span> <b>Dash</b> Shift <span>•</span> <b>Pause</b> Esc</p>
        <p className="legal creator-links">
          <a href="https://github.com/PruthvirajsinhMakwana" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.instagram.com/pruthvirajsinh__makwana?igsh=Y2p4cTZzc2pza3d6&utm_source=qr" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/in/pruthvirajsinh-makwana-635974393?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
      </footer>
    </main>
  );
}
