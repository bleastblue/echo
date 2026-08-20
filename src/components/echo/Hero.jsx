const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useRef } from "react";

const HERO_VIDEO =
  "https://media.db.com/videos/public/6a869ec7afcf0c13b01acc85/49868d5fe_timela.mp4";
const HERO_POSTER = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/d3013eb9f_Screenshot2026-08-19at233317.png";

export default function Hero({ onBook }) {
  const videoRef = useRef(null);

  const takeTour = () => {
    const el = document.getElementById("experience");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-foreground">
      {/* Ambient timelapse background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={HERO_POSTER}
        onEnded={(e) => e.currentTarget.pause()}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Dark gradient overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/25 to-foreground/70" />
      <div className="absolute inset-0 bg-foreground/15" />

      {/* Overlay content */}
      <div className="absolute inset-0 px-6 md:px-12 flex flex-col justify-between text-background py-24 md:py-28">
        <div className="flex justify-between items-start">
          <span className="font-cta text-[10px] md:text-xs tracking-wide-caps text-background/80">
            Knuckles Range · Sri Lanka
          </span>
          <span className="hidden md:block font-cta text-[10px] tracking-wide-caps text-background/80">
            07°22′N · 80°45′E
          </span>
        </div>

        <div className="flex flex-col items-center text-center gap-6 -mt-8">
          <h1 className="hero-title text-background text-[clamp(3rem,11vw,9rem)]">
            Echo Knuckles
          </h1>
          <p className="font-heading font-light italic text-background/90 text-[clamp(1.1rem,2.4vw,1.75rem)] tracking-luxe">
            Where luxury meets mist
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <button
              onClick={onBook}
              className="font-cta text-[11px] tracking-wide-caps px-9 py-4 bg-gold text-foreground hover:bg-background hover:text-foreground transition-colors"
            >
              Reserve Your Stay
            </button>
            <button
              onClick={takeTour}
              className="font-cta text-[11px] tracking-wide-caps px-9 py-4 border border-background/60 text-background hover:bg-background hover:text-foreground transition-colors"
            >
              Take a Tour
            </button>
          </div>
        </div>

        <div />
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-background/60">
        <span className="font-cta text-[9px] tracking-wide-caps">Scroll</span>
        <span className="block h-10 w-px bg-background/40 animate-pulse" />
      </div>
    </section>
  );
}