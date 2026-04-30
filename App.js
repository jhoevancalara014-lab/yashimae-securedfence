import { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import ChatPanel from "../components/ChatPanel";
import { api, buildWsUrl } from "../lib/api";
import { Navigate } from "react-router-dom";
import { Inbox, ArrowLeft, RefreshCw } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [active, setActive] = useState(null);
  const [showChat, setShowChat] = useState(false); // Mobile: toggle between list / chat
  const [loading, setLoading] = useState(false);
  const adminWsRef = useRef(null);
  const stoppedRef = useRef(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/chat/rooms");
      const sorted = (data || []).sort((a, b) =>
        (b.last_message_at || "").localeCompare(a.last_message_at || "")
      );
      setRooms(sorted);
      // Auto-select first room if nothing selected
      if (!active && sorted.length > 0) {
        setActive(sorted[0]);
      }
    } catch (_) {}
    setLoading(false);
  }, [active]);

  const selectRoom = useCallback((room) => {
    setActive(room);
    setShowChat(true); // On mobile, switch to chat view
  }, []);

  // Initial load + WebSocket for real-time updates
  useEffect(() => {
    if (!user || typeof user !== "object" || user.role !== "admin") return;
    stoppedRef.current = false;
    refresh();

    (async () => {
      try {
        const { data } = await api.get("/auth/ws-token");
        const ws = new WebSocket(
          buildWsUrl(`/api/ws/admin?token=${encodeURIComponent(data.token)}`)
        );
        adminWsRef.current = ws;

        ws.onmessage = (ev) => {
          if (stoppedRef.current) return;
          try {
            const obj = JSON.parse(ev.data);
            if (obj?.type === "room_update") {
              setRooms((prev) => {
                const next = prev.map((r) =>
                  r.id === obj.room_id
                    ? { ...r, last_message: obj.last_message, last_message_at: obj.last_message_at }
                    : r
                );
                // Keep sorted by latest message
                return next.sort((a, b) =>
                  (b.last_message_at || "").localeCompare(a.last_message_at || "")
                );
              });
            }
          } catch (_) {}
        };

        ws.onclose = () => {
          if (!stoppedRef.current) {
            // Reconnect after 5s
            setTimeout(async () => {
              if (!stoppedRef.current) {
                try {
                  const { data: d } = await api.get("/auth/ws-token");
                  adminWsRef.current = new WebSocket(
                    buildWsUrl(`/api/ws/admin?token=${encodeURIComponent(d.token)}`)
                  );
                } catch (_) {}
              }
            }, 5000);
          }
        };
      } catch (_) {}
    })();

    return () => {
      stoppedRef.current = true;
      if (adminWsRef.current) adminWsRef.current.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F0]">
        <div className="font-mono-label text-[#5C5F66]">Loading…</div>
      </div>
    );
  }
  if (user === false) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/dashboard" replace />;

  return (
    <div className="bg-[#F4F4F0] min-h-screen flex flex-col">
      <Navbar />

      <main
        className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-10 flex flex-col"
        data-testid="admin-dashboard"
      >
        {/* Header */}
        <div className="flex items-end justify-between mb-5 sm:mb-8">
          <div>
            <div className="font-mono-label text-[#FF4500]">// ADMIN CONSOLE</div>
            <h1
              className="font-display uppercase font-extrabold tracking-tight mt-2"
              style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
            >
              Control Room
            </h1>
          </div>
          <button
            onClick={refresh}
            disabled={loading}
            className="brutal-btn-outline flex items-center gap-2 text-sm"
            data-testid="admin-refresh-btn"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Mobile: back button when chat is open */}
        {showChat && active && (
          <button
            className="md:hidden mb-4 flex items-center gap-2 font-mono-label text-sm hover:text-[#FF4500] transition-colors"
            onClick={() => setShowChat(false)}
          >
            <ArrowLeft size={16} /> Back to conversations
          </button>
        )}

        {/* Main grid */}
        <div
          className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4"
          style={{ minHeight: 0 }}
        >
          {/* Rooms List — hidden on mobile when chat is open */}
          <aside
            className={`md:col-span-4 brutal-card flex flex-col ${showChat ? "hidden md:flex" : "flex"}`}
            data-testid="admin-rooms-list"
            style={{ minHeight: 0, maxHeight: "calc(100vh - 220px)" }}
          >
            {/* Sidebar header */}
            <div className="px-4 py-3 border-b-2 border-[#0A0A0A] flex items-center gap-2 shrink-0 bg-[#F4F4F0]">
              <Inbox size={15} strokeWidth={2.5} />
              <div className="font-mono-label">
                Conversations ({rooms.length})
              </div>
            </div>

            {/* Room list */}
            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {rooms.length === 0 && !loading && (
                <div className="p-6 font-mono-label text-[#5C5F66]">
                  No conversations yet.
                </div>
              )}
              {loading && rooms.length === 0 && (
                <div className="p-6 space-y-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="animate-pulse space-y-2">
                      <div className="h-4 bg-[#E5E5E0] rounded w-3/4" />
                      <div className="h-3 bg-[#E5E5E0] rounded w-1/2" />
                    </div>
                  ))}
                </div>
              )}
              {rooms.map((r) => (
                <button
                  key={r.id}
                  onClick={() => selectRoom(r)}
                  className={`w-full text-left px-4 py-3 sm:py-4 border-b-2 border-[#0A0A0A] block transition-colors ${
                    active?.id === r.id
                      ? "bg-[#FF4500] text-white"
                      : "bg-white hover:bg-[#F0F0EE] active:bg-[#E5E5E0]"
                  }`}
                  data-testid={`admin-room-${r.id}`}
                >
                  <div className="font-display text-sm sm:text-base font-extrabold uppercase truncate">
                    {r.customer_name}
                  </div>
                  <div className="text-xs truncate opacity-75 mt-0.5">{r.customer_email}</div>
                  {r.last_message && (
                    <div className="text-xs mt-1 truncate opacity-70">{r.last_message}</div>
                  )}
                  <div className="text-[10px] mt-1 opacity-50">
                    {r.last_message_at
                      ? new Date(r.last_message_at).toLocaleString([], {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "No messages"}
                  </div>
                </button>
              ))}
            </div>
          </aside>

          {/* Chat Panel — hidden on mobile when list is shown */}
          <main
            className={`md:col-span-8 ${showChat ? "block" : "hidden md:block"}`}
            style={{ minHeight: 0, height: "calc(100vh - 220px)" }}
          >
            {active ? (
              <ChatPanel
                key={active.id}
                roomId={active.id}
                currentUserId={user.id}
                currentUserRole={user.role}
                headerLabel={`${active.customer_name} — ${active.customer_email}`}
              />
            ) : (
              <div className="brutal-card p-8 sm:p-12 font-mono-label h-full flex items-center justify-center text-[#5C5F66]">
                Select a conversation to start replying.
              </div>
            )}
          </main>
        </div>
      </main>
    </div>
  );
}
