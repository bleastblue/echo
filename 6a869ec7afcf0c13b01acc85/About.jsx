const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { Image } from "@/components/ui/image";

const POOL_IMG = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/e7b703969_WhatsAppImage2026-05-29at074125.jpeg";
const STONE_IMG = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/a5baad79b_Screenshot2026-08-19at233135.png";

export default function About() {
  return (
    <section id="experience" className="relative bg-background py-[14vh] md:py-[18vh]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
          <div className="md:col-span-5 mist-reveal">
            <span className="font-cta text-[10px] tracking-wide-caps text-gold">
              01 — The Experience
            </span>
            <h2 className="mt-6 font-heading font-light text-[clamp(2.2rem,5vw,4rem)] tracking-luxe leading-[1.02]">
              The luxury of space, the silence of the mist.
            </h2>
          </div>

          <div className="md:col-span-6 md:col-start-7 mist-reveal" style={{ transitionDelay: "0.15s" }}>
            <p className="font-body text-lg md:text-xl leading-[1.7] text-foreground/75">
              Echo Knuckles is a single-villa retreat carved into the ridge of the
              Knuckles Mountain Range. There are no neighbours, no schedules, no
              noise — only the slow drift of cloud across the valley and the
              deliberate lines of architecture designed to disappear into the land.
            </p>
            <p className="mt-6 font-body text-base md:text-lg leading-[1.7] text-foreground/60">
              Privacy is absolute. Nature is immediate. Every surface — cold stone,
              warm timber, raw concrete — is chosen to ground you in the highland
              air. This is not a hotel. It is a threshold.
            </p>
          </div>
        </div>

        {/* Overlapping tectonic plates */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0">
          <div className="md:col-span-7 mist-reveal">
            <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden">
              <Image
                src={POOL_IMG}
                alt="Infinity pool reflecting misty mountain peaks at dawn"
                fittingType="fill"
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="md:col-span-5 md:-mt-24 md:ml-[-6%] mist-reveal" style={{ transitionDelay: "0.2s" }}>
            <div className="aspect-square overflow-hidden border border-border">
              <Image
                src={STONE_IMG}
                alt="Macro texture of a cold stone wall"
                fittingType="fill"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Three pillars */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {[
            { n: "Privacy", d: "One villa. One party. No shared walls, no shared skies. The ridge belongs to you alone." },
            { n: "Nature", d: "Bordering protected cloud forest. Mist, endemic birds, and a sky that clears only for the stars." },
            { n: "Architecture", d: "Brutalist concrete, warm timber, and glass that frames the range like a held breath." },
          ].map((p, i) => (
            <div key={p.n} className="mist-reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
              <span className="font-cta text-[10px] tracking-wide-caps text-gold">0{i + 1}</span>
              <h3 className="mt-4 font-heading font-light text-2xl md:text-3xl tracking-luxe">{p.n}</h3>
              <div className="hairline my-5 w-12" />
              <p className="font-body text-base leading-[1.7] text-foreground/65">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}