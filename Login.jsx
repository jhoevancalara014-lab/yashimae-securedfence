import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatPanel from "../components/ChatPanel";
import { api } from "../lib/api";
import { Navigate } from "react-router-dom";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [roomError, setRoomError] = useState(false);

  useEffect(() => {
    if (!user || typeof user !== "object" || user.role === "admin") return;
    api
      .get("/chat/my-room")
      .then(({ data }) => setRoom(data))
      .catch(() => setRoomError(true));
  }, [user]);

  if (user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F0]">
        <div className="font-mono-label text-[#5C5F66]">Loading…</div>
      </div>
    );
  }
  if (user === false) return <Navigate to="/login" replace />;
  if (user.role === "admin") return <Navigate to="/admin" replace />;

  return (
    <div className="bg-[#F4F4F0] min-h-screen flex flex-col">
      <Navbar />

      <main
        className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12"
        data-testid="customer-dashboard"
      >
        {/* Header */}
        <div className="mb-6 sm:mb-10">
          <div className="font-mono-label text-[#FF4500]">// DASHBOARD</div>
          <h1
            className="font-display uppercase font-extrabold tracking-tight mt-2"
            style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
          >
            Hi, {user.name}.
          </h1>
          <p className="mt-2 text-[#5C5F66] text-sm sm:text-base max-w-xl">
            Send our admin team a message — quotes, sizes, install dates, anything.
          </p>
        </div>

        {/* Layout: stack on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-4 flex flex-col gap-4 order-2 md:order-1">
            <div className="brutal-card p-5 sm:p-6">
              <div className="font-mono-label mb-3">YOUR ACCOUNT</div>
              <dl className="text-sm space-y-1">
                <div className="flex gap-2">
                  <dt className="font-bold shrink-0">Name:</dt>
                  <dd>{user.name}</dd>
                </div>
                <div className="flex gap-2 min-w-0">
                  <dt className="font-bold shrink-0">Email:</dt>
                  <dd className="break-anywhere truncate">{user.email}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-bold shrink-0">Role:</dt>
                  <dd className="capitalize">{user.role}</dd>
                </div>
              </dl>
            </div>

            <div className="brutal-card p-5 sm:p-6 bg-[#FF4500] text-white">
              <div className="font-mono-label" style={{ color: "rgba(255,255,255,0.85)" }}>
                NEED A QUOTE?
              </div>
              <div className="font-display text-lg sm:text-xl uppercase font-extrabold mt-1">
                Drop us a message →
              </div>
              <div className="text-sm mt-2 leading-relaxed opacity-90">
                Tell us the fence type, sizes, and zip code. We respond fast.
              </div>
            </div>

            {/* Tips — hidden on mobile to save space */}
            <div className="hidden sm:block brutal-card p-5 border-dashed">
              <div className="font-mono-label mb-2">QUICK TIPS</div>
              <ul className="text-sm text-[#5C5F66] space-y-2">
                <li>• Include your approximate area size</li>
                <li>• Mention the fence type you're interested in</li>
                <li>• Share any special requirements</li>
              </ul>
            </div>
          </aside>

          {/* Chat panel — full height on desktop */}
          <div
            className="md:col-span-8 order-1 md:order-2"
            style={{
              height: "clamp(400px, 60vh, 650px)",
            }}
          >
            {roomError ? (
              <div className="brutal-card p-6 sm:p-8 font-mono-label text-[#FF4500] h-full flex items-center justify-center">
                Could not set up your chat. Please refresh.
              </div>
            ) : room ? (
              <ChatPanel
                roomId={room.id}
                currentUserId={user.id}
                currentUserRole={user.role}
                headerLabel="Yashimae Support"
              />
            ) : (
              <div className="brutal-card p-6 sm:p-8 font-mono-label h-full flex items-center justify-center text-[#5C5F66]">
                Setting up your chat…
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
