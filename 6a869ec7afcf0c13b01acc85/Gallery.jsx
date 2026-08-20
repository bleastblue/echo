const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useCallback, useEffect } from "react";
import { Image } from "@/components/ui/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Real photographs of the actual Echo Knuckles property & surroundings
const VIEW_1 = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/e7b703969_WhatsAppImage2026-05-29at074125.jpeg";
const VIEW_2 = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/86fd60834_WhatsAppImage2026-05-29at074136.jpeg";
const VIEW_3 = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/566ad8410_WhatsAppImage2026-05-29at074638.jpeg";
const VIEW_4 = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/44b35a2f8_WhatsAppImage2026-05-29at074946.jpeg";
const RECEPTION = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/a5baad79b_Screenshot2026-08-19at233135.png";
const SUNSET_CLOUDS = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/d3013eb9f_Screenshot2026-08-19at233317.png";
const SEATING = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/67afaf94f_Screenshot2026-08-19at233343.png";
const BALCONY_SUNSET = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/4e52b560d_Screenshot2026-08-19at233357.png";
const EXTERIOR = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/02dc9580a_Screenshot2026-08-19at233412.png";
const TWILIGHT = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/a9c130bf7_Screenshot2026-08-19at233448.png";

const GALLERY = [
  { src: SUNSET_CLOUDS, alt: "Sea of clouds at sunset over the Knuckles range", span: "lg:col-span-2 lg:row-span-2" },
  { src: RECEPTION, alt: "The reception — warm amber-lit welcome at Echo Knuckles", span: "" },
  { src: VIEW_1, alt: "Panoramic view of the Knuckles range from the villa", span: "" },
  { src: SEATING, alt: "Interior seating area facing the mist through glass", span: "lg:col-span-2" },
  { src: BALCONY_SUNSET, alt: "Balcony view at sunset over the mountains", span: "" },
  { src: EXTERIOR, alt: "The Echo Knuckles exterior at twilight", span: "" },
  { src: TWILIGHT, alt: "Knuckles mountain silhouettes at twilight", span: "lg:col-span-2" },
  { src: VIEW_2, alt: "Mountain range vista over the valley", span: "" },
  { src: VIEW_3, alt: "Hillside path and forested slopes", span: "" },
  { src: VIEW_4, alt: "Elevated view over the tropical highlands", span: "" },
];

export default function Gallery() {
  const [index, setIndex] = useState(null);

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % GALLERY.length)), []);
  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length)), []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, next, prev]);

  return (
    <section id="gallery" className="relative bg-secondary/40 py-[14vh] md:py-[18vh] border-y border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mist-reveal">
          <div>
            <span className="font-cta text-[10px] tracking-wide-caps text-gold">04 — Gallery</span>
            <h2 className="mt-6 font-heading font-light text-[clamp(2.2rem,5vw,4rem)] tracking-luxe leading-[1.02]">
              The view, the villa, the quiet.
            </h2>
          </div>
          <p className="font-body text-base text-foreground/60 max-w-xs md:text-right">
            Tap any frame to enter. These are the actual views from the ridge.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-4 auto-rows-[14rem] md:auto-rows-[16rem] gap-3 md:gap-4">
          {GALLERY.map((g, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`group relative overflow-hidden mist-reveal ${g.span}`}
            >
              <Image
                src={g.src}
                alt={g.alt}
                fittingType="fill"
                className="w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/25 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-cta text-[10px] tracking-wide-caps text-background">
                  {g.alt}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {index !== null && (
        <div
          className="fixed inset-0 z-[80] bg-foreground/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-6 right-6 text-background/70 hover:text-background transition-colors"
            aria-label="Close"
          >
            <X className="h-7 w-7" strokeWidth={1.25} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 text-background/60 hover:text-background transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-9 w-9" strokeWidth={1} />
          </button>
          <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-[3/2] overflow-hidden">
              <Image src={GALLERY[index].src} alt={GALLERY[index].alt} fittingType="fit" className="w-full h-full" />
            </div>
            <figcaption className="mt-4 text-center font-cta text-[11px] tracking-wide-caps text-background/60">
              {GALLERY[index].alt} · {index + 1} / {GALLERY.length}
            </figcaption>
          </figure>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 text-background/60 hover:text-background transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-9 w-9" strokeWidth={1} />
          </button>
        </div>
      )}
    </section>
  );
}