import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.ok) {
      const target = res.user.role === "admin" ? "/admin" : "/dashboard";
      navigate(loc.state?.from || target, { replace: true });
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="bg-[#F4F4F0] min-h-screen">
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left: brand copy — hidden on small mobile */}
        <div className="md:col-span-6 hidden sm:block">
          <div className="font-mono-label text-[#FF4500]">// AUTH · LOGIN</div>
          <h1
            className="font-display uppercase font-extrabold tracking-tight mt-3"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
          >
            Welcome back.
          </h1>
          <p className="mt-4 max-w-md text-[#5C5F66]">
            Sign in to chat directly with our team and track your fence project.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 border-2 border-[#0A0A0A] p-4 bg-[#FF4500] text-white brutal-shadow">
            <ShieldCheck size={20} />
            <div className="font-mono-label">Secure session, sealed cookies</div>
          </div>
        </div>

        {/* Right: form */}
        <form
          onSubmit={submit}
          className="md:col-span-6 brutal-card p-6 sm:p-8 brutal-shadow"
          data-testid="login-form"
          noValidate
        >
          <div className="font-display text-2xl uppercase font-extrabold mb-6">Login</div>

          <label className="font-mono-label block mb-2" htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="brutal-input mb-5"
            data-testid="login-email"
            style={{ fontSize: "16px" }}
          />

          <label className="font-mono-label block mb-2" htmlFor="login-password">Password</label>
          <div className="relative mb-5">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="brutal-input pr-12"
              data-testid="login-password"
              style={{ fontSize: "16px" }}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#5C5F66]"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <div
              role="alert"
              className="border-2 border-[#0A0A0A] bg-[#FF4500] text-white p-3 mb-4 font-mono-label text-xs sm:text-sm"
              data-testid="login-error"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="brutal-btn w-full justify-center"
            data-testid="login-submit"
          >
            {loading ? "Signing in…" : "Log in"}
          </button>

          <div className="mt-6 text-sm text-[#5C5F66]">
            No account?{" "}
            <Link
              to="/register"
              className="underline font-bold text-[#0A0A0A]"
              data-testid="login-to-register"
            >
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
