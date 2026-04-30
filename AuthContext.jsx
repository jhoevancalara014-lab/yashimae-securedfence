import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../lib/api";
import { ArrowRight, ShieldCheck, Hammer, Layers, MessageSquare } from "lucide-react";

const HERO_IMG =
  "https://static.prod-images.emergentagent.com/jobs/f003a9f9-1f96-4683-8169-b035705d3515/images/665e903ced3f023a7492f81084ba07e779e404cff85015efbe85e6a3f7e577dc.png";

const WHY_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Hardened Spec",
    body: "Galvanized & powder-coated finishes built to outlast weather and tampering.",
  },
  {
    icon: Hammer,
    title: "In-house crew",
    body: "No subcontractor roulette. Our welders cut, weld, and install every job.",
  },
  {
    icon: Layers,
    title: "Sized to spec",
    body: "Stock variants in 4–10 ft heights, plus full-custom builds for unusual sites.",
  },
  {
    icon: MessageSquare,
    title: "Live support",
    body: "Logged-in chat with our admins — real time, on the record, on your project.",
  },
];

export default function Landing() {
  const [services, setServices] = useState([]);
  const [servicesError, setServicesError] = useState(false);

  useEffect(() => {
    api
      .get("/services")
      .then(({ data }) => setServices(data || []))
      .catch(() => setServicesError(true));
  }, []);

  return (
    <div className="bg-[#F4F4F0] min-h-screen">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative border-b-2 border-[#0A0A0A] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.6) 55%, rgba(10,10,10,0.25) 100%)",
            }}
          />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-24 md:py-36 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Headline */}
          <div className="md:col-span-8 text-[#F4F4F0]">
            <div className="font-mono-label text-[#FF4500] mb-4 sm:mb-6">
              PERIMETERS · GATES · SECURITY
            </div>
            <h1 className="font-display font-extrabold uppercase leading-[0.95] tracking-tighter"
              style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
            >
              Steel that{" "}
              <span className="text-[#FF4500]">stays put</span>.<br />
              Boundaries that mean it.
            </h1>
            <p className="mt-6 sm:mt-8 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-[#D1D3D6]">
              Yashimae SecuredFence builds chain-link, aluminum, and custom fences for
              properties that need a real perimeter — not a polite suggestion.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
              <a href="#services" className="brutal-btn" data-testid="hero-explore-btn">
                Explore services <ArrowRight size={16} />
              </a>
              <Link
                to="/register"
                className="brutal-btn-outline"
                style={{ background: "rgba(244,244,240,0.95)", color: "#0A0A0A" }}
                data-testid="hero-quote-btn"
              >
                Get a quote
              </Link>
            </div>
          </div>

          {/* Right: Chat CTA — hidden on small screens */}
          <div className="md:col-span-4 hidden md:flex flex-col justify-end gap-3">
            <div className="bg-[#FF4500] border-2 border-[#0A0A0A] text-[#0A0A0A] p-5 lg:p-6 brutal-shadow">
              <div className="font-mono-label">CHAT WITH A SPECIALIST</div>
              <div className="font-display text-xl lg:text-2xl uppercase font-extrabold mt-1">
                Live, not a bot.
              </div>
              <div className="text-sm mt-2 leading-relaxed">
                Sign in and ping our crew. Real humans, real answers.
              </div>
              <Link
                to="/register"
                className="mt-4 inline-flex items-center gap-2 underline font-bold text-sm"
                data-testid="hero-chat-cta"
              >
                <MessageSquare size={16} /> Open the chat
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile-only chat CTA strip */}
        <div className="relative md:hidden bg-[#FF4500] border-t-2 border-[#0A0A0A] px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <div className="font-mono-label text-[10px]" style={{ color: "#0A0A0A" }}>
              CHAT WITH A SPECIALIST
            </div>
            <div className="font-display text-lg uppercase font-extrabold">Live, not a bot.</div>
          </div>
          <Link to="/register" className="brutal-btn-outline shrink-0" style={{ background: "#0A0A0A", color: "#fff", borderColor: "#0A0A0A" }}>
            Start <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <div className="tape-stripe" />

      {/* ── WHY US ───────────────────────────────────────────── */}
      <section id="why" className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Left: heading */}
          <div className="md:col-span-5">
            <div className="font-mono-label text-[#FF4500]">// 01 — WHY YASHIMAE</div>
            <h2
              className="font-display uppercase font-extrabold tracking-tight mt-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              No fluff.<br />
              Just iron, posts, and concrete.
            </h2>
          </div>
          {/* Right: feature grid */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {WHY_FEATURES.map((f, idx) => (
              <div key={idx} className="brutal-card p-5 sm:p-6">
                <f.icon size={26} strokeWidth={2} />
                <div className="font-display text-lg sm:text-xl uppercase font-extrabold mt-3 sm:mt-4">
                  {f.title}
                </div>
                <div className="text-sm leading-relaxed mt-2 text-[#5C5F66]">{f.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section id="services" className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="font-mono-label text-[#FF4500]">// 02 — CATALOG</div>
            <h2
              className="font-display uppercase font-extrabold tracking-tight mt-3"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Three ways to draw the line.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#5C5F66] sm:text-right">
            Pick a category. Pick a size. We'll handle the welds, posts, gravel, and the awkward
            neighbour conversations.
          </p>
        </div>

        {servicesError && (
          <div className="border-2 border-[#0A0A0A] bg-[#FF4500] text-white p-4 font-mono-label mb-6">
            Could not load services. Please refresh the page.
          </div>
        )}

        {/* Responsive: 1 col mobile → 2 col tablet → 3 col desktop */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          data-testid="services-grid"
        >
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
          {/* Skeleton placeholders while loading */}
          {services.length === 0 && !servicesError &&
            [0, 1, 2].map((i) => (
              <div key={i} className="brutal-card overflow-hidden animate-pulse">
                <div className="bg-[#E5E5E0]" style={{ aspectRatio: "4/3" }} />
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="h-3 bg-[#E5E5E0] rounded w-1/3" />
                  <div className="h-6 bg-[#E5E5E0] rounded w-2/3" />
                  <div className="h-3 bg-[#E5E5E0] rounded w-full" />
                  <div className="h-3 bg-[#E5E5E0] rounded w-4/5" />
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] text-[#F4F4F0] border-y-2 border-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="md:col-span-8">
            <div className="font-mono-label text-[#FF4500]">// 03 — TALK TO US</div>
            <div
              className="font-display uppercase font-extrabold mt-3 leading-tight"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              Ready to draw a line on your property?
            </div>
            <div className="text-[#D1D3D6] mt-3 max-w-xl text-sm sm:text-base">
              Create a free account, message our admin team in real-time, and lock in your fence
              install.
            </div>
          </div>
          <div className="md:col-span-4 flex flex-wrap gap-3">
            <Link to="/register" className="brutal-btn" data-testid="cta-register-btn">
              Create account
            </Link>
            <Link
              to="/login"
              className="brutal-btn-outline"
              style={{
                borderColor: "#F4F4F0",
                color: "#F4F4F0",
              }}
              data-testid="cta-login-btn"
            >
              I already have one
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Extracted for readability & memoization potential
function ServiceCard({ service: s }) {
  return (
    <div className="brutal-card flex flex-col" data-testid={`service-card-${s.id}`}>
      <div
        className="border-b-2 border-[#0A0A0A] overflow-hidden bg-[#E5E5E0]"
        style={{ aspectRatio: "4/3" }}
      >
        <img
          src={s.image}
          alt={s.name}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="font-mono-label">{s.tagline}</div>
        <div className="font-display text-xl sm:text-2xl uppercase font-extrabold mt-2">
          {s.name}
        </div>
        <p className="text-sm text-[#5C5F66] mt-3 leading-relaxed">{s.description}</p>

        <div className="mt-5 border-t-2 border-[#0A0A0A] pt-4">
          <div className="font-mono-label mb-2">Sizes & Pricing</div>
          <ul className="text-sm divide-y-2 divide-[#0A0A0A]">
            {s.variants.map((v, i) => (
              <li
                key={i}
                className="flex justify-between py-2"
                data-testid={`variant-${s.id}-${i}`}
              >
                <span>{v.size}</span>
                <span className="font-bold ml-2 shrink-0">
                  {v.price > 0 ? `$${v.price}` : v.label || "Quote"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/register"
          className="brutal-btn mt-6 self-start"
          data-testid={`service-cta-${s.id}`}
        >
          Request quote <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
