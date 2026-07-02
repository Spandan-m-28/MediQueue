import { useState, useEffect } from "react";
import {
  MapPin, Phone, Mail, Building2, Clock, Users, ChevronRight,
  Stethoscope, ArrowLeft, Bell, User, ChevronDown, Menu, X,
  Activity, Heart, Brain, Bone, Eye, Baby, Shield, Zap,
  CheckCircle2, XCircle, AlertCircle, TrendingUp, Calendar,
  Timer, UserCheck, Star, ChevronLeft,
} from "lucide-react";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_HOSPITAL = {
  id: 1,
  name: "Apollo Hospitals",
  address: "21 Greams Lane, Thousand Lights, Chennai",
  city: "Chennai",
  phone: "+91 44 2829 0200",
  email: "info@apollochennai.com",
  status: "open",
  specialty: "Multi-Specialty",
  rating: 4.8,
  reviews: 2340,
  founded: "1983",
  beds: 710,
  stats: {
    departments: 34,
    activeQueues: 12,
    avgWaitMinutes: 18,
    patientsToday: 847,
  },
  departments: [
    { id: 1, name: "Cardiology", icon: "Heart", avgConsultMins: 20, queueStatus: "busy", waitMins: 35, inQueue: 14, doctor: "Dr. R. Krishnamurthy" },
    { id: 2, name: "Neurology", icon: "Brain", avgConsultMins: 25, queueStatus: "moderate", waitMins: 18, inQueue: 7, doctor: "Dr. S. Anand" },
    { id: 3, name: "Orthopaedics", icon: "Bone", avgConsultMins: 15, queueStatus: "low", waitMins: 8, inQueue: 3, doctor: "Dr. P. Sharma" },
    { id: 4, name: "Ophthalmology", icon: "Eye", avgConsultMins: 12, queueStatus: "low", waitMins: 5, inQueue: 2, doctor: "Dr. M. Iyer" },
    { id: 5, name: "Paediatrics", icon: "Baby", avgConsultMins: 18, queueStatus: "moderate", waitMins: 22, inQueue: 9, doctor: "Dr. A. Rajan" },
    { id: 6, name: "General Medicine", icon: "Activity", avgConsultMins: 10, queueStatus: "busy", waitMins: 42, inQueue: 18, doctor: "Dr. K. Nair" },
    { id: 7, name: "Oncology", icon: "Shield", avgConsultMins: 30, queueStatus: "low", waitMins: 10, inQueue: 4, doctor: "Dr. V. Menon" },
    { id: 8, name: "Emergency", icon: "Zap", avgConsultMins: 5, queueStatus: "busy", waitMins: 0, inQueue: 6, doctor: "Duty Doctors" },
  ],
};

// ─── Icon Map ─────────────────────────────────────────────────────────────────
const ICON_MAP = { Heart, Brain, Bone, Eye, Baby, Activity, Shield, Zap };

// ─── Queue config ─────────────────────────────────────────────────────────────
const QUEUE_CONFIG = {
  busy:     { label: "Busy",     bg: "bg-red-50",    text: "text-red-600",    border: "border-red-100",    dot: "bg-red-500",    bar: "bg-red-400",    width: "w-5/6" },
  moderate: { label: "Moderate", bg: "bg-amber-50",  text: "text-amber-600",  border: "border-amber-100",  dot: "bg-amber-400",  bar: "bg-amber-400",  width: "w-1/2" },
  low:      { label: "Low",      bg: "bg-emerald-50",text: "text-emerald-600",border: "border-emerald-100",dot: "bg-emerald-500",bar: "bg-emerald-400",width: "w-1/4" },
};



// ─── Skeleton ─────────────────────────────────────────────────────────────────
function HeroSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-64 md:h-80 bg-gray-200 rounded-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-gray-200 rounded-full w-64" />
              <div className="h-4 bg-gray-100 rounded-full w-48" />
              <div className="flex gap-3 mt-4">
                {[1,2,3].map(i => <div key={i} className="h-8 bg-gray-100 rounded-full w-28" />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
      {[1,2,3,4].map(i => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="w-10 h-10 bg-gray-100 rounded-xl mb-3" />
          <div className="h-7 bg-gray-200 rounded-full w-16 mb-2" />
          <div className="h-3 bg-gray-100 rounded-full w-24" />
        </div>
      ))}
    </div>
  );
}

function DeptSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 animate-pulse">
      {[1,2,3,4,5,6,7,8].map(i => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="w-12 h-12 bg-gray-100 rounded-xl mb-4" />
          <div className="h-4 bg-gray-200 rounded-full w-32 mb-2" />
          <div className="h-3 bg-gray-100 rounded-full w-24 mb-4" />
          <div className="h-1.5 bg-gray-100 rounded-full mb-4" />
          <div className="h-9 bg-gray-100 rounded-xl" />
        </div>
      ))}
    </div>
  );
}

// ─── Hospital Hero ────────────────────────────────────────────────────────────
function HospitalHero({ hospital }) {
  const hues = [["#EFF6FF","#2563EB"],["#F0FDFA","#0D9488"]];
  const [bg, accent] = hues[hospital.id % 2];

  return (
    <div>
      {/* Cover */}
      <div className="h-56 md:h-72 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}18 0%, ${accent}08 100%)` }}>
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <Stethoscope size={320} className="text-gray-900" />
        </div>
        {/* decorative circles */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10" style={{ background: accent }} />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-10" style={{ background: "#14B8A6" }} />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/30" />
      </div>

      {/* Card overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-16 relative z-10 bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm border border-gray-100"
              style={{ background: bg, color: accent }}>
              {hospital.name.split(" ").slice(0,2).map(w => w[0]).join("")}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{hospital.name}</h1>
                {hospital.status === "open"
                  ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 mt-1">
                      <CheckCircle2 size={11}/> Open
                    </span>
                  : <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100 mt-1">
                      <XCircle size={11}/> Closed
                    </span>
                }
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mb-3">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={13} className={s <= Math.floor(hospital.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
                ))}
                <span className="text-sm font-semibold text-gray-700 ml-1">{hospital.rating}</span>
                <span className="text-xs text-gray-400">({hospital.reviews.toLocaleString()} reviews)</span>
              </div>

              {/* Contact pills */}
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  { icon: MapPin,    value: hospital.city,   color: "text-blue-500",   bg: "bg-blue-50"   },
                  { icon: Phone,     value: hospital.phone,  color: "text-teal-500",   bg: "bg-teal-50"   },
                  { icon: Mail,      value: hospital.email,  color: "text-purple-500", bg: "bg-purple-50" },
                  { icon: Building2, value: `${hospital.stats.departments} Depts`, color: "text-orange-500", bg: "bg-orange-50" },
                ].map(({ icon: Icon, value, color, bg: ibg }) => (
                  <span key={value} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-gray-600 border border-gray-100 ${ibg}`}>
                    <Icon size={12} className={color} />
                    {value}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stats Row ────────────────────────────────────────────────────────────────
function StatsRow({ stats }) {
  const cards = [
    { icon: Building2,   label: "Departments",         value: stats.departments,   unit: "total",    color: "text-blue-600",   bg: "bg-blue-50",   border: "border-blue-100"   },
    { icon: Activity,    label: "Active Queues",        value: stats.activeQueues,  unit: "live now", color: "text-teal-600",   bg: "bg-teal-50",   border: "border-teal-100"   },
    { icon: Timer,       label: "Avg. Wait Time",       value: stats.avgWaitMinutes,unit: "minutes",  color: "text-amber-600",  bg: "bg-amber-50",  border: "border-amber-100"  },
    { icon: UserCheck,   label: "Patients Today",       value: stats.patientsToday, unit: "served",   color: "text-emerald-600",bg: "bg-emerald-50",border: "border-emerald-100"},
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ icon: Icon, label, value, unit, color, bg, border }) => (
        <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${bg} ${border} border transition-transform duration-300 group-hover:scale-110`}>
            <Icon size={19} className={color} />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {value.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 mt-0.5">{label}</div>
          <div className={`text-xs font-medium mt-1 ${color}`}>{unit}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Department Card ──────────────────────────────────────────────────────────
function DepartmentCard({ dept }) {
  const [hovered, setHovered] = useState(false);
  const IconComp = ICON_MAP[dept.icon] || Activity;
  const q = QUEUE_CONFIG[dept.queueStatus];

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col transition-all duration-300 cursor-pointer"
      style={{
        boxShadow: hovered ? "0 16px 40px -8px rgba(37,99,235,0.14), 0 4px 12px -4px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon + status */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${hovered ? "bg-blue-600" : "bg-blue-50"}`}
          style={{ transform: hovered ? "rotate(-8deg)" : "rotate(0deg)" }}>
          <IconComp size={22} className={hovered ? "text-white" : "text-blue-600"} />
        </div>
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${q.bg} ${q.text} ${q.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${q.dot}`} />
          {q.label}
        </span>
      </div>

      {/* Name + Doctor */}
      <h3 className="font-semibold text-gray-900 text-sm leading-tight">{dept.name}</h3>
      <p className="text-xs text-gray-400 mt-0.5 mb-3">{dept.doctor}</p>

      {/* Queue bar */}
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-gray-400">Queue load</span>
        <span className={`font-medium ${q.text}`}>{dept.inQueue} waiting</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
        <div className={`h-full rounded-full transition-all duration-700 ${q.bar} ${q.width}`} />
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-gray-50 rounded-xl p-2.5 text-center">
          <div className="text-xs text-gray-400 mb-0.5">Consult</div>
          <div className="text-sm font-semibold text-gray-700">{dept.avgConsultMins} min</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-2.5 text-center">
          <div className="text-xs text-gray-400 mb-0.5">Wait</div>
          <div className={`text-sm font-semibold ${dept.waitMins === 0 ? "text-emerald-600" : "text-gray-700"}`}>
            {dept.waitMins === 0 ? "Now" : `~${dept.waitMins} min`}
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        className="mt-auto w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
        style={{
          background: hovered ? "#2563EB" : "#EFF6FF",
          color: hovered ? "#ffffff" : "#2563EB",
          transform: hovered ? "translateY(-1px)" : "translateY(0)",
          boxShadow: hovered ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
        }}
      >
        View Queue
      </button>
    </div>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────
function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-5">
        <AlertCircle size={34} className="text-red-300" />
      </div>
      <h3 className="text-gray-800 font-semibold text-lg mb-1">Couldn't load hospital</h3>
      <p className="text-gray-400 text-sm mb-6 max-w-xs">There was a problem fetching the details. Check your connection and try again.</p>
      <button onClick={onRetry}
        className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-200">
        Retry
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HospitalDetails() {
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("departments");

  const load = () => {
    setLoading(true);
    setError(false);
    const t = setTimeout(() => {
      // Replace with: axios.get(`/api/hospitals/${id}`).then(r => setHospital(r.data))
      setHospital(MOCK_HOSPITAL);
      setLoading(false);
    }, 1600);
    return () => clearTimeout(t);
  };

  useEffect(() => { const cleanup = load(); return cleanup; }, []);

  const TABS = ["departments", "about", "doctors"];

  return (
    <div className="min-h-screen bg-[#F8FAFC]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
          <ChevronRight size={12} />
          <a href="#" className="hover:text-blue-600 transition-colors">Hospitals</a>
          <ChevronRight size={12} />
          <span className="text-gray-700 font-medium truncate max-w-xs">{loading ? "Loading…" : hospital?.name}</span>
        </div>
      </div>

      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
        <button className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors group">
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Hospitals
        </button>
      </div>

      {/* Hero */}
      {loading ? <HeroSkeleton /> : error ? null : <HospitalHero hospital={hospital} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-16 space-y-8">

        {/* Stats */}
        {loading ? <StatsSkeleton /> : error ? <ErrorState onRetry={load} /> : (
          <StatsRow stats={hospital.stats} />
        )}

        {!loading && !error && (
          <>
            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-gray-200 pb-0">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-sm font-medium capitalize rounded-t-lg transition-all border-b-2 -mb-px ${
                    activeTab === tab
                      ? "text-blue-600 border-blue-600 bg-blue-50"
                      : "text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {tab}
                  {tab === "departments" && (
                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                      activeTab === tab ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                    }`}>
                      {hospital.departments.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Departments Tab */}
            {activeTab === "departments" && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Departments</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Live queue status across all OPD departments</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 bg-white border border-gray-100 rounded-xl px-3 py-2">
                    <Activity size={12} className="text-emerald-500" />
                    <span>Live updates</span>
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {Object.entries(QUEUE_CONFIG).map(([key, cfg]) => (
                    <span key={key} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label} queue
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {hospital.departments.map(dept => (
                    <DepartmentCard key={dept.id} dept={dept} />
                  ))}
                </div>
              </section>
            )}

            {/* About Tab */}
            {activeTab === "about" && (
              <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">About {hospital.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Specialty", value: hospital.specialty, icon: Stethoscope },
                    { label: "Founded", value: hospital.founded, icon: Calendar },
                    { label: "Total Beds", value: hospital.beds, icon: Users },
                    { label: "Departments", value: hospital.stats.departments, icon: Building2 },
                    { label: "Rating", value: `${hospital.rating} / 5.0 (${hospital.reviews} reviews)`, icon: Star },
                    { label: "Address", value: hospital.address, icon: MapPin },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</div>
                        <div className="text-sm font-semibold text-gray-800 mt-0.5">{String(value)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Doctors Tab placeholder */}
            {activeTab === "doctors" && (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  <User size={28} className="text-blue-300" />
                </div>
                <h3 className="text-gray-700 font-semibold text-base mb-1">Doctors directory coming soon</h3>
                <p className="text-gray-400 text-sm">Connect the API to list all consultant doctors here.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}