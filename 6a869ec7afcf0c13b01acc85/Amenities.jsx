const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { Image } from "@/components/ui/image";
import { Waves, Mountain, UtensilsCrossed, Wifi, Flame } from "lucide-react";

const POOL_IMG = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/4e52b560d_Screenshot2026-08-19at233357.png";
const VIEW_IMG = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/67afaf94f_Screenshot2026-08-19at233343.png";
const CHEF_IMG = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/a5baad79b_Screenshot2026-08-19at233135.png";
const FIRE_IMG = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/a9c130bf7_Screenshot2026-08-19at233448.png";

const AMENITIES = [
  {
    icon: Waves,
    title: "Private Pool",
    desc: "A heated infinity pool that spills toward the valley, mirroring the mist at dawn.",
    img: POOL_IMG,
  },
  {
    icon: Mountain,
    title: "Panoramic Views",
    desc: "Floor-to-ceiling glass framing the Knuckles range in every direction.",
    img: VIEW_IMG,
  },
  {
    icon: UtensilsCrossed,
    title: "Chef & Dining",
    desc: "A private chef crafting highland Sri Lankan menus from local produce.",
    img: CHEF_IMG,
  },
  {
    icon: Wifi,
    title: "Connected Quiet",
    desc: "High-speed Wi-Fi throughout — present when you need it, invisible when you don't.",
    img: null,
  },
  {
    icon: Flame,
    title: "Outdoor Firepit",
    desc: "A stone firepit for the cold mountain nights, beneath a sky of unblinking stars.",
    img: FIRE_IMG,
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className="relative bg-secondary/40 py-[14vh] md:py-[18vh] border-y border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mist-reveal">
          <div>
            <span className="font-cta text-[10px] tracking-wide-caps text-gold">02 — Amenities</span>
            <h2 className="mt-6 font-heading font-light text-[clamp(2.2rem,5vw,4rem)] tracking-luxe leading-[1.02] max-w-xl">
              Five reasons you may never leave the ridge.
            </h2>
          </div>
          <p className="font-body text-base text-foreground/60 max-w-xs md:text-right">
            Every amenity is private to your party. Nothing is shared, nothing is rushed.
          </p>
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {AMENITIES.map((a, i) => {
            const Icon = a.icon;
            return (
              <article
                key={a.title}
                className="group relative bg-background p-8 md:p-10 min-h-[20rem] flex flex-col justify-between mist-reveal overflow-hidden"
                style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
              >
                {a.img && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <Image src={a.img} alt={a.title} fittingType="fill" className="w-full h-full" />
                    <div className="absolute inset-0 bg-foreground/55" />
                  </div>
                )}
                <div className="relative z-10">
                  <Icon className="h-7 w-7 text-gold group-hover:text-gold transition-colors" strokeWidth={1.25} />
                  <h3 className="mt-8 font-heading font-light text-2xl md:text-3xl tracking-luxe group-hover:text-background transition-colors">
                    {a.title}
                  </h3>
                </div>
                <p className="relative z-10 mt-6 font-body text-sm md:text-base leading-[1.65] text-foreground/65 group-hover:text-background/80 transition-colors">
                  {a.desc}
                </p>
              </article>
            );
          })}

          {/* Sixth cell — accent quote */}
          <div className="bg-accent text-accent-foreground p-8 md:p-10 min-h-[20rem] flex flex-col justify-center">
            <span className="font-cta text-[10px] tracking-wide-caps text-gold">And more</span>
            <p className="mt-6 font-heading font-light text-2xl md:text-3xl tracking-luxe leading-snug">
              Yoga deck · Cold plunge · Library · Star-gazing terrace
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}