import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "94770000000"; // placeholder — owner sets real number
const MESSAGE = "Hello Echo Knuckles, I'd like to inquire about availability for a stay.";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`glass-fab fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[70] flex items-center gap-3 rounded-full pl-4 pr-5 py-3.5 text-background transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <MessageCircle className="h-5 w-5 text-background" strokeWidth={1.5} />
      <span className="font-cta text-[10px] tracking-wide-caps text-background">
        Concierge
      </span>
    </a>
  );
}