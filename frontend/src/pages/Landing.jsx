import React from "react";
import Navbar from "../components/MainNavbar.jsx";
import Footer from "../components/MainFooter.jsx";

/* ─────────────────────────── HERO ─────────────────────────── */
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-linear-to-br from-slate-50 via-blue-50/40 to-teal-50/30 overflow-hidden pt-16"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-40 -right-40 w-150 h-150 rounded-full bg-blue-200/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-100 h-100 rounded-full bg-teal-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Smart OPD Queue Management
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
            Smarter Hospital Queues.{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-500">
              Less Waiting.
            </span>{" "}
            Better Care.
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
            Digitize hospital OPD queues, track live waiting times, and receive
            real-time updates — all from your phone.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#register"
              className="px-7 py-3.5 text-base font-semibold text-white bg-linear-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300 hover:-translate-y-0.5 text-center"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="px-7 py-3.5 text-base font-semibold text-blue-700 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-center"
            >
              Explore Hospitals
            </a>
          </div>
          {/* Trust badges */}
          <div className="flex items-center gap-6 mt-10">
            {[
              { icon: "🏥", text: "500+ Hospitals" },
              { icon: "👥", text: "1.2M+ Patients" },
              { icon: "⚡", text: "Real-time Updates" },
            ].map((b) => (
              <div
                key={b.text}
                className="flex items-center gap-1.5 text-sm text-gray-500"
              >
                <span>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Illustration / Dashboard mockup */}
        <div className="relative flex justify-center">
          {/* Main card */}
          <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-100 p-6 w-full max-w-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs text-gray-400 font-medium">
                  OPD Queue — Cardiology
                </p>
                <p className="text-lg font-bold text-gray-900 mt-0.5">
                  City General Hospital
                </p>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                ● Live
              </span>
            </div>

            {/* Queue position */}
            <div className="bg-linear-to-br from-blue-600 to-teal-500 rounded-2xl p-5 text-white text-center mb-5">
              <p className="text-xs font-medium opacity-80 mb-1">Your Token</p>
              <p className="text-5xl font-extrabold mb-1">A-24</p>
              <p className="text-xs opacity-80">Currently serving A-19</p>
            </div>

            {/* Wait time */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-blue-700">~22 min</p>
                <p className="text-xs text-gray-500 mt-0.5">Est. Wait Time</p>
              </div>
              <div className="bg-teal-50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-teal-700">5 ahead</p>
                <p className="text-xs text-gray-500 mt-0.5">Patients Ahead</p>
              </div>
            </div>

            {/* Queue list */}
            <div className="space-y-2">
              {[
                { token: "A-19", name: "In Consultation", active: true },
                { token: "A-20", name: "Waiting", active: false },
                { token: "A-21", name: "Waiting", active: false },
              ].map((row) => (
                <div
                  key={row.token}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg ${row.active ? "bg-blue-50 border border-blue-100" : "bg-gray-50"}`}
                >
                  <span
                    className={`text-sm font-bold ${row.active ? "text-blue-600" : "text-gray-400"}`}
                  >
                    {row.token}
                  </span>
                  <span
                    className={`text-xs ${row.active ? "text-blue-500" : "text-gray-400"}`}
                  >
                    {row.name}
                  </span>
                  {row.active && (
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Floating notification */}
          <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl shadow-gray-200/60 px-4 py-3 flex items-center gap-3 border border-gray-100 max-w-50">
            <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">
                Your turn is near!
              </p>
              <p className="text-xs text-gray-400">2 patients ahead</p>
            </div>
          </div>

          {/* Floating avatar group */}
          <div className="absolute -top-3 -right-4 bg-white rounded-2xl shadow-xl shadow-gray-200/60 px-4 py-3 border border-gray-100">
            <p className="text-xs font-semibold text-gray-800 mb-1.5">
              Active Now
            </p>
            <div className="flex -space-x-2">
              {[
                "bg-blue-400",
                "bg-teal-400",
                "bg-purple-400",
                "bg-pink-400",
              ].map((c, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
              <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-gray-500 text-xs font-bold">
                +9
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────── PROBLEM SECTION ──────────────────────── */
const problems = [
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Endless Waiting",
    desc: "Patients wait hours with no idea when they'll be called — time that could be spent elsewhere.",
    color: "text-red-500 bg-red-50",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Zero Visibility",
    desc: "No way to know your queue position or how long until your turn — leading to anxiety and frustration.",
    color: "text-orange-500 bg-orange-50",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Overcrowded OPDs",
    desc: "Waiting areas pack patients together, causing discomfort and increasing infection risks.",
    color: "text-yellow-600 bg-yellow-50",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Missed Turns",
    desc: "Patients step away briefly and lose their place. Re-joining the queue wastes even more time.",
    color: "text-pink-500 bg-pink-50",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
    title: "Paper-Based Chaos",
    desc: "Manual token systems break down under load, causing errors and delays for staff and patients alike.",
    color: "text-purple-500 bg-purple-50",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Staff Bottlenecks",
    desc: "Hospital staff spend valuable time managing queues manually instead of focusing on patient care.",
    color: "text-blue-500 bg-blue-50",
  },
];

function Problem() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-red-500 uppercase tracking-widest mb-3">
            The Reality Today
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            The Waiting Problem
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Millions of patients face these challenges daily at hospitals across
            the country.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div
              key={p.title}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${p.color} mb-4`}
              >
                {p.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── SOLUTION ─────────────────────────── */
const solutionSteps = [
  { step: "01", label: "Hospital Creates Queue", icon: "🏥" },
  { step: "02", label: "Patient Joins Digitally", icon: "📱" },
  { step: "03", label: "Live Queue Updates", icon: "🔄" },
  { step: "04", label: "Real-time Token Tracking", icon: "🎫" },
  { step: "05", label: "Push Notifications", icon: "🔔" },
  { step: "06", label: "Doctor Consultation", icon: "🩺" },
];

function Solution() {
  return (
    <section className="py-24 bg-linear-to-br from-slate-50 to-blue-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
            Our Solution
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Meet MediQueue
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            A digital-first queue management platform that puts patients in
            control and hospitals ahead of their workload.
          </p>
        </div>

        {/* Flow */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[calc(8.33%+1rem)] right-[calc(8.33%+1rem)] h-0.5 bg-linear-to-r from-blue-200 via-teal-300 to-blue-200" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {solutionSteps.map((s, i) => (
              <div
                key={s.step}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-blue-100 group-hover:border-blue-400 shadow-md flex items-center justify-center text-2xl mb-3 transition-all duration-300 group-hover:shadow-blue-200 group-hover:shadow-lg group-hover:-translate-y-1">
                  {s.icon}
                </div>
                <span className="text-xs font-bold text-blue-400 mb-1">
                  {s.step}
                </span>
                <span className="text-sm font-semibold text-gray-700 leading-tight">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight box */}
        <div className="mt-16 bg-linear-to-r from-blue-600 to-teal-500 rounded-3xl p-8 sm:p-10 text-white grid sm:grid-cols-3 gap-6 text-center">
          {[
            { value: "40%", label: "Reduction in wait time" },
            { value: "3×", label: "Faster queue processing" },
            { value: "98%", label: "Patient satisfaction rate" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-extrabold mb-1">{s.value}</div>
              <div className="text-blue-100 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FEATURES ─────────────────────────── */
const features = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Live Queue Tracking",
    desc: "Monitor your exact position in the queue in real time from any device, anywhere.",
    accent: "from-blue-500 to-blue-600",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
        />
      </svg>
    ),
    title: "Digital Token System",
    desc: "Get a unique digital token instantly. No paper, no printing, no lost tickets.",
    accent: "from-teal-500 to-teal-600",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Estimated Wait Time",
    desc: "Smart algorithms calculate and display your expected wait time, updated continuously.",
    accent: "from-purple-500 to-purple-600",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    title: "Hospital Search",
    desc: "Browse and search hospitals by name, location, or department to find the right facility fast.",
    accent: "from-orange-500 to-orange-600",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    title: "Department-wise Queues",
    desc: "Separate queues per department — Cardiology, Ortho, ENT — so no two patients overlap.",
    accent: "from-pink-500 to-pink-600",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Secure Authentication",
    desc: "Role-based access control for patients, staff, and admins — secured with JWT tokens.",
    accent: "from-green-500 to-green-600",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Mobile Friendly",
    desc: "Fully responsive design works on any device. Patients can track queues from their phone.",
    accent: "from-cyan-500 to-cyan-600",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Real-time Updates",
    desc: "WebSocket-powered live updates push queue changes instantly — no manual refreshing needed.",
    accent: "from-yellow-500 to-orange-500",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Staff Dashboard",
    desc: "Hospital staff get a clean dashboard to call patients, pause queues, and manage flow.",
    accent: "from-indigo-500 to-indigo-600",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Queue Analytics",
    desc: "Admins get data-driven insights into peak hours, wait times, and department performance.",
    accent: "from-rose-500 to-rose-600",
  },
];

function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-teal-600 uppercase tracking-widest mb-3">
            Platform Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Everything you need
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            From token generation to live tracking, MediQueue covers the full
            OPD queue lifecycle.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group p-5 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white hover:bg-linear-to-br hover:from-gray-50 hover:to-blue-50/50"
            >
              <div
                className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-linear-to-br ${f.accent} text-white mb-4 shadow-sm group-hover:shadow-md transition-shadow`}
              >
                {f.icon}
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1.5">
                {f.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── HOW IT WORKS ─────────────────────────── */
const patientSteps = [
  {
    icon: "📋",
    step: "Register",
    desc: "Create your account in under a minute.",
  },
  {
    icon: "🏥",
    step: "Select Hospital",
    desc: "Browse and pick your hospital and department.",
  },
  { icon: "🎫", step: "Join Queue", desc: "Get your digital token instantly." },
  {
    icon: "📡",
    step: "Track Live",
    desc: "Watch your queue position update in real time.",
  },
];

const staffSteps = [
  { icon: "🔐", step: "Login", desc: "Access your staff dashboard securely." },
  {
    icon: "📊",
    step: "Manage Queue",
    desc: "View all active patients in real time.",
  },
  {
    icon: "📢",
    step: "Call Next Patient",
    desc: "Advance the queue with one click.",
  },
  {
    icon: "✅",
    step: "Complete Session",
    desc: "Mark consultation done and move on.",
  },
];

function FlowSteps({ steps, color }) {
  return (
    <div className="relative">
      <div
        className={`hidden sm:block absolute top-10 left-10 right-10 h-0.5 ${color}`}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 relative z-10">
        {steps.map((s, i) => (
          <div key={s.step} className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-white border-2 border-gray-100 shadow-lg flex flex-col items-center justify-center mb-4 hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              <span className="text-2xl mb-1">{s.icon}</span>
              <span className="text-xs font-bold text-gray-400">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">{s.step}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-linear-to-br from-slate-50 to-blue-50/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
            Simple Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            MediQueue is designed to be effortless — for both patients and
            hospital staff.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Patient flow */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Patient Journey
                </h3>
                <p className="text-xs text-gray-500">
                  From registration to consultation
                </p>
              </div>
            </div>
            <FlowSteps
              steps={patientSteps}
              color="bg-gradient-to-r from-blue-100 via-teal-200 to-blue-100"
            />
          </div>

          {/* Staff flow */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Staff Workflow
                </h3>
                <p className="text-xs text-gray-500">Manage queues with ease</p>
              </div>
            </div>
            <FlowSteps
              steps={staffSteps}
              color="bg-gradient-to-r from-teal-100 via-blue-200 to-teal-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── BENEFITS ─────────────────────────── */
function Benefits() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-green-600 uppercase tracking-widest mb-3">
            Why MediQueue
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Built for everyone
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Whether you're a patient waiting for a consultation or a hospital
            managing hundreds of patients — MediQueue has you covered.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Patients */}
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 to-blue-700 p-8 text-white">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-16 translate-x-16" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">For Patients</h3>
              <p className="text-blue-200 text-sm mb-8">
                Take control of your hospital visit
              </p>
              <ul className="space-y-4">
                {[
                  { icon: "⏱", text: "Save hours of waiting time" },
                  {
                    icon: "🏠",
                    text: "Wait from home, leave when your turn is near",
                  },
                  { icon: "📲", text: "Live position updates on your phone" },
                  {
                    icon: "🔔",
                    text: "Push notifications when you're up next",
                  },
                  { icon: "😌", text: "Stress-free, organized experience" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium text-blue-100">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hospitals */}
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-teal-600 to-teal-700 p-8 text-white">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-16 translate-x-16" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">For Hospitals</h3>
              <p className="text-teal-200 text-sm mb-8">
                Streamline operations and deliver better care
              </p>
              <ul className="space-y-4">
                {[
                  { icon: "📉", text: "Reduce OPD overcrowding by 40%" },
                  { icon: "⚡", text: "Process patients 3× faster" },
                  {
                    icon: "📊",
                    text: "Data insights on peak hours and bottlenecks",
                  },
                  {
                    icon: "🗂",
                    text: "Organized, paperless workflow for staff",
                  },
                  { icon: "⭐", text: "Higher patient satisfaction scores" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium text-teal-100">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CTA ─────────────────────────── */
function CTA() {
  return (
    <section
      id="contact"
      className="py-24 bg-linear-to-br from-slate-50 to-blue-50/40"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 via-blue-950 to-gray-900 p-10 sm:p-16 text-center">
          {/* Decorative */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-500/10 blur-2xl" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-teal-500/10 blur-2xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
              Ready to Transform
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-teal-400">
                Hospital Waiting?
              </span>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto text-lg mb-10">
              Join thousands of patients and hospitals already using MediQueue
              to make healthcare more efficient.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#register"
                className="px-8 py-4 text-base font-semibold text-blue-950 bg-white rounded-xl hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Register Now
              </a>
              <a
                href="#features"
                className="px-8 py-4 text-base font-semibold text-white border-2 border-white/20 rounded-xl hover:border-white/50 hover:bg-white/10 transition-all duration-200"
              >
                Explore Hospitals
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── MAIN LANDING ─────────────────────────── */
export default function Landing() {
  return (
    <div className="font-sans antialiased bg-white text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <HowItWorks />
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
