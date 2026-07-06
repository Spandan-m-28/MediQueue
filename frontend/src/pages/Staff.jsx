import { useState, useEffect } from "react";
import {
  Stethoscope,
  Bell,
  ChevronDown,
  LayoutGrid,
  User,
  LogOut,
  Heart,
  Brain,
  Bone,
  Baby,
  Activity,
  Eye,
  Shield,
  Zap,
  CheckCircle2,
  Pause,
  XCircle,
  Circle,
  Clock,
  Users,
  Timer,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Calendar,
} from "lucide-react";
import queueService from "../services/queue.service.js";
import { useNavigate } from "react-router-dom";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const STAFF = {
  name: "Priya Sundaram",
  role: "Senior Nurse",
  hospital: "Apollo Hospitals",
};

const MOCK_QUEUES = [
  {
    id: "q1",
    department: "Cardiology",
    icon: "Heart",
    status: "active",
    currentToken: 25,
    waiting: 14,
    avgWaitMins: 35,
    start: "08:00 AM",
    end: "02:00 PM",
  },
  {
    id: "q2",
    department: "Orthopedics",
    icon: "Bone",
    status: "active",
    currentToken: 12,
    waiting: 6,
    avgWaitMins: 18,
    start: "09:00 AM",
    end: "01:00 PM",
  },
  {
    id: "q3",
    department: "General Medicine",
    icon: "Activity",
    status: "paused",
    currentToken: 40,
    waiting: 22,
    avgWaitMins: 50,
    start: "08:00 AM",
    end: "04:00 PM",
  },
  {
    id: "q4",
    department: "Pediatrics",
    icon: "Baby",
    status: "active",
    currentToken: 8,
    waiting: 5,
    avgWaitMins: 20,
    start: "10:00 AM",
    end: "02:00 PM",
  },
  {
    id: "q5",
    department: "Neurology",
    icon: "Brain",
    status: "not_started",
    currentToken: 0,
    waiting: 0,
    avgWaitMins: 0,
    start: "02:00 PM",
    end: "06:00 PM",
  },
  {
    id: "q6",
    department: "Ophthalmology",
    icon: "Eye",
    status: "closed",
    currentToken: 18,
    waiting: 0,
    avgWaitMins: 0,
    start: "08:00 AM",
    end: "11:00 AM",
  },
  {
    id: "q7",
    department: "Emergency",
    icon: "Zap",
    status: "active",
    currentToken: 6,
    waiting: 3,
    avgWaitMins: 5,
    start: "12:00 AM",
    end: "11:59 PM",
  },
  {
    id: "q8",
    department: "Oncology",
    icon: "Shield",
    status: "active",
    currentToken: 14,
    waiting: 9,
    avgWaitMins: 30,
    start: "09:00 AM",
    end: "03:00 PM",
  },
];

const ICON_MAP = { Heart, Brain, Bone, Baby, Activity, Eye, Shield, Zap };

// ─── Status Config ────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  active: {
    label: "Active",
    Icon: CheckCircle2,
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    bar: "bg-emerald-500",
  },
  paused: {
    label: "Paused",
    Icon: Pause,
    dot: "bg-amber-400",
    text: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-100",
    bar: "bg-amber-400",
  },
  closed: {
    label: "Closed",
    Icon: XCircle,
    dot: "bg-red-500",
    text: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-100",
    bar: "bg-red-400",
  },
  not_started: {
    label: "Not Started",
    Icon: Circle,
    dot: "bg-gray-400",
    text: "text-gray-600",
    bg: "bg-gray-50",
    border: "border-gray-200",
    bar: "bg-gray-300",
  },
};

// ═══════════════════════════════════════════════════════════════
// SHARED LAYOUT COMPONENTS (sidebar removed)
// ═══════════════════════════════════════════════════════════════

// ─── StatusBadge ──────────────────────────────────────────────
function StatusBadge({ status, size = "md" }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.not_started;
  const Icon = cfg.Icon;
  const pad = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${pad} rounded-full font-semibold border transition-colors duration-300 ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      <Icon size={size === "sm" ? 10 : 11} />
      {cfg.label}
    </span>
  );
}

// ─── Top Navbar ───────────────────────────────────────────────
function StaffNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <header className="h-16 bg-white border-b border-gray-100 sticky top-0 z-30 flex items-center px-4 sm:px-6 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-teal-500 flex items-center justify-center">
          <Stethoscope size={16} className="text-white" />
        </div>
        <span className="font-bold text-gray-900 text-lg tracking-tight hidden sm:inline">
          Medi<span className="text-blue-600">Queue</span>
        </span>
      </div>

      <div className="flex items-center gap-2 min-w-0 ml-4 sm:ml-6">
        <span className="font-semibold text-gray-800 text-sm truncate">
          {STAFF.hospital}
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-semibold border border-blue-100">
          Staff Portal
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all relative">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {STAFF.name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-gray-800 leading-tight">
                {STAFF.name}
              </div>
              <div className="text-[10px] text-gray-400 leading-tight">
                {STAFF.role}
              </div>
            </div>
            <ChevronDown
              size={13}
              className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-30 overflow-hidden py-1">
              <a
                href="#"
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <User size={14} /> My Profile
              </a>
              <div className="h-px bg-gray-50 my-1" />
              <a
                href="#"
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={14} /> Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── StaffLayout wrapper (no sidebar) ──────────────────────────
function StaffLayout({ children }) {
  return (
    <div
      className="min-h-screen bg-[#F8FAFC]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
        rel="stylesheet"
      />
      <StaffNavbar />
      <div>{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGE-SPECIFIC COMPONENTS
// ═══════════════════════════════════════════════════════════════

// ─── Skeleton Card ────────────────────────────────────────────
function QueueCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-xl" />
        <div className="h-5 bg-gray-100 rounded-full w-16" />
      </div>
      <div className="h-4 bg-gray-200 rounded-full w-32 mb-3" />
      <div className="h-px bg-gray-50 my-3" />
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 bg-gray-100 rounded-xl" />
        ))}
      </div>
      <div className="h-10 bg-gray-100 rounded-xl" />
    </div>
  );
}

// ─── Queue Card ───────────────────────────────────────────────
function QueueCard({ queue }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const cfg = STATUS_CONFIG[queue.queueStatus];
  const Icon = ICON_MAP[queue.icon] || Activity;
  const isActionable =
    queue.queueStatus !== "closed" && queue.queueStatus !== "not_started";

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col transition-all duration-300 cursor-pointer"
      style={{
        boxShadow: hovered
          ? "0 16px 36px -8px rgba(37,99,235,0.14), 0 4px 12px -4px rgba(0,0,0,0.08)"
          : "0 1px 3px rgba(0,0,0,0.05)",
        transform: hovered
          ? "translateY(-4px) scale(1.015)"
          : "translateY(0) scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/staff/queue/${queue._id}`)}
    >
      {/* top */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${cfg.bg} ${cfg.border}`}
          style={{
            transform: hovered ? "rotate(-6deg) scale(1.05)" : "rotate(0)",
          }}
        >
          <Icon size={22} className={cfg.text} />
        </div>
        <StatusBadge status={queue.queueStatus} />
      </div>

      {/* name */}
      <h3 className="font-semibold text-gray-900 text-base mb-1">
        {queue.department}
      </h3>
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
        <Calendar size={11} />
        {queue.start} – {queue.end}
      </div>

      {/* stats grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <div className="bg-gray-50 rounded-xl p-2.5">
          <div className="text-xs text-gray-400 mb-0.5 flex items-center gap-1">
            <Clock size={10} /> Token
          </div>
          <div className="text-base font-bold text-gray-800">
            {queue.queueStatus === "not_started" ? "—" : `#${queue.currentToken}`}
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-2.5">
          <div className="text-xs text-gray-400 mb-0.5 flex items-center gap-1">
            <Users size={10} /> Waiting
          </div>
          <div className="text-base font-bold text-gray-800">
            {queue.waiting}
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-2.5 col-span-2">
          <div className="text-xs text-gray-400 mb-0.5 flex items-center gap-1">
            <Timer size={10} /> Est. Wait
          </div>
          <div className="text-base font-bold text-gray-800">
            {queue.avgWaitMins > 0 ? `${queue.avgWaitMins} min` : "—"}
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        disabled={!isActionable}
        className="mt-auto w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        style={{
          background: !isActionable
            ? "#F3F4F6"
            : hovered
              ? "#2563EB"
              : "#EFF6FF",
          color: !isActionable ? "#9CA3AF" : hovered ? "#ffffff" : "#2563EB",
          boxShadow:
            hovered && isActionable ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
        }}
      >
        Manage Queue
        <ArrowRight
          size={14}
          className={
            hovered
              ? "translate-x-0.5 transition-transform"
              : "transition-transform"
          }
        />
      </button>
    </div>
  );
}

// ─── ErrorState ───────────────────────────────────────────────
function ErrorState({ onRetry }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-5">
        <AlertCircle size={34} className="text-red-300" />
      </div>
      <h3 className="text-gray-800 font-semibold text-lg mb-1">
        Couldn't load queues
      </h3>
      <p className="text-gray-400 text-sm mb-6 max-w-xs">
        There was a problem fetching today's queues. Please try again.
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

// ─── EmptyState ───────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-5">
        <LayoutGrid size={32} className="text-blue-300" />
      </div>
      <h3 className="text-gray-800 font-semibold text-lg mb-1">
        No queues assigned
      </h3>
      <p className="text-gray-400 text-sm max-w-xs">
        You don't have any department queues assigned for today yet.
      </p>
    </div>
  );
}

export default function StaffHomePage() {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("all");

  const load = () => {
    setLoading(true);
    setError(false);
    const t = setTimeout(async () => {
      try{
      const response = await queueService.getStaffqueues();
      setQueues(response.data.queues);
      }catch(error){
        console.log(error);
      }
      setLoading(false);
    }, 1300);
    return () => clearTimeout(t);
  };

  useEffect(() => {
    const cleanup = load();
    return cleanup;
  }, []);

  const FILTERS = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "paused", label: "Paused" },
    { id: "closed", label: "Closed" },
    { id: "not_started", label: "Not Started" },
  ];

  const filtered =
    filter === "all" ? queues : queues.filter((q) => q.status === filter);
  const counts = {
    active: queues.filter((q) => q.queueStatus === "active").length,
    paused: queues.filter((q) => q.queueStatus === "paused").length,
    closed: queues.filter((q) => q.queueStatus === "closed").length,
  };

  return (
    <StaffLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-semibold text-blue-600 tracking-wide uppercase">
                Live Operations
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Manage Today's Queues
            </h1>
            <p className="text-gray-500 mt-1.5 text-sm md:text-base">
              Monitor queue status and control patient flow.
            </p>
          </div>

          {/* Summary chips */}
          <div className="flex items-center gap-3 flex-wrap">
            {[
              {
                label: "Active",
                value: counts.active,
                color: "#22C55E",
                bg: "#F0FDF4",
              },
              {
                label: "Paused",
                value: counts.paused,
                color: "#F59E0B",
                bg: "#FFFBEB",
              },
              {
                label: "Closed",
                value: counts.closed,
                color: "#EF4444",
                bg: "#FEF2F2",
              },
            ].map(({ label, value, color, bg }) => (
              <div
                key={label}
                className="text-center px-4 py-2.5 rounded-2xl"
                style={{ background: bg }}
              >
                <div className="text-xl font-bold" style={{ color }}>
                  {value}
                </div>
                <div className="text-xs font-medium text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        {!loading && !error && (
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                  filter === f.id
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {f.label}
              </button>
            ))}
            <button
              onClick={load}
              className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-gray-500 hover:text-blue-600 border border-gray-200 hover:border-blue-300 transition-all shrink-0"
            >
              <RefreshCw size={12} />
              Refresh
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <QueueCardSkeleton key={i} />
            ))
          ) : error ? (
            <ErrorState onRetry={load} />
          ) : filtered.length === 0 ? (
            <EmptyState />
          ) : (
            filtered.map((q) => (
              <QueueCard key={q._id} queue={q} />
            ))
          )}
        </div>
      </main>
    </StaffLayout>
  );
}
