const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from "react";
import { Image } from "@/components/ui/image";

const POTATO = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/13ef7155d_generated_image.png";
const PAPADAM = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/793349125_generated_image.png";
const CURRY = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/99c0601d9_generated_image.png";
const DRINKS = "https://media.db.com/images/public/6a869ec7afcf0c13b01acc85/a3f163053_generated_image.png";

const TABS = {
  breakfast: {
    img: POTATO,
    items: [
      { name: "Potato Tempered", desc: "mustard seed · curry leaf · turmeric · lime" },
      { name: "Hoppers & Egg", desc: "rice flour batter · coconut sambol · farm egg" },
      { name: "Highland Fruit Plate", desc: "mango · passionfruit · banana · wood apple" },
      { name: "Coconut Pancakes", desc: "rice pancake · palm treacle · toasted cashew" },
      { name: "Single-Origin Coffee", desc: "estate-roasted · Knuckles highlands" },
    ],
  },
  lunch: {
    img: CURRY,
    items: [
      { name: "Jackfruit Curry", desc: "young jackfruit · coconut milk · roasted spice" },
      { name: "Dhal Temper", desc: "red dhal · pandan · coconut milk" },
      { name: "Papadam", desc: "crisp lentur wafer · black pepper" },
      { name: "Rice & Sambol", desc: "red raw rice · coconut sambol · lime" },
      { name: "Grilled Highland Greens", desc: "garden leaves · cold-pressed oil · sea salt" },
    ],
  },
  drinks: {
    img: DRINKS,
    items: [
      { name: "Tropical Cooler", desc: "lime · mint · soda · mountain ice" },
      { name: "King Coconut", desc: "whole · chilled · straight from the estate" },
      { name: "Wood Apple Fizz", desc: "wood apple · ginger · sparkling water" },
      { name: "Spiced Cacao", desc: "single-origin · cardamom · raw honey" },
      { name: "Mist Old-Fashioned", desc: "local arrack · palm sugar · orange peel" },
    ],
  },
};

const ORDER = ["breakfast", "lunch", "drinks"];

export default function Dining() {
  const [tab, setTab] = useState("breakfast");
  const active = TABS[tab];

  return (
    <section id="dining" className="relative bg-background py-[14vh] md:py-[18vh]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mist-reveal">
          <div>
            <span className="font-cta text-[10px] tracking-wide-caps text-gold">03 — Culinary Topography</span>
            <h2 className="mt-6 font-heading font-light text-[clamp(2.2rem,5vw,4rem)] tracking-luxe leading-[1.02] max-w-xl">
              Local cuisine, elevated to fine art.
            </h2>
          </div>
          <p className="font-body text-base text-foreground/60 max-w-xs md:text-right">
            A private chef. Hyper-local produce. Menus that change with the mist.
          </p>
        </div>

        {/* Toggle tabs */}
        <div className="mt-12 md:mt-16 flex items-center gap-1 border-b border-border">
          {ORDER.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative font-cta text-[11px] tracking-wide-caps px-5 md:px-8 py-4 transition-colors ${
                tab === t ? "text-foreground" : "text-foreground/40 hover:text-foreground/70"
              }`}
            >
              {t === "lunch" ? "Lunch / Dinner" : t.charAt(0).toUpperCase() + t.slice(1)}
              {tab === t && (
                <span className="absolute left-0 right-0 -bottom-px h-px bg-gold" />
              )}
            </button>
          ))}
        </div>

        {/* Morphing grid */}
        <div key={tab} className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-6 mist-reveal">
            <div className="aspect-[4/3] overflow-hidden">
              <Image
                src={active.img}
                alt={`${tab} menu`}
                fittingType="fill"
                className="w-full h-full transition-all duration-700"
              />
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8 flex flex-col justify-center">
            <ul className="divide-y divide-border">
              {active.items.map((item, i) => (
                <li
                  key={item.name}
                  className="py-5 mist-reveal"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-heading font-light text-xl md:text-2xl tracking-luxe">
                      {item.name}
                    </h3>
                  </div>
                  <p className="mt-1.5 font-mono text-[10px] md:text-[11px] tracking-wide-caps text-foreground/50">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Papadam accent strip */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 mist-reveal">
            <div className="aspect-square overflow-hidden">
              <Image src={PAPADAM} alt="Papadam" fittingType="fill" className="w-full h-full" />
            </div>
          </div>
          <div className="md:col-span-7 md:col-start-6 mist-reveal">
            <p className="font-heading font-light text-2xl md:text-4xl tracking-luxe leading-snug text-foreground/85">
              "We cook what the mountain gives us that morning. No menu is ever repeated."
            </p>
            <p className="mt-6 font-cta text-[11px] tracking-wide-caps text-gold">
              — Resident Chef, Echo Knuckles
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}