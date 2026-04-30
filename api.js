import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const res = await register(name, email, password);
    setLoading(false);
    if (res.ok) navigate("/dashboard", { replace: true });
    else setError(res.error);
  };

  return (
    <div className="bg-[#F4F4F0] min-h-screen">
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left: brand copy */}
        <div className="md:col-span-6 hidden sm:block">
          <div className="font-mono-label text-[#FF4500]">// AUTH · REGISTER</div>
          <h1
            className="font-display uppercase font-extrabold tracking-tight mt-3"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
          >
            Build your{" "}
            <span className="text-[#FF4500]">perimeter</span>.
          </h1>
          <p className="mt-4 max-w-md text-[#5C5F66]">
            Create an account to chat with our crew, request quotes, and track your fence install
            end-to-end.
          </p>
          <ul className="mt-8 space-y-3">
            {["Free to create, no credit card needed", "Direct line to our install team", "Get quotes in minutes, not days"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm">
                <span className="w-5 h-5 bg-[#FF4500] border-2 border-[#0A0A0A] shrink-0 flex items-center justify-center text-white font-bold text-xs">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form */}
        <form
          onSubmit={submit}
          className="md:col-span-6 brutal-card p-6 sm:p-8 brutal-shadow"
          data-testid="register-form"
          noValidate
        >
          <div className="font-display text-2xl uppercase font-extrabold mb-6">Create account</div>

          <label className="font-mono-label block mb-2" htmlFor="reg-name">Full name</label>
          <input
            id="reg-name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="brutal-input mb-5"
            data-testid="register-name"
            style={{ fontSize: "16px" }}
          />

          <label className="font-mono-label block mb-2" htmlFor="reg-email">Email</label>
          <input
            id="reg-email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="brutal-input mb-5"
            data-testid="register-email"
            style={{ fontSize: "16px" }}
          />

          <label className="font-mono-label block mb-2" htmlFor="reg-password">Password</label>
          <div className="relative mb-1">
            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="brutal-input pr-12"
              data-testid="register-password"
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
          <p className="text-xs text-[#5C5F66] mb-5">Minimum 6 characters</p>

          {error && (
            <div
              role="alert"
              className="border-2 border-[#0A0A0A] bg-[#FF4500] text-white p-3 mb-4 font-mono-label text-xs sm:text-sm"
              data-testid="register-error"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="brutal-btn w-full justify-center"
            data-testid="register-submit"
          >
            {loading ? "Creating…" : "Create account"}
          </button>

          <div className="mt-6 text-sm text-[#5C5F66]">
            Already a customer?{" "}
            <Link
              to="/login"
              className="underline font-bold text-[#0A0A0A]"
              data-testid="register-to-login"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
