import { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  ChevronRight,
  Stethoscope,
  ArrowLeft,
  Activity,
  Heart,
  Brain,
  Bone,
  Eye,
  Baby,
  Shield,
  Zap,
  AlertCircle,
  Timer,
  UserCheck,
  User,
  CheckCircle2,
  XCircle,
  Calendar,
  Clock,
  Users,
  MapPinned,
} from "lucide-react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import hospitalService from "../services/hospital.service.js";
import departmentService from "../services/department.service.js";
import { useNavigate } from "react-router-dom";
import queueService from "../services/queue.service.js";

// ─── Icon map for department names ───────────────────────────
const DEPT_ICON_MAP = {
  cardiology: Heart,
  neurology: Brain,
  orthopaedics: Bone,
  orthopedics: Bone,
  ophthalmology: Eye,
  paediatrics: Baby,
  pediatrics: Baby,
  "general medicine": Activity,
  oncology: Shield,
  emergency: Zap,
};

function getDeptIcon(name = "") {
  return DEPT_ICON_MAP[name.toLowerCase()] || Activity;
}

// ─── Dept icon background palette (cycles) ───────────────────
const DEPT_COLORS = [
  { bg: "bg-blue-50", icon: "text-blue-600", hover: "bg-blue-600" },
  { bg: "bg-teal-50", icon: "text-teal-600", hover: "bg-teal-600" },
  { bg: "bg-purple-50", icon: "text-purple-600", hover: "bg-purple-600" },
  { bg: "bg-amber-50", icon: "text-amber-600", hover: "bg-amber-600" },
  { bg: "bg-emerald-50", icon: "text-emerald-600", hover: "bg-emerald-600" },
  { bg: "bg-rose-50", icon: "text-rose-600", hover: "bg-rose-600" },
];

// ─── Skeletons ────────────────────────────────────────────────
function HeroSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-52 md:h-64 bg-gray-200" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-14 relative z-10 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-gray-200 rounded-full w-56" />
              <div className="h-4 bg-gray-100 rounded-full w-40" />
              <div className="flex flex-wrap gap-2 mt-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-7 bg-gray-100 rounded-full w-24" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeptSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-gray-100 p-5"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-xl mb-4" />
          <div className="h-4 bg-gray-200 rounded-full w-36 mb-2" />
          <div className="h-3 bg-gray-100 rounded-full w-28 mb-1" />
          <div className="h-3 bg-gray-100 rounded-full w-20 mb-5" />
          <div className="h-9 bg-gray-100 rounded-xl" />
        </div>
      ))}
    </div>
  );
}

// ─── Hospital Hero ────────────────────────────────────────────
function HospitalHero({ hospital }) {
  // derive initials from name
  const initials = hospital.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div>
      {/* Cover strip */}
      <div className="h-48 md:h-60 relative overflow-hidden bg-linear-to-br from-blue-600/10 via-teal-500/5 to-blue-400/10">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <Stethoscope size={280} className="text-blue-900" />
        </div>
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-600 opacity-10" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-teal-500 opacity-10" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/20" />
      </div>

      {/* Info card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-14 relative z-10 bg-white rounded-2xl border border-gray-100 shadow-lg p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center text-2xl font-bold bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
              {initials}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
                {hospital.name}
              </h1>

              {/* Info pills */}
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  {
                    Icon: MapPinned,
                    value: `${hospital.city}, ${hospital.state}`,
                    color: "text-blue-500",
                    bg: "bg-blue-50",
                  },
                  {
                    Icon: Phone,
                    value: hospital.phone,
                    color: "text-teal-500",
                    bg: "bg-teal-50",
                  },
                  {
                    Icon: Mail,
                    value: hospital.email,
                    color: "text-purple-500",
                    bg: "bg-purple-50",
                  },
                  {
                    Icon: MapPin,
                    value: `Pincode: ${hospital.pincode}`,
                    color: "text-orange-500",
                    bg: "bg-orange-50",
                  },
                ].map(({ Icon, value, color, bg }) => (
                  <span
                    key={value}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-gray-600 border border-gray-100 ${bg}`}
                  >
                    <Icon size={12} className={color} />
                    <span className="truncate max-w-45 sm:max-w-none">
                      {value}
                    </span>
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

// ─── Quick Info Cards ─────────────────────────────────────────
function InfoCards({ hospital, deptCount }) {
  const cards = [
    {
      icon: Building2,
      label: "Departments",
      value: deptCount,
      sub: "registered",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      icon: MapPinned,
      label: "City",
      value: hospital.city,
      sub: hospital.state,
      color: "text-teal-600",
      bg: "bg-teal-50",
      border: "border-teal-100",
    },
    {
      icon: Mail,
      label: "Email",
      value: hospital.email,
      sub: "contact",
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      small: true,
    },
    {
      icon: Phone,
      label: "Phone",
      value: hospital.phone,
      sub: "helpline",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(
        ({ icon: Icon, label, value, sub, color, bg, border, small }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 border ${bg} ${border} group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon size={18} className={color} />
            </div>
            <div
              className={`font-bold text-gray-900 mb-0.5 ${small ? "text-sm break-all" : "text-xl"}`}
            >
              {value}
            </div>
            <div className="text-sm text-gray-500">{label}</div>
            <div className={`text-xs font-medium mt-1 ${color}`}>{sub}</div>
          </div>
        ),
      )}
    </div>
  );
}

// ─── Department Card ──────────────────────────────────────────
function DepartmentCard({ dept, colorIndex, onViewQueue }) {
  const [hovered, setHovered] = useState(false);
  const IconComp = getDeptIcon(dept.name);
  const palette = DEPT_COLORS[colorIndex % DEPT_COLORS.length];

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col transition-all duration-300 cursor-pointer"
      style={{
        boxShadow: hovered
          ? "0 16px 40px -8px rgba(37,99,235,0.14), 0 4px 12px -4px rgba(0,0,0,0.08)"
          : "0 1px 3px rgba(0,0,0,0.05)",
        transform: hovered
          ? "translateY(-4px) scale(1.02)"
          : "translateY(0) scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon + status */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${hovered ? palette.hover : palette.bg}`}
          style={{ transform: hovered ? "rotate(-8deg)" : "rotate(0deg)" }}
        >
          <IconComp
            size={22}
            className={hovered ? "text-white" : palette.icon}
          />
        </div>

        {/* Active badge */}
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
            dept.isActive
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : "bg-gray-100 text-gray-500 border-gray-200"
          }`}
        >
          {dept.isActive ? (
            <>
              <CheckCircle2 size={10} /> Active
            </>
          ) : (
            <>
              <XCircle size={10} /> Inactive
            </>
          )}
        </span>
      </div>

      {/* Name */}
      <h3 className="font-semibold text-gray-900 text-base leading-tight mb-1">
        {dept.name}
      </h3>

      {/* Doctors */}
      <div className="mb-4">
        {dept.doctorNames && dept.doctorNames.length > 0 ? (
          <div className="space-y-1">
            {dept.doctorNames.map((doc, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 text-xs text-gray-500"
              >
                <User size={11} className="text-gray-400 shrink-0" />
                <span className="truncate">{doc}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic">No doctors assigned</p>
        )}
      </div>

      {/* Avg consult time */}
      <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2.5 mb-4">
        <Clock size={14} className="text-gray-400 shrink-0" />
        <div>
          <div className="text-xs text-gray-400">Avg. Consultation</div>
          <div className="text-sm font-semibold text-gray-700">
            {dept.averageConsultationTime} min
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => onViewQueue(dept._id)}
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

// ─── About Tab ────────────────────────────────────────────────
function AboutSection({ hospital }) {
  const rows = [
    { icon: Building2, label: "Hospital Name", value: hospital.name },
    { icon: MapPinned, label: "City", value: hospital.city },
    { icon: MapPin, label: "State", value: hospital.state },
    { icon: MapPin, label: "Full Address", value: hospital.address },
    { icon: MapPin, label: "Pincode", value: hospital.pincode },
    { icon: Phone, label: "Phone", value: hospital.phone },
    { icon: Mail, label: "Email", value: hospital.email },
    {
      icon: Calendar,
      label: "Registered On",
      value: new Date(hospital.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  ];

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-5">
        About {hospital.name}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <Icon size={15} className="text-blue-600" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                {label}
              </div>
              <div className="text-sm font-semibold text-gray-800 mt-0.5 wrap-break-word">
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Error State ──────────────────────────────────────────────
function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-5">
        <AlertCircle size={34} className="text-red-300" />
      </div>
      <h3 className="text-gray-800 font-semibold text-lg mb-1">
        Couldn't load hospital
      </h3>
      <p className="text-gray-400 text-sm mb-6 max-w-xs">
        There was a problem fetching the details. Check your connection and try
        again.
      </p>
      <button
        onClick={onRetry}
        className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-200"
      >
        Retry
      </button>
    </div>
  );
}

// ─── Empty departments ────────────────────────────────────────
function NoDepartments() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-100">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
        <Building2 size={28} className="text-blue-300" />
      </div>
      <h3 className="text-gray-700 font-semibold text-base mb-1">
        No departments found
      </h3>
      <p className="text-gray-400 text-sm max-w-xs">
        No departments have been registered for this hospital yet.
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function HospitalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hospital, setHospital] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("departments");

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await hospitalService.getHospital(id);
      setHospital(response.hospital);
      const departments = await departmentService.getAllDepartments(id);
      setDepartments(departments);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  // ── helper to navigate to queue page ──
  const handleViewQueue = async (deptId) => {
    try{
      const response = await queueService.getQueueByDepartment(deptId);
      navigate(`/queue/${response.queue._id}`);
    }catch(error){
      console.log("Queue not found");
    }
  };

  const TABS = ["departments", "about"];

  return (
    <div
      className="min-h-screen bg-[#F8FAFC]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <a href="/" className="hover:text-blue-600 transition-colors">
            Home
          </a>
          <ChevronRight size={12} />
          <a
            href="/hospitals"
            className="hover:text-blue-600 transition-colors"
          >
            Hospitals
          </a>
          <ChevronRight size={12} />
          <span className="text-gray-700 font-medium truncate max-w-xs">
            {loading ? "Loading…" : hospital?.name}
          </span>
        </div>
      </div>

      {/* Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft
            size={15}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Back to Hospitals
        </button>
      </div>

      {/* Hero */}
      {loading ? (
        <HeroSkeleton />
      ) : error ? null : (
        <HospitalHero hospital={hospital} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-16 space-y-8">
        {/* Info cards / error */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-5 h-28"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-xl mb-3" />
                <div className="h-5 bg-gray-200 rounded-full w-20 mb-2" />
                <div className="h-3 bg-gray-100 rounded-full w-14" />
              </div>
            ))}
          </div>
        ) : error ? (
          <ErrorState onRetry={load} />
        ) : (
          <InfoCards hospital={hospital} deptCount={departments.length} />
        )}

        {/* Tabs + content */}
        {!loading && !error && (
          <>
            {/* Tab bar */}
            <div className="flex items-center gap-1 border-b border-gray-200">
              {TABS.map((tab) => (
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
                    <span
                      className={`ml-2 text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                        activeTab === tab
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {departments.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* ── Departments Tab ── */}
            {activeTab === "departments" && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Departments
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                      All registered OPD departments for this hospital
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 bg-white border border-gray-100 rounded-xl px-3 py-2">
                    <Activity size={12} className="text-emerald-500" />
                    <span>Live queues</span>
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  </div>
                </div>

                {departments.length === 0 ? (
                  <NoDepartments />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {departments.map((dept, idx) => (
                      <DepartmentCard
                        key={dept._id}
                        dept={dept}
                        colorIndex={idx}
                        onViewQueue={handleViewQueue}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* ── About Tab ── */}
            {activeTab === "about" && <AboutSection hospital={hospital} />}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
