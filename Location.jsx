const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { Image } from "@/components/ui/image";
import { MapPin, Navigation, Plane, Clock } from "lucide-react";

const VIEW_4 = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/44b35a2f8_WhatsAppImage2026-05-29at074946.jpeg";
const VIEW_2 = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/86fd60834_WhatsAppImage2026-05-29at074136.jpeg";

const HIGHLIGHTS = [
  { icon: Plane, label: "From Kandy", value: "≈ 2.5 hrs by road" },
  { icon: Navigation, label: "From Colombo", value: "≈ 4 hrs by road" },
  { icon: MapPin, label: "Nearest Village", value: "12 min · Meemure" },
  { icon: Clock, label: "Best Season", value: "Mar–Sep clear skies" },
];

export default function Location() {
  return (
    <section id="location" className="relative bg-background py-[14vh] md:py-[18vh]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-5 mist-reveal">
            <span className="font-cta text-[10px] tracking-wide-caps text-gold">05 — Location</span>
            <h2 className="mt-6 font-heading font-light text-[clamp(2.2rem,5vw,4rem)] tracking-luxe leading-[1.02]">
              On the edge of the Knuckles.
            </h2>
            <p className="mt-8 font-body text-lg leading-[1.7] text-foreground/70">
              Echo Knuckles sits at the threshold of the Knuckles Mountain Range —
              a UNESCO-listed cloud forest in the central highlands of Sri Lanka.
              The final ascent is a private gravel road; the last sound you hear
              before arrival is wind through the pines.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-px bg-border border border-border">
              {HIGHLIGHTS.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div key={h.label} className="bg-background p-5 mist-reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                    <Icon className="h-5 w-5 text-gold" strokeWidth={1.25} />
                    <p className="mt-3 font-cta text-[10px] tracking-wide-caps text-foreground/50">{h.label}</p>
                    <p className="mt-1 font-body text-sm text-foreground">{h.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center gap-3 font-mono text-[11px] tracking-wide-caps text-foreground/50">
              <MapPin className="h-4 w-4 text-gold" strokeWidth={1.25} />
              07°22′N · 80°45′E · Knuckles Range, Sri Lanka
            </div>
          </div>

          {/* Map concept */}
          <div className="md:col-span-7 mist-reveal" style={{ transitionDelay: "0.15s" }}>
            <div className="relative aspect-[4/3] md:aspect-[5/4] overflow-hidden border border-border">
              <Image
                src={VIEW_4}
                alt="Elevated view over the tropical highlands toward Echo Knuckles"
                fittingType="fill"
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-foreground/25" />

              {/* Topographic overlay grid */}
              <div className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 38px, hsl(var(--gold) / 0.4) 39px, transparent 40px), repeating-linear-gradient(90deg, transparent, transparent 38px, hsl(var(--gold) / 0.25) 39px, transparent 40px)",
                }}
              />

              {/* Pin */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className="font-cta text-[10px] tracking-wide-caps text-background bg-foreground/70 px-3 py-1 mb-2">
                  Echo Knuckles
                </span>
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-gold border-2 border-background" />
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-cta text-[9px] tracking-wide-caps text-background/80">
                <span>↑ Kandy</span>
                <span>Cloud Forest →</span>
              </div>
            </div>

            <p className="mt-4 font-body text-sm text-foreground/55 leading-relaxed">
              Arrival by private transfer arranged on request. The final stretch
              requires a 4×4 — provided as part of your booking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}