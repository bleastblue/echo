const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from "react";
import { X, Check } from "lucide-react";

export default function ReservationModal({ open, onClose }) {
  const [form, setForm] = useState({
    guest_name: "",
    email: "",
    phone: "",
    check_in: "",
    check_out: "",
    guest_count: 2,
    special_requests: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.check_out <= form.check_in) {
      setError("Check-out must be after check-in.");
      return;
    }
    setSubmitting(true);
    try {
      await db.entities.Booking.create({ ...form, status: "pending" });
      setDone(true);
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const close = () => {
    setDone(false);
    setError("");
    setForm({
      guest_name: "",
      email: "",
      phone: "",
      check_in: "",
      check_out: "",
      guest_count: 2,
      special_requests: "",
    });
    onClose();
  };

  const field = "w-full bg-transparent border-0 border-b border-border focus:border-gold focus:outline-none py-3 font-body text-base text-foreground placeholder:text-foreground/35 transition-colors";
  const label = "font-cta text-[10px] tracking-wide-caps text-foreground/50";

  return (
    <div className="fixed inset-0 z-[90] bg-foreground/80 backdrop-blur-md flex items-stretch md:items-center justify-center">
      <div className="relative w-full md:max-w-2xl bg-background h-full md:h-auto md:max-h-[92vh] overflow-y-auto no-scrollbar">
        <button
          onClick={close}
          className="absolute top-5 right-5 text-foreground/60 hover:text-foreground transition-colors z-10"
          aria-label="Close"
        >
          <X className="h-6 w-6" strokeWidth={1.25} />
        </button>

        {done ? (
          <div className="h-full min-h-[60vh] flex flex-col items-center justify-center px-8 text-center">
            <div className="h-16 w-16 rounded-full border border-gold flex items-center justify-center">
              <Check className="h-8 w-8 text-gold" strokeWidth={1.25} />
            </div>
            <h3 className="mt-8 font-heading font-light text-3xl md:text-4xl tracking-luxe">
              Request received.
            </h3>
            <p className="mt-4 font-body text-base text-foreground/65 max-w-sm leading-relaxed">
              Thank you, {form.guest_name.split(" ")[0] || "guest"}. Our concierge will
              confirm your dates within 24 hours. A confirmation will arrive at
              <span className="text-foreground"> {form.email}</span>.
            </p>
            <button
              onClick={close}
              className="mt-10 font-cta text-[11px] tracking-wide-caps px-8 py-3.5 bg-foreground text-background hover:bg-accent transition-colors"
            >
              Return to the sanctuary
            </button>
          </div>
        ) : (
          <div className="px-6 md:px-14 py-16 md:py-20">
            <span className="font-cta text-[10px] tracking-wide-caps text-gold">Reservation Inquiry</span>
            <h2 className="mt-5 font-heading font-light text-[clamp(2rem,5vw,3.5rem)] tracking-luxe leading-[1.02]">
              Request your stay.
            </h2>
            <p className="mt-4 font-body text-base text-foreground/60 max-w-md leading-relaxed">
              This is a private inquiry — not an instant booking. Our concierge
              responds personally to every request.
            </p>

            <form onSubmit={submit} className="mt-10 space-y-7">
              <div>
                <label className={label}>Full Name</label>
                <input
                  className={field}
                  value={form.guest_name}
                  onChange={(e) => set("guest_name", e.target.value)}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div>
                  <label className={label}>Email</label>
                  <input
                    type="email"
                    className={field}
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    required
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className={label}>Phone</label>
                  <input
                    type="tel"
                    className={field}
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    required
                    placeholder="+94 ..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                <div>
                  <label className={label}>Check-In</label>
                  <input
                    type="date"
                    className={field}
                    value={form.check_in}
                    onChange={(e) => set("check_in", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className={label}>Check-Out</label>
                  <input
                    type="date"
                    className={field}
                    value={form.check_out}
                    onChange={(e) => set("check_out", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className={label}>Guests</label>
                  <select
                    className={field}
                    value={form.guest_count}
                    onChange={(e) => set("guest_count", Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={label}>Special Requests</label>
                <textarea
                  className={`${field} resize-none`}
                  rows={3}
                  value={form.special_requests}
                  onChange={(e) => set("special_requests", e.target.value)}
                  placeholder="Dietary needs, celebrations, arrival time..."
                />
              </div>

              {error && (
                <p className="font-body text-sm text-destructive">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="group w-full bg-foreground text-background py-5 font-cta text-[11px] tracking-wide-caps hover:bg-accent transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Submit Inquiry
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}