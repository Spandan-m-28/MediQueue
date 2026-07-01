import { useState } from "react";

/* ─────────────────────── reusable input ─────────────────────── */
function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon,
  rightElement,
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
        {/* Left icon */}
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full py-3 text-sm text-gray-900 placeholder-gray-400 bg-white/70 backdrop-blur-sm rounded-xl border transition-all duration-200 outline-none
            ${icon ? "pl-10" : "pl-4"}
            ${rightElement ? "pr-11" : "pr-4"}
            focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
            ${error ? "border-red-400 focus:ring-red-400/30 focus:border-red-400" : "border-gray-200 hover:border-gray-300"}`}
        />
        {/* Right element (show/hide toggle) */}
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">
            {rightElement}
          </div>
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

/* ─────────────────────── eye toggle button ─────────────────────── */
function EyeToggle({ show, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      tabIndex={-1}
      aria-label={show ? "Hide" : "Show"}
      className="text-gray-400 hover:text-gray-600 transition-colors"
    >
      {show ? (
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
  );
}

/* ─────────────────────── password strength ─────────────────────── */
function PasswordStrength({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;

  const bars = [
    { threshold: 1, color: "bg-red-400" },
    { threshold: 2, color: "bg-orange-400" },
    { threshold: 3, color: "bg-yellow-400" },
    { threshold: 4, color: "bg-green-500" },
  ];
  const label = ["", "Weak", "Fair", "Good", "Strong"][score];
  const labelColor = [
    "",
    "text-red-500",
    "text-orange-500",
    "text-yellow-600",
    "text-green-600",
  ][score];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1.5">
        {bars.map((b, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < score ? b.color : "bg-gray-200"}`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${labelColor}`}>
        {label} password
        {score < 4 && (
          <span className="text-gray-400 font-normal ml-1">
            — {!checks[0] && "8+ chars"}
            {!checks[0] && (!checks[1] || !checks[2] || !checks[3]) && ", "}
            {!checks[1] && "uppercase"}
            {!checks[1] && (!checks[2] || !checks[3]) && ", "}
            {!checks[2] && "number"}
            {!checks[2] && !checks[3] && ", "}
            {!checks[3] && "special char"}
          </span>
        )}
      </p>
    </div>
  );
}

/* ─────────────────────── right panel ─────────────────────── */
function LeftPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between relative overflow-hidden bg-linear-to-br from-teal-600 via-teal-500 to-blue-600 p-12 text-white rounded-tr-4xl rounded-br-4xl">
      {/* Blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-400/20 blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

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

      {/* Illustration */}
      <div className="relative z-10 flex flex-col items-center">
        <svg
          viewBox="0 0 320 290"
          className="w-72 h-auto mb-10 drop-shadow-2xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle */}
          <circle cx="160" cy="150" r="110" fill="white" fillOpacity="0.07" />

          {/* Clipboard / form */}
          <rect
            x="95"
            y="60"
            width="130"
            height="165"
            rx="10"
            fill="white"
            fillOpacity="0.18"
            stroke="white"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
          <rect
            x="130"
            y="52"
            width="60"
            height="18"
            rx="9"
            fill="white"
            fillOpacity="0.5"
          />
          {/* Form lines */}
          <rect
            x="112"
            y="92"
            width="96"
            height="7"
            rx="3.5"
            fill="white"
            fillOpacity="0.55"
          />
          <rect
            x="112"
            y="107"
            width="70"
            height="7"
            rx="3.5"
            fill="white"
            fillOpacity="0.35"
          />
          <rect
            x="112"
            y="125"
            width="96"
            height="7"
            rx="3.5"
            fill="white"
            fillOpacity="0.55"
          />
          <rect
            x="112"
            y="140"
            width="55"
            height="7"
            rx="3.5"
            fill="white"
            fillOpacity="0.35"
          />
          <rect
            x="112"
            y="158"
            width="96"
            height="7"
            rx="3.5"
            fill="white"
            fillOpacity="0.55"
          />
          <rect
            x="112"
            y="173"
            width="80"
            height="7"
            rx="3.5"
            fill="white"
            fillOpacity="0.35"
          />
          {/* Register button on form */}
          <rect
            x="112"
            y="194"
            width="96"
            height="20"
            rx="8"
            fill="white"
            fillOpacity="0.35"
          />
          <rect
            x="130"
            y="200"
            width="60"
            height="8"
            rx="4"
            fill="white"
            fillOpacity="0.7"
          />

          {/* Check badge */}
          <circle
            cx="225"
            cy="80"
            r="22"
            fill="white"
            fillOpacity="0.25"
            stroke="white"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <path
            d="M215 80 l7 7 l13-13"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Person / avatar */}
          <circle cx="72" cy="170" r="20" fill="white" fillOpacity="0.8" />
          <rect
            x="55"
            y="192"
            width="34"
            height="42"
            rx="9"
            fill="white"
            fillOpacity="0.65"
          />
          {/* ID card badge */}
          <rect
            x="58"
            y="197"
            width="18"
            height="12"
            rx="3"
            fill="#14B8A6"
            fillOpacity="0.7"
          />
          <rect
            x="64"
            y="200"
            width="6"
            height="6"
            rx="3"
            fill="white"
            fillOpacity="0.9"
          />

          {/* Notification ping */}
          <circle
            cx="252"
            cy="168"
            r="16"
            fill="white"
            fillOpacity="0.2"
            stroke="white"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
          <path
            d="M246 168 c0-3.3 2.7-6 6-6s6 2.7 6 6c0 2-0.7 3-1.5 4h-9c-0.8-1-1.5-2-1.5-4z"
            fill="white"
            fillOpacity="0.7"
          />
          <rect
            x="250"
            y="176"
            width="4"
            height="2"
            rx="1"
            fill="white"
            fillOpacity="0.7"
          />

          {/* Pulse line bottom */}
          <path
            d="M95 248 L118 248 L126 234 L134 262 L142 248 L158 248"
            stroke="white"
            strokeOpacity="0.55"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="134" cy="262" r="3" fill="white" fillOpacity="0.75" />

          {/* Small dots decoration */}
          <circle cx="270" cy="130" r="4" fill="white" fillOpacity="0.35" />
          <circle cx="283" cy="118" r="2.5" fill="white" fillOpacity="0.25" />
          <circle cx="260" cy="115" r="2" fill="white" fillOpacity="0.2" />
        </svg>

        <h1 className="text-4xl font-extrabold text-center mb-4 leading-tight tracking-tight">
          Create Your Account
        </h1>
        <p className="text-base text-teal-100 text-center max-w-xs leading-relaxed">
          Register to experience smarter hospital queue management with
          real-time updates.
        </p>
      </div>

      {/* Feature pills */}
      <div className="relative z-10 grid grid-cols-2 gap-3">
        {[
          { icon: "🎫", text: "Digital Queue Token" },
          { icon: "📡", text: "Live Queue Tracking" },
          { icon: "🔔", text: "Real-time Alerts" },
          { icon: "🏥", text: "Secure Authentication" },
        ].map((f) => (
          <div
            key={f.text}
            className="flex items-center gap-2.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-3.5 py-2.5"
          >
            <span className="text-base">{f.icon}</span>
            <span className="text-xs font-medium text-white/90">{f.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── main register page ─────────────────────── */
export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
    if (submitError) setSubmitError("");
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) {
      e.fullName = "Full name is required.";
    } else if (form.fullName.trim().length < 3) {
      e.fullName = "Name must be at least 3 characters.";
    }

    if (!form.email.trim()) {
      e.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email address.";
    }

    if (!form.phone.trim()) {
      e.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) {
      e.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!form.password) {
      e.password = "Password is required.";
    } else if (form.password.length < 8) {
      e.password = "Password must be at least 8 characters.";
    }

    if (!form.confirmPassword) {
      e.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      e.confirmPassword = "Passwords do not match.";
    }

    if (!agreed) {
      e.agreed = "You must agree to the Terms & Privacy Policy.";
    }

    return e;
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
      // Replace the setTimeout below with your real registration API call.
      // Example:
      //   const response = await axios.post("/api/auth/register", {
      //     name: form.fullName,
      //     email: form.email,
      //     phone: form.phone,
      //     password: form.password,
      //   });
      //   const { token, user } = response.data;
      //   localStorage.setItem("token", token);
      //   navigate("/dashboard");   // redirect after success
      // ──────────────────────────────────────────────────────────────
      await new Promise((res) => setTimeout(res, 2000)); // simulated delay
      setSuccess(true);
    } catch (err) {
      setSubmitError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ── icons ── */
  const icons = {
    user: (
      <svg
        className="w-4 h-4 text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    email: (
      <svg
        className="w-4 h-4 text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    phone: (
      <svg
        className="w-4 h-4 text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    lock: (
      <svg
        className="w-4 h-4 text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-50 font-sans">
      {/* ── Right: form panel ── */}
      <LeftPanel />

      {/* ── Left: illustration panel ── */}
      <div className="order-1 lg:order-2">
        <div className="flex items-center justify-center p-6 sm:p-10 bg-linear-to-br from-slate-50 via-blue-50/20 to-teal-50/20 relative overflow-hidden order-2 lg:order-1">
          {/* Blobs */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-teal-500 to-blue-600 flex items-center justify-center shadow-md">
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
                Medi<span className="text-teal-600">Queue</span>
              </span>
            </div>

            {/* Success state */}
            {success ? (
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-teal-100/50 border border-white/80 p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                  Account Created!
                </h2>
                <p className="text-gray-500 text-sm mb-8">
                  Welcome to MediQueue,{" "}
                  <span className="font-semibold text-gray-700">
                    {form.fullName.split(" ")[0]}
                  </span>
                  ! Your account has been successfully created.
                </p>
                <div className="space-y-3">
                  <a
                    href="#dashboard"
                    className="block w-full py-3.5 text-sm font-semibold text-white bg-linear-to-r from-teal-500 to-blue-600 rounded-xl hover:from-teal-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-center"
                  >
                    Go to Dashboard
                  </a>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setForm({
                        fullName: "",
                        email: "",
                        phone: "",
                        password: "",
                        confirmPassword: "",
                      });
                      setAgreed(false);
                    }}
                    className="block w-full py-3 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Register another account
                  </button>
                </div>
              </div>
            ) : (
              /* ── Glass card ── */
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-teal-100/40 border border-white/80 p-8 sm:p-10">
                {/* Header */}
                <div className="mb-7">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1.5 tracking-tight">
                    Create account
                  </h2>
                  <p className="text-sm text-gray-500">
                    Join MediQueue — your smart hospital queue companion.
                  </p>
                </div>

                {/* Global error banner */}
                {submitError && (
                  <div className="mb-5 flex items-start gap-3 px-4 py-3.5 rounded-xl bg-red-50 border border-red-200">
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

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Full Name */}
                  <InputField
                    id="fullName"
                    label="Full Name"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Spandan Meshram"
                    error={errors.fullName}
                    icon={icons.user}
                  />

                  {/* Email */}
                  <InputField
                    id="email"
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    error={errors.email}
                    icon={icons.email}
                  />

                  {/* Phone */}
                  <InputField
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    error={errors.phone}
                    icon={icons.phone}
                  />

                  {/* Password + strength */}
                  <div>
                    <InputField
                      id="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Min. 8 characters"
                      error={errors.password}
                      icon={icons.lock}
                      rightElement={
                        <EyeToggle
                          show={showPassword}
                          onToggle={() => setShowPassword((v) => !v)}
                        />
                      }
                    />
                    <PasswordStrength password={form.password} />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <InputField
                      id="confirmPassword"
                      label="Confirm Password"
                      type={showConfirm ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter your password"
                      error={errors.confirmPassword}
                      icon={icons.lock}
                      rightElement={
                        <EyeToggle
                          show={showConfirm}
                          onToggle={() => setShowConfirm((v) => !v)}
                        />
                      }
                    />
                    {/* Match indicator */}
                    {form.confirmPassword && form.password && (
                      <p
                        className={`mt-1.5 text-xs flex items-center gap-1 font-medium ${form.password === form.confirmPassword ? "text-green-600" : "text-red-500"}`}
                      >
                        {form.password === form.confirmPassword ? (
                          <>
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Passwords match
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-3.5 h-3.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Passwords do not match
                          </>
                        )}
                      </p>
                    )}
                  </div>

                  {/* Terms checkbox */}
                  <div>
                    <label className="flex items-start gap-2.5 cursor-pointer group">
                      <div className="relative mt-0.5 shrink-0">
                        <div
                          onClick={() => {
                            setAgreed((v) => !v);
                            if (errors.agreed)
                              setErrors((p) => ({ ...p, agreed: "" }));
                          }}
                          className={`w-4.5 h-4.5 rounded-[5px] border-2 flex items-center justify-center transition-all duration-200 cursor-pointer
                          ${agreed ? "bg-teal-500 border-teal-500" : "bg-white border-gray-300 group-hover:border-teal-400"}`}
                        >
                          {agreed && (
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
                      <span className="text-sm text-gray-600 leading-snug">
                        I agree to the{" "}
                        <a
                          href="#terms"
                          className="font-medium text-teal-600 hover:underline underline-offset-2"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#privacy"
                          className="font-medium text-teal-600 hover:underline underline-offset-2"
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                    {errors.agreed && (
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
                        {errors.agreed}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center gap-2.5 py-3.5 px-6 text-sm font-semibold text-white rounded-xl transition-all duration-300 shadow-md mt-1
                    ${
                      isLoading
                        ? "bg-teal-400 cursor-not-allowed shadow-none"
                        : "bg-linear-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 shadow-teal-200 hover:shadow-lg hover:shadow-teal-200 hover:-translate-y-0.5 active:translate-y-0"
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
                        <span>Creating account…</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
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

                  {/* Login link */}
                  <p className="text-center text-sm text-gray-500 pt-1">
                    Already have an account?{" "}
                    <a
                      href="#login"
                      className="font-semibold text-teal-600 hover:text-teal-700 hover:underline underline-offset-2 transition-colors"
                    >
                      Sign in
                    </a>
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
