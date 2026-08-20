import { useState } from "react";
import Navbar from "@/components/echo/Navbar";
import Hero from "@/components/echo/Hero";
import About from "@/components/echo/About";
import Amenities from "@/components/echo/Amenities";
import Dining from "@/components/echo/Dining";
import Gallery from "@/components/echo/Gallery";
import Location from "@/components/echo/Location";
import Footer from "@/components/echo/Footer";
import WhatsAppButton from "@/components/echo/WhatsAppButton";
import ReservationModal from "@/components/echo/ReservationModal";
import { useMistReveal } from "@/components/echo/useMistReveal";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  useMistReveal();

  const openBooking = () => setBookingOpen(true);

  return (
    <div className="bg-background">
      <Navbar onBook={openBooking} />
      <main>
        <Hero onBook={openBooking} />
        <About />
        <Amenities />
        <Dining />
        <Gallery />
        <Location />
      </main>
      <Footer onBook={openBooking} />
      <WhatsAppButton />
      <ReservationModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}