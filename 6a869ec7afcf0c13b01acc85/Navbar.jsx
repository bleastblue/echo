import { useEffect, useState } from "react";

export default function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Experience", href: "#experience" },
    { label: "Amenities", href: "#amenities" },
    { label: "Dining", href: "#dining" },
    { label: "Gallery", href: "#gallery" },
    { label: "Location", href: "#location" },
  ];

  const go = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-heading text-lg md:text-xl tracking-luxe text-foreground"
        >
          Echo<span className="text-gold">.</span>Knuckles
        </button>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="font-cta text-[11px] tracking-wide-caps text-foreground/70 hover:text-foreground transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onBook}
            className="hidden md:inline-flex font-cta text-[11px] tracking-wide-caps px-5 py-2.5 border border-foreground/30 hover:bg-foreground hover:text-background transition-colors"
          >
            Book Your Stay
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 -mr-2"
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span className={`block h-px w-6 bg-foreground transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block h-px w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-6 bg-foreground transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 bg-background/95 backdrop-blur-md border-b border-border ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="text-left font-cta text-xs tracking-wide-caps py-3 border-b border-border/50 text-foreground/80"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { setOpen(false); onBook(); }}
            className="mt-4 font-cta text-xs tracking-wide-caps px-5 py-3 bg-foreground text-background"
          >
            Book Your Stay
          </button>
        </nav>
      </div>
    </header>
  );
}