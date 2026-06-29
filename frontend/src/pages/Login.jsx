import { useState } from "react";

/* ── tiny reusable input wrapper ── */
function InputField({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
  children,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        {children ? (
          children
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 bg-white/70 backdrop-blur-sm transition-all duration-200 outline-none
              focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
              ${error ? "border-red-400 focus:ring-red-400/30 focus:border-red-400" : "border-gray-200 hover:border-gray-300"}`}
          />
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

/* ── left panel illustration ── */
function LeftPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between relative overflow-hidden bg-linear-to-br from-blue-700 via-blue-600 to-teal-500 p-12 text-white pb-40 rounded-tr-4xl rounded-br-4xl">
      {/* Decorative circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-teal-400/20 blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <span className="text-2xl font-bold tracking-tight">MediQueue</span>
      </div>

      {/* Central illustration */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Abstract medical SVG illustration */}
        <svg
          viewBox="0 0 320 280"
          className="w-72 h-auto mb-10 drop-shadow-2xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hospital building */}
          <rect
            x="90"
            y="130"
            width="140"
            height="120"
            rx="6"
            fill="white"
            fillOpacity="0.15"
            stroke="white"
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />
          {/* Cross */}
          <rect
            x="150"
            y="100"
            width="20"
            height="60"
            rx="4"
            fill="white"
            fillOpacity="0.9"
          />
          <rect
            x="130"
            y="115"
            width="60"
            height="20"
            rx="4"
            fill="white"
            fillOpacity="0.9"
          />
          {/* Windows */}
          <rect
            x="108"
            y="155"
            width="24"
            height="24"
            rx="3"
            fill="white"
            fillOpacity="0.5"
          />
          <rect
            x="148"
            y="155"
            width="24"
            height="24"
            rx="3"
            fill="white"
            fillOpacity="0.5"
          />
          <rect
            x="188"
            y="155"
            width="24"
            height="24"
            rx="3"
            fill="white"
            fillOpacity="0.5"
          />
          {/* Door */}
          <rect
            x="145"
            y="195"
            width="30"
            height="55"
            rx="4"
            fill="white"
            fillOpacity="0.3"
          />
          {/* Phone / queue card */}
          <rect
            x="210"
            y="155"
            width="75"
            height="110"
            rx="10"
            fill="white"
            fillOpacity="0.2"
            stroke="white"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <rect
            x="219"
            y="168"
            width="57"
            height="6"
            rx="3"
            fill="white"
            fillOpacity="0.7"
          />
          <rect
            x="219"
            y="180"
            width="40"
            height="4"
            rx="2"
            fill="white"
            fillOpacity="0.4"
          />
          <rect
            x="219"
            y="195"
            width="57"
            height="28"
            rx="5"
            fill="white"
            fillOpacity="0.25"
            stroke="white"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <text
            x="248"
            y="214"
            textAnchor="middle"
            className="font-bold"
            fontSize="13"
            fill="white"
            fillOpacity="0.9"
            fontWeight="bold"
          >
            A-24
          </text>
          <rect
            x="219"
            y="233"
            width="57"
            height="4"
            rx="2"
            fill="white"
            fillOpacity="0.4"
          />
          <rect
            x="219"
            y="243"
            width="35"
            height="4"
            rx="2"
            fill="white"
            fillOpacity="0.3"
          />
          {/* Doctor figure */}
          <circle cx="68" cy="160" r="16" fill="white" fillOpacity="0.85" />
          <rect
            x="52"
            y="178"
            width="32"
            height="50"
            rx="8"
            fill="white"
            fillOpacity="0.7"
          />
          <rect
            x="58"
            y="188"
            width="8"
            height="18"
            rx="2"
            fill="#2563EB"
            fillOpacity="0.5"
          />
          {/* Stethoscope */}
          <path
            d="M66 192 Q76 200 76 210"
            stroke="#14B8A6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="76" cy="213" r="4" stroke="#14B8A6" strokeWidth="2" />
          {/* Patient figure */}
          <circle cx="40" cy="205" r="12" fill="white" fillOpacity="0.6" />
          <rect
            x="28"
            y="218"
            width="24"
            height="38"
            rx="7"
            fill="white"
            fillOpacity="0.5"
          />
          {/* Pulse line */}
          <path
            d="M30 90 L65 90 L75 70 L85 110 L95 85 L105 90 L140 90"
            stroke="white"
            strokeOpacity="0.6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="85" cy="110" r="3" fill="white" fillOpacity="0.8" />
          {/* WiFi-like signal */}
          <path
            d="M260 60 Q270 50 280 60"
            stroke="white"
            strokeOpacity="0.5"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M254 54 Q270 40 286 54"
            stroke="white"
            strokeOpacity="0.35"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="270" cy="66" r="3" fill="white" fillOpacity="0.8" />
        </svg>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center mb-4 leading-tight tracking-tight">
          Welcome Back
        </h1>
        <p className="text-base text-blue-100 text-center max-w-xs leading-relaxed">
          Sign in to access your hospital queue dashboard and manage
          appointments efficiently.
        </p>
      </div>
    </div>
  );
}

/* ── main login page ── */
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    // Clear field error on change
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
    if (submitError) setSubmitError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setSubmitError("");

    try {
      // ── API INTEGRATION POINT ──────────────────────────────────────
      // Replace the setTimeout below with your actual login API call.
      // Example:
      //   const response = await axios.post("/api/auth/login", {
      //     email: form.email,
      //     password: form.password,
      //     rememberMe,
      //   });
      //   const { token, user } = response.data;
      //   localStorage.setItem("token", token);
      //   navigate("/dashboard");
      // ──────────────────────────────────────────────────────────────
      await new Promise((res) => setTimeout(res, 1800)); // simulated delay
      // Simulated error for demo — remove when wiring real API:
      // throw new Error("Invalid credentials. Please try again.");
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-50 font-sans">
      {/* ── Left panel ── */}
      <LeftPanel />

      {/* ── Right panel ── */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-linear-to-br from-slate-50 via-blue-50/30 to-teal-50/20 relative overflow-hidden">
        {/* Subtle blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-md">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Medi<span className="text-blue-600">Queue</span>
            </span>
          </div>

          {/* Glass card */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-100/50 border border-white/80 p-8 sm:p-10">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1.5 tracking-tight">
                Sign in
              </h2>
              <p className="text-sm text-gray-500">
                Access your queue dashboard and manage appointments.
              </p>
            </div>

            {/* Global error banner */}
            {submitError && (
              <div className="mb-6 flex items-start gap-3 px-4 py-3.5 rounded-xl bg-red-50 border border-red-200">
                <svg
                  className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-red-600 font-medium">
                  {submitError}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Email */}
              <InputField
                id="email"
                label="Email Address"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                error={errors.email}
              />

              {/* Password */}
              <InputField
                id="password"
                label="Password"
                error={errors.password}
              >
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 pr-12 rounded-xl border text-sm text-gray-900 placeholder-gray-400 bg-white/70 backdrop-blur-sm transition-all duration-200 outline-none
                      focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
                      ${errors.password ? "border-red-400 focus:ring-red-400/30 focus:border-red-400" : "border-gray-200 hover:border-gray-300"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        className="w-4.5 h-4.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4.5 h-4.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </InputField>

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      onClick={() => setRememberMe((v) => !v)}
                      className={`w-4.5 h-4.5 rounded-[5px] border-2 flex items-center justify-center transition-all duration-200 cursor-pointer
                        ${rememberMe ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300 group-hover:border-blue-400"}`}
                    >
                      {rememberMe && (
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 select-none">
                    Remember me
                  </span>
                </label>

                <a
                  href="#forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors hover:underline underline-offset-2"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2.5 py-3.5 px-6 text-sm font-semibold text-white rounded-xl transition-all duration-300 shadow-md mt-2
                  ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed shadow-none"
                      : "bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-200 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 active:translate-y-0"
                  }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin text-white/80"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <span>Signing in…</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 text-xs text-gray-400 bg-white/70 backdrop-blur-sm">
                    or continue with
                  </span>
                </div>
              </div>

              {/* Social login placeholders */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Google",
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    ),
                  },
                  {
                    label: "GitHub",
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    ),
                  },
                ].map((provider) => (
                  <button
                    key={provider.label}
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 hover:shadow-sm"
                  >
                    {provider.icon}
                    <span>{provider.label}</span>
                  </button>
                ))}
              </div>

              {/* Register link */}
              <p className="text-center text-sm text-gray-500 pt-1">
                Don't have an account?{" "}
                <a
                  href="#register"
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline underline-offset-2 transition-colors"
                >
                  Create one free
                </a>
              </p>
            </form>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-gray-400 mt-6">
            By signing in you agree to our{" "}
            <a
              href="#terms"
              className="underline hover:text-gray-600 transition-colors"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#privacy"
              className="underline hover:text-gray-600 transition-colors"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
