export default function Footer({ onBook }) {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <h3 className="font-heading font-light text-4xl md:text-6xl tracking-luxe leading-[0.95]">
              Echo<span className="text-gold">.</span>Knuckles
            </h3>
            <p className="mt-6 font-body text-base text-background/60 max-w-sm leading-relaxed">
              A single-villa sanctuary in the mist-shrouded Knuckles Mountain Range.
              Unplug in elevated luxury.
            </p>
            <button
              onClick={onBook}
              className="mt-8 font-cta text-[11px] tracking-wide-caps px-7 py-3.5 border border-background/30 hover:bg-background hover:text-foreground transition-colors"
            >
              Book Your Stay
            </button>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <span className="font-cta text-[10px] tracking-wide-caps text-gold">Contact</span>
            <ul className="mt-5 space-y-3 font-body text-sm text-background/70">
              <li>Knuckles Range, Sri Lanka</li>
              <li>07°22′N · 80°45′E</li>
              <li><a href="tel:+94770000000" className="hover:text-background transition-colors">+94 77 000 0000</a></li>
              <li><a href="mailto:stay@echoknuckles.com" className="hover:text-background transition-colors">stay@echoknuckles.com</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <span className="font-cta text-[10px] tracking-wide-caps text-gold">Explore</span>
            <ul className="mt-5 space-y-3 font-body text-sm text-background/70">
              <li><button onClick={() => document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-background transition-colors">Experience</button></li>
              <li><button onClick={() => document.querySelector("#amenities")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-background transition-colors">Amenities</button></li>
              <li><button onClick={() => document.querySelector("#dining")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-background transition-colors">Dining</button></li>
              <li><button onClick={() => document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-background transition-colors">Gallery</button></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-cta text-[10px] tracking-wide-caps text-background/40">
            © {new Date().getFullYear()} Echo Knuckles · All rights reserved
          </p>
          <p className="font-cta text-[10px] tracking-wide-caps text-background/40">
            Crafted in the highlands
          </p>
        </div>
      </div>
    </footer>
  );
}